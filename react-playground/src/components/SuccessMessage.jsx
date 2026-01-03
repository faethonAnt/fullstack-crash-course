export default function SuccessMessage({ message }) {
  if (!message) return null;
  return <p style={{ color: "green" }}>{message}</p>;
}
