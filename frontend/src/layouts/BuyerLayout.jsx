import { Outlet } from "react-router-dom";

const BuyerLayout = () => {
  return (
    <main
      className="
        min-h-screen
        bg-slate-950
        text-slate-100
        px-6 sm:px-8 lg:px-10
        py-6
      "
    >
      {/* CONTENT */}
      <div className="max-w-[1400px] mx-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default BuyerLayout;
