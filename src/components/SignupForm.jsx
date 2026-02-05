import { useState } from "react";

const USERS_URL = "https://happy-thoughts-api-8dht.onrender.com/api/users";

export default function SignupForm({ onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`${USERS_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || data?.error || "Signup failed. Please try again. Make sure your email is valid and not already in use.");
      }

      const token = data?.response?.accessToken;
      const userId = data?.response?.id;

      if (!token || !userId) {
        throw new Error("Signup succeeded but no token or user ID was returned.");
      }

      localStorage.setItem("accessToken", token);
      localStorage.setItem("email", data?.response?.email || normalizedEmail);
      localStorage.setItem("userId", userId);

      setSuccess("Account created successfully! You can now log in.");
      setEmail("");
      setPassword("");

      onSignup?.(); // tell App to re-render as logged in

    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-6 flex max-w-2xl px-4 sm:px-6 lg:px-8 w-full">
      <div className="border border-black bg-[#e3dede] px-4 py-4 sm:px-6 sm:py-5 rounded-md w-full">

        <form onSubmit={handleSubmit} className="mt-3 space-y-3">

          <div>
            <label
            className="block text-sm font-semibold text-black"
            htmlFor="email"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 p-2 rounded-sm"
              autoComplete="email"
            />

            <div>
              <label
              className="block text-sm font-semibold text-black"
              htmlFor="password"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter a password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-gray-300 p-2 rounded-sm"
                autoComplete="new-password"
              />
              </div>

              {error && (
              <p className="text-sm text-red-600">{error}</p>              
              )}

              {success && (
                <p className="text-sm text-green-600">{success}</p>
              )}
              <div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 rounded-full bg-[#f28c8c] px-6 py-2 text-sm font-semibold text-black hover:bg-[#ffa0a0] disabled:opacity-60"
              >
                {submitting ? "Signing up..." : "Sign Up"}
              </button>
              </div>
            </div>
        </form>
      </div>
    </section>
    );
    }

    