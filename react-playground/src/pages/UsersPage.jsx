import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:3000/users", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setUsers(data);
      } catch (e) {
        // Abort is not a "real" error for UI
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();

    // cleanup: prevents setting state after unmount
    return () => controller.abort();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      <ErrorMessage message={error} />

      {!loading && !error && (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.id}: {u.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
