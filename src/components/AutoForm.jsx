import { useState } from "react";

const USERS_URL = "https://happy-thoughts-api-8dht.onrender.com/api/users";

export default function AuthForm({ onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const isSignup = mode === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    if (isSignup && password.length < 8) {
      setError("Wooopseee! Password must be at least 8 characters long.");
      return;
    }

    try {
      setSubmitting(true);

      const endpoint = isSignup ? "signup" : "login";

      const res = await fetch(`${USERS_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            (isSignup
              ? "Oh nooo...signup failed. Email may already be in use."
              : "Oh noooo...login failed. Check your email and password.")
        );
      }

      const token = data?.response?.accessToken;
      const userId = data?.response?.id;

      if (!token || !userId) {
        throw new Error(
          `${isSignup ? "Signup" : "Login"} succeeded but token or user ID is missing.`
        );
      }

      localStorage.setItem("accessToken", token);
      localStorage.setItem("email", data?.response?.email || normalizedEmail);
      localStorage.setItem("userId", userId);

      setSuccess(isSignup ? "Account created successfully! You are now logged in." : "Logged in!");
      setEmail("");
      setPassword("");

      onAuthSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-6 w-full max-w-2xl px-4 sm:px-6 lg:px-8">
      <div className="border border-black bg-white p-4 sm:p-6 rounded-md">
        <h2 className="text-lg font-bold text-black">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-3 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-black" htmlFor="auth-email">
              Email
            </label>
            <input
              id="auth-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 w-full border border-gray-300 p-2 rounded-sm"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 w-full border border-gray-300 p-2 rounded-sm"
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-[#f28c8c] px-6 py-2 text-sm font-semibold text-black hover:bg-[#ffa0a0] disabled:opacity-60"
          >
            {submitting
              ? isSignup
                ? "Signing up..."
                : "Logging in..."
              : isSignup
              ? "Sign Up"
              : "Login"}
          </button>
        </form>

        <div className="mt-4 text-sm">
          {isSignup ? (
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
                setSuccess(null);
              }}
              className="underline"
            >
              Already have an account? Go ahead and log in
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError(null);
                setSuccess(null);
              }}
              className="underline"
            >
             Do you need an account? Sign up here
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
