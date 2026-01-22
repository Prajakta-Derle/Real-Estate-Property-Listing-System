import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div style={{ marginBottom: 20 }}>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/admin/users">
          <button>Manage Users</button>
        </Link>

        <Link to="/admin/properties">
          <button>View Properties</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
