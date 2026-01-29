import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <header className="w-full sticky top-0 z-50 bg-slate-950 border-b border-slate-800">
      {/* INNER CONTAINER */}
      <div className="h-16 max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="
            text-2xl font-extrabold tracking-tight
            bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
            bg-clip-text text-transparent
            hover:from-amber-300 hover:to-amber-500
            transition
          "
        >
          PropertyHunter
        </Link>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-2 md:gap-6 text-sm md:text-base overflow-x-auto">

          {/* BUYER LINKS */}
          {user.role === "buyer" && (
            <>
              <Link
                to="/buyer/properties"
                className="whitespace-nowrap text-slate-300 hover:text-amber-400 font-medium transition"
              >
                Browse Properties
              </Link>
              <Link
                to="/buyer/wishlist"
                className="whitespace-nowrap text-slate-300 hover:text-amber-400 font-medium transition"
              >
                Wishlist
              </Link>
            </>
          )}

          {/* SELLER LINKS */}
          {user.role === "seller" && (
            <>
              <Link
                to="/seller"
                className="whitespace-nowrap text-slate-300 hover:text-amber-400 font-medium transition"
              >
                Dashboard
              </Link>
              <Link
                to="/seller/my-properties"
                className="whitespace-nowrap text-slate-300 hover:text-amber-400 font-medium transition"
              >
                My Properties
              </Link>
              <Link
                to="/seller/add-property"
                className="whitespace-nowrap text-slate-300 hover:text-amber-400 font-medium transition"
              >
                Add Property
              </Link>
            </>
          )}

          {/* ADMIN LINKS */}
          {user.role === "admin" && (
            <>
              <Link
                to="/admin"
                className="whitespace-nowrap text-slate-300 hover:text-amber-400 font-medium transition"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/users"
                className="whitespace-nowrap text-slate-300 hover:text-amber-400 font-medium transition"
              >
                Users
              </Link>
              <Link
                to="/admin/properties"
                className="whitespace-nowrap text-slate-300 hover:text-amber-400 font-medium transition"
              >
                Properties
              </Link>
            </>
          )}

          {/* USER EMAIL */}
          <span className="hidden lg:inline text-slate-500 text-sm ml-4">
            {user.email}
          </span>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="
              ml-2
              bg-amber-500
              text-slate-900
              px-4 py-1.5
              rounded-lg
              text-sm font-semibold
              hover:bg-amber-600
              transition
              whitespace-nowrap
            "
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
