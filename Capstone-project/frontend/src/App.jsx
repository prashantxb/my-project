import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import RegisterTenant from "./pages/RegisterTenant.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminTheme from "./pages/AdminTheme.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegisterTenant />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/theme" element={<AdminTheme />} />
    </Routes>
  );
}

export default App;
