import { useState } from "react";

const PropertyCard = ({
  property,
  isWishlisted,
  onToggleWishlist,
  onDelete,
  onEdit
}) => {
  const images = Array.isArray(property.images) ? property.images : [];
  const [activeImage, setActiveImage] = useState(images[0] || null);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 15,
        borderRadius: 6,
        marginBottom: 20,
        maxWidth: 520,
        position: "relative",
      }}
    >
      {/* ❤️ Wishlist Button (BUYER ONLY) */}
      {onToggleWishlist && (
        <button
          onClick={() => onToggleWishlist(property._id)}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: 20,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      )}

      {/* MAIN IMAGE */}
      {activeImage ? (
        <img
          src={activeImage}
          alt={property.title}
          style={{
            width: "100%",
            height: 250,
            objectFit: "cover",
            borderRadius: 4,
            marginBottom: 10,
          }}
        />
      ) : (
        <p style={{ color: "#777" }}>No image available</p>
      )}

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Property ${index + 1}`}
              onClick={() => setActiveImage(img)}
              style={{
                width: 60,
                height: 45,
                objectFit: "cover",
                cursor: "pointer",
                border:
                  activeImage === img
                    ? "2px solid black"
                    : "1px solid #ccc",
              }}
            />
          ))}
        </div>
      )}

      <h3>{property.title}</h3>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> ₹{property.price}</p>
      <p><strong>Type:</strong> {property.type}</p>

      {property.description && <p>{property.description}</p>}

      {/* SELLER ACTIONS */}
      {(onEdit || onDelete) && (
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          {onEdit && (
            <button onClick={() => onEdit(property)}>
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(property._id)}
              style={{ color: "red" }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
