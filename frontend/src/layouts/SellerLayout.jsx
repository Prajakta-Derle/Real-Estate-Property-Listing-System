import { Outlet, NavLink } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      
      {/* ================= SIDEBAR ================= */}
      <aside
        className="
          w-64
          bg-slate-900
          border-r border-slate-800
          px-6 py-6
          flex flex-col
        "
      >
        {/* TITLE */}
        <h3
          className="
            text-xl font-extrabold mb-8
            bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
            bg-clip-text text-transparent
          "
        >
          Seller Panel
        </h3>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-3 text-sm font-medium">
          <NavLink
            to="/seller"
            end
            className={({ isActive }) =>
              `
                px-3 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-slate-800 text-amber-400"
                    : "text-slate-300 hover:text-amber-400 hover:bg-slate-800"
                }
              `
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/seller/my-properties"
            className={({ isActive }) =>
              `
                px-3 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-slate-800 text-amber-400"
                    : "text-slate-300 hover:text-amber-400 hover:bg-slate-800"
                }
              `
            }
          >
            My Properties
          </NavLink>

          <NavLink
            to="/seller/add-property"
            className={({ isActive }) =>
              `
                px-3 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-slate-800 text-amber-400"
                    : "text-slate-300 hover:text-amber-400 hover:bg-slate-800"
                }
              `
            }
          >
            Add Property
          </NavLink>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 px-6 py-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;
