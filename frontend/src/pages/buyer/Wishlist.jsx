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
    return <p>Loading wishlist...</p>;
  }

  return (
    <div>
      <h2>My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            isWishlisted={true}
            onToggleWishlist={toggleWishlist}
          />
        ))
      )}
    </div>
  );
};

export default Wishlist;
