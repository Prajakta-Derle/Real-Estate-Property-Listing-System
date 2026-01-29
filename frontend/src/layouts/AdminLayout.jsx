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
          Admin Panel
        </h3>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-3 text-sm font-medium">
          <Link
            to="/admin"
            className="
              px-3 py-2 rounded-lg
              text-slate-300
              hover:text-amber-400 hover:bg-slate-800
              transition
            "
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="
              px-3 py-2 rounded-lg
              text-slate-300
              hover:text-amber-400 hover:bg-slate-800
              transition
            "
          >
            Users
          </Link>

          <Link
            to="/admin/properties"
            className="
              px-3 py-2 rounded-lg
              text-slate-300
              hover:text-amber-400 hover:bg-slate-800
              transition
            "
          >
            Properties
          </Link>
        </nav>

        {/* LOGOUT */}
        <button
  onClick={handleLogout}
  className="
    mt-auto
    h-11
    w-full
    flex items-center justify-center
    bg-amber-500
    text-slate-900
    rounded-xl
    font-semibold
    hover:bg-amber-600
    transition
    active:scale-95
  "
>
  Logout
</button>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 px-6 py-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
