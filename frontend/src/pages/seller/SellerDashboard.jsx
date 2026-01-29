import useAuth from "../../context/useAuth";

const SellerDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <p className="text-slate-400">
        Loading seller information...
      </p>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h2
          className="
            text-2xl sm:text-3xl font-extrabold
            bg-gradient-to-r from-amber-400 to-amber-600
            bg-clip-text text-transparent
          "
        >
          Seller Dashboard
        </h2>

        <p className="text-slate-400 mt-1">
          Overview of your seller account
        </p>
      </div>

      {/* INFO CARD */}
      <div
        className="
          max-w-xl
          bg-slate-900
          border border-slate-800
          rounded-3xl
          p-6 sm:p-8
          shadow-lg
          space-y-4
        "
      >
        <div className="flex justify-between">
          <span className="text-slate-400">Name</span>
          <span className="font-semibold text-slate-100">
            {user.name || "Not available"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Email</span>
          <span className="font-semibold text-slate-100">
            {user.email || "Not available"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Role</span>
          <span
            className="
              font-semibold
              text-amber-400
              uppercase
              tracking-wide
            "
          >
            {user.role || "seller"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
