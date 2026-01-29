import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import PropertyCard from "../../components/PropertyCard";
import useAuth from "../../context/useAuth";

const MyProperties = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await axios.get("/property");

      const myProps = res.data.filter(
        (p) => p.owner?.email === user.email
      );

      setProperties(myProps);
      setLoading(false);
    };

    if (user?.email) fetchProperties();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;
    await axios.delete(`/property/${id}`);
    setProperties((prev) => prev.filter((p) => p._id !== id));
  };

  const handleEdit = (property) => {
    navigate("/seller/edit-property", { state: property });
  };

  if (loading) {
    return <p className="text-slate-400">Loading properties...</p>;
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
          My Properties
        </h2>

        <p className="text-slate-400 mt-1">
          Manage and edit the properties you have listed
        </p>
      </div>

      {/* CONTENT */}
      {properties.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-400">
          You have not added any properties yet.
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-8
          "
        >
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
