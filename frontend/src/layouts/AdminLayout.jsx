import { Outlet, Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          padding: "1rem",
          borderRight: "1px solid #ddd",
        }}
      >
        <h3>Admin Panel</h3>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/properties">Properties</Link>

          <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
            Logout
          </button>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
