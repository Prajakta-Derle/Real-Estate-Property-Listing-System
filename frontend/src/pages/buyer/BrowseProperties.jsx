import { useEffect, useState } from "react";
import axios from "../../api/axios";
import PropertyCard from "../../components/PropertyCard";

const BrowseProperties = () => {
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const props = await axios.get("/properties");
        setProperties(props.data);

        const wish = await axios.get("/user/wishlist");
        setWishlist(wish.data.map((p) => p._id));
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleWishlist = async (id) => {
    try {
      await axios.post(`/user/wishlist/${id}`);

      setWishlist((prev) =>
        prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id]
      );
    } catch (error) {
      console.error("Wishlist error:", error);
    }
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
            text-2xl sm:text-3xl font-extrabold mb-2
            bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
            bg-clip-text text-transparent
          "
        >
          Browse Properties
        </h2>

        <p className="text-slate-400">
          Discover properties and add them to your wishlist
        </p>
      </div>

      {properties.length === 0 ? (
        <p className="text-slate-400">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              isWishlisted={wishlist.includes(property._id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseProperties;
