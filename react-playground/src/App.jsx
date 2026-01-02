import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError(null);
    setFieldErrors({});
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 400 && payload?.errors) {
          setFieldErrors(payload.errors);
        } else {
          setServerError(payload?.error || `HTTP ${res.status}`);
        }
        return;
      }

      setSuccess(`Created: ${payload.user.email}`);
      setEmail("");
      setPassword("");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h1>Day 5 – POST + Validation</h1>

      <form onSubmit={submit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            style={{ display: "block", width: "100%", padding: 8 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
          />
          {fieldErrors.email && (
            <p style={{ color: "red", margin: "6px 0 0" }}>{fieldErrors.email}</p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            type="password"
            style={{ display: "block", width: "100%", padding: 8 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="min 8 chars"
          />
          {fieldErrors.password && (
            <p style={{ color: "red", margin: "6px 0 0" }}>
              {fieldErrors.password}
            </p>
          )}
        </div>

        <button disabled={loading} type="submit">
          {loading ? "Submitting..." : "Create account"}
        </button>
      </form>

      {serverError && <p style={{ color: "red" }}>Error: {serverError}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

