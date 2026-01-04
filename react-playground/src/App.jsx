import { useState } from "react";
import SignupPage from "./pages/SignupPage";
import UsersPage from "./pages/UsersPage";

export default function App() {
  const [page, setPage] = useState("signup");

  return (
    <div>
      <div style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        <button onClick={() => setPage("signup")}>Signup</button>{" "}
        <button onClick={() => setPage("users")}>Users</button>
      </div>

      {page === "signup" ? <SignupPage /> : <UsersPage />}
    </div>
  );
}
