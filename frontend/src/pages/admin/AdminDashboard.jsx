import Navbar from "../../components/common/Navbar";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Admin Dashboard</h2>
        <p>View users, sellers, and platform stats.</p>
      </div>
    </>
  );
};

export default AdminDashboard;
