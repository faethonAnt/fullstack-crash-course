import InputField from "./InputField";

export default function SignupForm({
  email,
  password,
  fieldErrors,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <InputField
        label="Email"
        value={email}
        onChange={onEmailChange}
        placeholder="test@example.com"
        error={fieldErrors.email}
      />

      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="min 8 chars"
        error={fieldErrors.password}
      />

      <button disabled={loading} type="submit">
        {loading ? "Submitting..." : "Create account"}
      </button>
    </form>
  );
}
