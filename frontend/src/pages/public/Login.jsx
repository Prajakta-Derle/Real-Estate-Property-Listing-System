import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../context/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", form);
      const { token, user, role } = res.data;

      login(token, { ...user, role });

      if (role === "buyer") navigate("/buyer");
      else if (role === "seller") navigate("/seller");
      else if (role === "admin") navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-10"
      >
        {/* HEADING */}
        <h2
          className="
            text-3xl font-extrabold text-center mb-2
            bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
            bg-clip-text text-transparent
            drop-shadow-[0_1px_4px_rgba(251,191,36,0.35)]
          "
        >
          Welcome Back
        </h2>

        <p className="text-center text-slate-400 mb-8 text-sm sm:text-base">
          Login to manage your properties
        </p>

        {/* ERROR */}
        {error && (
          <div className="mb-6 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-4 py-2 text-center">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="
              w-full px-4 py-3
              bg-slate-950
              border border-slate-700
              rounded-xl
              text-slate-100
              placeholder-slate-500
              focus:outline-none
              focus:ring-2 focus:ring-amber-500
              focus:border-amber-500
            "
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="
              w-full px-4 py-3
              bg-slate-950
              border border-slate-700
              rounded-xl
              text-slate-100
              placeholder-slate-500
              focus:outline-none
              focus:ring-2 focus:ring-amber-500
              focus:border-amber-500
            "
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full h-12
            flex items-center justify-center
            bg-amber-500
            text-slate-900
            rounded-xl
            font-semibold
            hover:bg-amber-600
            transition
            active:scale-95
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* FOOTER */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-amber-500 font-semibold hover:text-amber-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
