import useAuth from "../../context/useAuth";

const SellerDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading seller information...</p>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Seller Dashboard</h2>

      <div
        style={{
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 6,
          maxWidth: 500,
          background: "#fafafa",
        }}
      >
        <p>
          <strong>Name:</strong>{" "}
          {user.name || "Not available"}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user.email || "Not available"}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {user.role || "seller"}
        </p>
      </div>
    </div>
  );
};

export default SellerDashboard;
