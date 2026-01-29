import { Link } from "react-router-dom";
import { Home, Users, ShieldCheck } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="font-sans text-slate-100 bg-slate-950">

      {/* ================= HERO SECTION ================= */}
      <section className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <div
          className="
            max-w-[1400px]
            mx-auto
            px-6 sm:px-8 lg:px-16
            min-h-[85vh]
            flex
            flex-col-reverse
            md:flex-row
            items-center
            justify-between
            gap-12 lg:gap-20
          "
        >
          {/* LEFT */}
          <div className="max-w-xl text-center md:text-left">
            <h1
              className="
                text-3xl sm:text-4xl lg:text-[3rem]
                font-extrabold
                leading-[1.15]
                mb-6
                pl-1
              "
            >
              <span className="block text-slate-100">
                The Real Estate
              </span>
              <span
                className="
                mt-3
                  bg-gradient-to-r
                  from-amber-300 via-amber-500 to-amber-700
                  bg-clip-text text-transparent
                  drop-shadow-[0_2px_6px_rgba(251,191,36,0.35)]
                "
              >
                Property Listing System
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8">
              A professional MERN-based platform to buy, sell, and manage
              properties with secure role-based access and modern UI.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link to="/login">
                <button className="
                  px-7 py-3.5
                  bg-amber-500 text-slate-900
                  rounded-2xl font-semibold
                  hover:bg-amber-600 transition
                ">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="
                  px-7 py-3.5
                  bg-slate-900 border border-slate-700
                  rounded-2xl font-semibold text-slate-200
                  hover:bg-slate-800 transition
                ">
                  Register
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full sm:w-[90%] md:w-[460px] lg:w-[520px] xl:w-[600px]">
            <img
              src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
              alt="Real Estate"
              className="w-full h-auto rounded-3xl shadow-2xl object-contain bg-slate-900"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 py-16 md:py-20 text-center">
        <h2 className="
          text-2xl sm:text-3xl font-bold mb-12
          bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
          bg-clip-text text-transparent
        ">
          Platform Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={<Home className="h-8 w-8 text-amber-500" />}
            title="Buyers"
            text="Search properties, apply smart filters, and save your favorites."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-amber-500" />}
            title="Sellers"
            text="Create, update, and manage listings with full ownership control."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8 text-amber-500" />}
            title="Admins"
            text="Oversee users, moderate listings, and ensure platform security."
          />
        </div>
      </section>

      {/* ================= WHY SECTION ================= */}
      <section className="w-full bg-slate-900 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="
            text-2xl sm:text-3xl font-bold mb-6
            bg-gradient-to-r from-amber-400 to-amber-600
            bg-clip-text text-transparent
          ">
            Why This Project?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            This project demonstrates a real-world MERN stack application with
            authentication, authorization, CRUD operations, image uploads, and
            role-based workflows designed for scalability and clarity.
          </p>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-16 md:py-20 text-center">
        <h2 className="
          text-2xl sm:text-3xl font-bold mb-8
          bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
          bg-clip-text text-transparent
        ">
          Get Started Today
        </h2>

        <Link to="/register">
          <button className="
            px-10 py-4
            bg-amber-500 text-slate-900
            rounded-2xl font-semibold
            hover:bg-amber-600 transition
          ">
            Create Your Account
          </button>
        </Link>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <div className="
    bg-slate-900 border border-slate-800
    rounded-3xl p-8
    hover:border-amber-500 hover:shadow-lg
    transition text-left
  ">
    <div className="mb-4">{icon}</div>
    <h3 className="
      text-xl font-semibold mb-3
      bg-gradient-to-r from-amber-400 to-amber-600
      bg-clip-text text-transparent
    ">
      {title}
    </h3>
    <p className="text-slate-400 text-sm leading-relaxed">
      {text}
    </p>
  </div>
);

export default LandingPage;
