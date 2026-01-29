import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      
      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto mb-10">
        <h2
          className="
            text-3xl sm:text-4xl font-extrabold mb-2
            bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
            bg-clip-text text-transparent
            drop-shadow-[0_1px_4px_rgba(251,191,36,0.35)]
          "
        >
          Admin Dashboard
        </h2>

        <p className="text-slate-400">
          Manage platform users and property listings
        </p>
      </div>

      {/* USER INFO CARD */}
      <div className="max-w-[1400px] mx-auto mb-10">
        <div
          className="
            bg-slate-900
            border border-slate-800
            rounded-2xl
            p-6
            shadow-md
          "
        >
          <p className="text-slate-300 mb-2">
            <span className="font-semibold text-slate-400">Email:</span>{" "}
            {user?.email}
          </p>
          <p className="text-slate-300">
            <span className="font-semibold text-slate-400">Role:</span>{" "}
            {user?.role}
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row gap-4">
        <Link to="/admin/users">
          <button
            className="
              w-full sm:w-auto
              px-6 py-3
              bg-amber-500
              text-slate-900
              rounded-xl
              font-semibold
              hover:bg-amber-600
              transition
              active:scale-95
            "
          >
            Manage Users
          </button>
        </Link>

        <Link to="/admin/properties">
          <button
            className="
              w-full sm:w-auto
              px-6 py-3
              bg-slate-900
              border border-slate-700
              text-slate-200
              rounded-xl
              font-semibold
              hover:bg-slate-800
              transition
              active:scale-95
            "
          >
            View Properties
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
