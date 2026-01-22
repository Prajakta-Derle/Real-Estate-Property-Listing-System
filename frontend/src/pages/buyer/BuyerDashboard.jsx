import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

const BuyerDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Buyer Dashboard</h2>

      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>

      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/buyer/properties">
          <button>Browse Properties</button>
        </Link>

        <Link to="/buyer/wishlist">
          <button>Wishlist</button>
        </Link>
      </div>
    </div>
  );
};

export default BuyerDashboard;
