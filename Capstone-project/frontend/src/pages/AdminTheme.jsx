import { useEffect, useState } from "react";

export default function AdminTheme() {
  const token = localStorage.getItem("token");

  // Agar user logged in nahi hai → login pe bhej do
  if (!token) {
    window.location.href = "/login";
  }

  // ✅ You are not using subdomains right now, so localhost is enough
  const BASE_URL = "http://localhost:5000/api";

  const [theme, setTheme] = useState({
    primaryColor: "",
    secondaryColor: "",
    font: "",
    logo: ""
  });

  // ✅ Load current tenant theme
  useEffect(() => {
    fetch(`${BASE_URL}/tenant`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.theme) {
          setTheme(data.theme);
        }
      })
      .catch(() => alert("Failed to load theme"));
  }, []);

  // ✅ Update theme in backend
  const updateTheme = async () => {
    const res = await fetch(`${BASE_URL}/tenant/theme`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ theme })
    });

    if (res.ok) {
      alert("✅ Theme updated successfully!");
    } else {
      alert("❌ Failed to update theme");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>🎨 Admin Theme Editor</h2>
      <p>Customize your tenant's UI theme.</p>
      <br />

      <label>Primary Color:</label>
      <input
        type="color"
        value={theme.primaryColor}
        onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
      />
      <br /><br />

      <label>Secondary Color:</label>
      <input
        type="color"
        value={theme.secondaryColor}
        onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
      />
      <br /><br />

      <label>Font Family:</label>
      <input
        type="text"
        value={theme.font}
        onChange={(e) => setTheme({ ...theme, font: e.target.value })}
        placeholder="e.g. Inter, Poppins, Roboto"
      />
      <br /><br />

      <label>Logo Image URL:</label>
      <input
        type="text"
        value={theme.logo}
        onChange={(e) => setTheme({ ...theme, logo: e.target.value })}
        placeholder="https://example.com/logo.png"
      />
      <br /><br />

      <button onClick={updateTheme} style={{ padding: "8px 16px" }}>
        Save Theme ✅
      </button>

      <br /><br />

      <button onClick={() => (window.location.href = "/dashboard")}>
        Back to Dashboard ↩
      </button>
    </div>
  );
}
