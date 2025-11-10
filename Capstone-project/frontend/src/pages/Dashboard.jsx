import { useEffect, useState } from "react";
import { api } from "../api/http";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  // Redirect if not logged in
  if (!token) {
    window.location.href = "/login";
  }

  const [tenantInfo, setTenantInfo] = useState(null);
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState("");

  // ✅ Load tenant info and apply theme
  useEffect(() => {
    api.get("/tenant")
      .then((res) => {
        setTenantInfo(res.data);

        if (res.data.theme) {
          document.body.style.background = res.data.theme.primaryColor;
          document.body.style.color = res.data.theme.secondaryColor;
        }
      })
      .catch(() => alert("Failed to load tenant data"));
  }, []);

  // ✅ Load resources
  useEffect(() => {
    api.get("/resources")
      .then((res) => setResources(res.data))
      .catch(() => alert("Failed to load resources"));
  }, []);

  // ✅ Add new resource
  const addResource = () => {
    api.post("/resources", { name: newResource })
      .then((res) => {
        setResources([res.data, ...resources]);
        setNewResource("");
      })
      .catch(() => alert("Failed to add resource"));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      {tenantInfo && (
        <p><b>Tenant:</b> {tenantInfo.name}</p>
      )}

      <h3>Add Resource</h3>
      <input
        value={newResource}
        onChange={(e) => setNewResource(e.target.value)}
        placeholder="Resource name"
      />
      <button onClick={addResource}>Add</button>

      <h3>Resources</h3>
      <ul>
        {resources.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>

      <br/>

      <button onClick={() => window.location.href = "/admin/theme"}>
        Customize Theme 🎨
      </button>

      <br/><br/>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Logout 🚪
      </button>
    </div>
  );
}
