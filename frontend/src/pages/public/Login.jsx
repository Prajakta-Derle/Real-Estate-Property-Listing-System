import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await login(form);

    if (!res.success) {
      setError(res.message);
      return;
    }

    // Redirect based on role
    if (res.role === "admin") navigate("/admin");
    else if (res.role === "seller") navigate("/seller");
    else navigate("/buyer");
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
