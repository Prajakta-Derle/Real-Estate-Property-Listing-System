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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Properties</h2>

      {properties.length === 0 ? (
        <p>You have not added any properties yet.</p>
      ) : (
        properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}
    </div>
  );
};

export default MyProperties;
