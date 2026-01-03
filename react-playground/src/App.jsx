import { useState } from "react";
import InputField from "./components/InputField";
import ErrorMessage from "./components/ErrorMessage";
import SuccessMessage from "./components/SuccessMessage";

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
      <h1>Day 6 – Components & Props</h1>

      <form onSubmit={submit}>
        <InputField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@example.com"
          error={fieldErrors.email}
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="min 8 chars"
          error={fieldErrors.password}
        />

        <button disabled={loading} type="submit">
          {loading ? "Submitting..." : "Create account"}
        </button>
      </form>

      <ErrorMessage message={serverError} />
      <SuccessMessage message={success} />
    </div>
  );
}