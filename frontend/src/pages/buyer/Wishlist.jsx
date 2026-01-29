import { useEffect, useState } from "react";
import axios from "../../api/axios";
import PropertyCard from "../../components/PropertyCard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadWishlist = async () => {
      try {
        const res = await axios.get("/user/wishlist");
        if (isMounted) {
          setWishlist(res.data);
        }
      } catch (error) {
        console.error("Failed to load wishlist", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWishlist();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleWishlist = async (propertyId) => {
  await axios.post(`/user/wishlist/${propertyId}`);

  setWishlist((prev) =>
    prev.filter((property) => property._id !== propertyId)
  );
};


  if (loading) {
    return <p className="text-slate-400">Loading wishlist...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-slate-400">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {wishlist.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              isWishlisted={true}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
