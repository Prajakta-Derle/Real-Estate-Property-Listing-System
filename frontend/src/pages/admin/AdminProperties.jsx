import { useEffect, useState } from "react";
import axios from "../../api/axios";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("/property").then((res) => setProperties(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      
      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto mb-8">
        <h2
          className="
            text-2xl sm:text-3xl font-extrabold mb-2
            bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
            bg-clip-text text-transparent
            drop-shadow-[0_1px_4px_rgba(251,191,36,0.35)]
          "
        >
          All Properties
        </h2>

        <p className="text-slate-400">
          View and monitor all property listings on the platform
        </p>
      </div>

      {/* PROPERTIES LIST */}
      <div className="max-w-[1400px] mx-auto">
        {properties.length === 0 ? (
          <div className="text-slate-400 text-sm">
            No properties available.
          </div>
        ) : (
          <ul className="space-y-4">
            {properties.map((p) => (
              <li
                key={p._id}
                className="
                  bg-slate-900
                  border border-slate-800
                  rounded-2xl
                  p-5
                  flex
                  flex-col sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-2
                  hover:border-amber-500
                  transition
                "
              >
                {/* LEFT */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Property ID: {p._id}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="text-amber-400 font-semibold text-lg">
                  ₹{p.price}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminProperties;
