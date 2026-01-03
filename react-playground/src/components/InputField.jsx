export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ display: "block", width: "100%", padding: 8 }}
      />
      {error && (
        <p style={{ color: "red", margin: "6px 0 0" }}>{error}</p>
      )}
    </div>
  );
}
