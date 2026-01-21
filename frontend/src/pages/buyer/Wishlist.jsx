import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { getWishlist, toggleWishlist } from "../../api/wishlist.api";
import PropertyCard from "../../components/PropertyCard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadWishlist = async () => {
      try {
        const data = await getWishlist();
        if (isMounted) {
          setWishlist(Array.isArray(data) ? data : []);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadWishlist();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemove = async (propertyId) => {
    await toggleWishlist(propertyId);
    setWishlist((prev) =>
      prev.filter((property) => property._id !== propertyId)
    );
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>My Wishlist</h2>

        {loading && <p>Loading wishlist...</p>}

        {!loading && wishlist.length === 0 && (
          <p>No properties in wishlist</p>
        )}

        {wishlist.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            isWishlisted={true}
            onToggleWishlist={handleRemove}
          />
        ))}
      </div>
    </>
  );
};

export default Wishlist;
