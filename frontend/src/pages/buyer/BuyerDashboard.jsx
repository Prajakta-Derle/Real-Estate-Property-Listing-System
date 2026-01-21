import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { getAllProperties } from "../../api/property.api";
import { getWishlist, toggleWishlist } from "../../api/wishlist.api";
import PropertyCard from "../../components/PropertyCard";

const BuyerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ BACKEND-ALIGNED FILTERS (NO TITLE)
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  // Build clean query params
  const buildQueryParams = () => {
    const params = {};

    if (filters.location.trim()) {
      params.location = filters.location.trim();
    }

    if (filters.type) {
      params.type = filters.type;
    }

    if (filters.minPrice) {
      params.minPrice = Number(filters.minPrice);
    }

    if (filters.maxPrice) {
      params.maxPrice = Number(filters.maxPrice);
    }

    return params;
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);

      try {
        const queryParams = buildQueryParams();

        const [propData, wishlistData] = await Promise.all([
          getAllProperties(queryParams),
          getWishlist(),
        ]);

        if (!isMounted) return;

        const props = Array.isArray(propData)
          ? propData
          : propData.properties || [];

        const wishlist = Array.isArray(wishlistData)
          ? wishlistData
          : wishlistData.wishlist || [];

        setProperties(props);
        setWishlistIds(wishlist.map((p) => p._id));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleToggleWishlist = async (propertyId) => {
    await toggleWishlist(propertyId);

    setWishlistIds((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: 20 }}>
        <h2>Buyer Dashboard</h2>

        {/* 🔍 FILTER BAR */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            name="location"
            placeholder="Filter by location"
            value={filters.location}
            onChange={handleChange}
          />

          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
          >
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
          </select>

          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </div>

        {loading && <p>Loading properties...</p>}

        {!loading && properties.length === 0 && (
          <p>No properties match your filters</p>
        )}

        {!loading &&
          properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              isWishlisted={wishlistIds.includes(property._id)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
      </div>
    </>
  );
};

export default BuyerDashboard;
