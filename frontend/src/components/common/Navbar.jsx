import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "12px 20px",
        backgroundColor: "#222",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT */}
      <h3 style={{ margin: 0 }}>🏠 RealEstate App</h3>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {/* BUYER-ONLY LINKS */}
        {user?.role === "buyer" && (
          <>
            <Link
              to="/buyer"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Properties
            </Link>

            <Link
              to="/buyer/wishlist"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Wishlist ❤️
            </Link>
          </>
        )}

        {/* ROLE LABEL */}
        <span style={{ textTransform: "uppercase" }}>
          {user?.role}
        </span>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
