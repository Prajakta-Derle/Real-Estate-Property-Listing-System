import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

const BuyerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h2
          className="
            text-2xl sm:text-3xl font-extrabold mb-2
            bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
            bg-clip-text text-transparent
            drop-shadow-[0_1px_4px_rgba(251,191,36,0.35)]
          "
        >
          Buyer Dashboard
        </h2>
        <p className="text-slate-400">
          Manage your profile and explore properties
        </p>
      </div>

      {/* USER INFO CARD */}
      <div
        className="
          bg-slate-900
          border border-slate-800
          rounded-3xl
          p-6 sm:p-8
          shadow-lg
          max-w-xl
        "
      >
        <p className="mb-3">
          <span className="text-slate-400">Name:</span>{" "}
          <span className="text-slate-100 font-medium">
            {user?.name}
          </span>
        </p>

        <p className="mb-3">
          <span className="text-slate-400">Email:</span>{" "}
          <span className="text-slate-100 font-medium">
            {user?.email}
          </span>
        </p>

        <p>
          <span className="text-slate-400">Role:</span>{" "}
          <span className="text-amber-400 font-semibold capitalize">
            {user?.role}
          </span>
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-4">
        <Link to="/buyer/properties">
          <button
            className="
              px-6 py-3
              bg-amber-500 text-slate-900
              rounded-xl
              font-semibold
              shadow-md
              hover:bg-amber-600
              transition
              active:scale-95
            "
          >
            Browse Properties
          </button>
        </Link>

        <Link to="/buyer/wishlist">
          <button
            className="
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
            Wishlist
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BuyerDashboard;
