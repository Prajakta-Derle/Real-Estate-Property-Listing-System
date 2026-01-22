import { Outlet } from "react-router-dom";

const BuyerLayout = () => {
  return (
    <main style={{ padding: 30 }}>
      <Outlet />
    </main>
  );
};

export default BuyerLayout;
