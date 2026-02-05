import { useState } from "react";

const USERS_URL = "https://happy-thoughts-api-8dht.onrender.com/api/users";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password;

    if (!normalizedEmail || !trimmedPassword) {
      setError("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`${USERS_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password: trimmedPassword }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || data?.error || "Login failed");
      }

      const token = data?.response?.accessToken;
      if (!token) {
        throw new Error("Login succeeded but no token was returned.");
      }

      const userId = data?.response?.id;
      if (!userId) {
        throw new Error("Login succeeded but no user ID was returned.");
      }

      localStorage.setItem("accessToken", token);
      localStorage.setItem("email", data?.response?.email || normalizedEmail);
      localStorage.setItem("userId", userId);

      onLogin?.(); // tell App to re-render as logged in
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-6 w-full max-w-2xl px-4 sm:px-6 lg:px-8">
      <div className="border border-black bg-white p-4 sm:p-6 rounded-md">
        <h2 className="text-lg font-bold text-black">Login</h2>

        <form onSubmit={handleSubmit} className="mt-3 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-black" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 w-full border border-gray-300 p-2 rounded-sm"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 w-full border border-gray-300 p-2 rounded-sm"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-[#f28c8c] px-6 py-2 text-sm font-semibold text-black hover:bg-[#ffa0a0] disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}