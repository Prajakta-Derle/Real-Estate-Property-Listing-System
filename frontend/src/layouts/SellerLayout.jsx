import { Outlet, NavLink } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          borderRight: "1px solid #ddd",
          padding: 20,
          background: "#fafafa",
        }}
      >
        <h3 style={{ marginBottom: 20 }}>Seller Panel</h3>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <NavLink to="/seller" end>Dashboard</NavLink>
          <NavLink to="/seller/my-properties">My Properties</NavLink>
          <NavLink to="/seller/add-property">Add Property</NavLink>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 30 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;
