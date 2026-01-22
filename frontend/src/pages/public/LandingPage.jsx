import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* HERO SECTION */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 40px",
          background: "linear-gradient(135deg, #eef2f3, #d9e4f5)",
        }}
      >
        <div style={{ maxWidth: 500 }}>
          <h1 style={{ fontSize: 36, marginBottom: 15 }}>
            Real Estate Property Listing System
          </h1>

          <p style={{ fontSize: 18, marginBottom: 25 }}>
            A modern MERN-based platform that connects buyers and sellers,
            simplifies property management, and provides secure role-based access.
          </p>

          <div style={{ display: "flex", gap: 15 }}>
            <Link to="/login">
              <button style={buttonStyle}>Login</button>
            </Link>
            <Link to="/register">
              <button style={buttonStyle}>Register</button>
            </Link>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
          alt="Real Estate"
          style={{
            width: 420,
            maxWidth: "100%",
            borderRadius: 8,
            marginTop: 20,
          }}
        />
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: "60px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, marginBottom: 30 }}>
          Platform Features
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            flexWrap: "wrap",
          }}
        >
          <FeatureCard
            title="Buyers"
            text="Browse properties, apply filters, and save favorites to your wishlist."
          />
          <FeatureCard
            title="Sellers"
            text="Add, edit, and manage your property listings with full control."
          />
          <FeatureCard
            title="Admins"
            text="Monitor users, manage properties, and maintain platform integrity."
          />
        </div>
      </section>

      {/* WHY SECTION */}
      <section
        style={{
          padding: "60px 40px",
          backgroundColor: "#f7f7f7",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 26, marginBottom: 20 }}>
          Why This Project?
        </h2>

        <p style={{ maxWidth: 700, margin: "0 auto", fontSize: 16 }}>
          This project demonstrates a complete MERN stack application with
          authentication, authorization, CRUD operations, image uploads,
          and real-world role-based workflows — designed with scalability
          and clarity in mind.
        </p>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          padding: "50px 40px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>
          Get Started Today
        </h2>

        <Link to="/register">
          <button style={{ ...buttonStyle, fontSize: 18 }}>
            Create an Account
          </button>
        </Link>
      </section>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: 16,
  cursor: "pointer",
};

const FeatureCard = ({ title, text }) => (
  <div
    style={{
      width: 260,
      padding: 20,
      border: "1px solid #ddd",
      borderRadius: 6,
      background: "#fff",
    }}
  >
    <h3 style={{ marginBottom: 10 }}>{title}</h3>
    <p style={{ fontSize: 15 }}>{text}</p>
  </div>
);

export default LandingPage;
