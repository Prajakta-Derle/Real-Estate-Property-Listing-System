import { useEffect, useState } from "react";
import axios from "../../api/axios";
import PropertyCard from "../../components/PropertyCard";

const BrowseProperties = () => {
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const props = await axios.get("/property");
      setProperties(props.data);

      const wish = await axios.get("/user/wishlist");
      setWishlist(wish.data.map((p) => p._id));
    };

    fetchData();
  }, []);

  const toggleWishlist = async (id) => {
    await axios.post(`/user/wishlist/${id}`);
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h2>Browse Properties</h2>

      {properties.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          isWishlisted={wishlist.includes(property._id)}
          onToggleWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
};

export default BrowseProperties;
