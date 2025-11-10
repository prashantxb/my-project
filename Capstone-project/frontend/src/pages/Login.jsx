import { useState } from "react";
import { api } from "../api/http";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      // Token Save
      localStorage.setItem("token", res.data.token);

      // Tenant Save (Jo backend se aa raha hai)
      localStorage.setItem("tenantId", res.data.tenantId);

      // Login status update
      onLogin();
    } catch (err) {
      alert("❌ Incorrect Email or Password");
    }
  };

  return (
    <div style={{
      width: "320px",
      margin: "60px auto",
      padding: "20px",
      borderRadius: "8px",
      background: "#fff",
      boxShadow: "0 3px 8px rgba(0,0,0,0.15)"
    }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "8px 0",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "8px 0",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          border: "none",
          borderRadius: "5px",
          background: "#007bff",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Login
      </button>
    </div>
  );
}
