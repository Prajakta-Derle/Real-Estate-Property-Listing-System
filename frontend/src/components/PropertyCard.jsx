import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({
  property,
  isWishlisted,
  onToggleWishlist,
  onDelete,
  onEdit,
}) => {
  const navigate = useNavigate();

  const images = Array.isArray(property.images) ? property.images : [];
  const [activeImage, setActiveImage] = useState(images[0] || null);

  return (
    <div
      onClick={() => navigate(`/buyer/properties/${property._id}`)}
      className="
        relative
        bg-slate-900
        border border-slate-800
        rounded-3xl
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        transition
        cursor-pointer
      "
    >
      {/* ❤️ WISHLIST */}
      {onToggleWishlist && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(property._id);
          }}
          className="
            absolute top-4 right-4 z-10
            text-2xl
            bg-slate-900/70
            backdrop-blur
            rounded-full
            w-10 h-10
            flex items-center justify-center
          "
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      )}

      {/* 🖼 MAIN IMAGE */}
      {activeImage ? (
        <img
          src={activeImage}
          alt={property.title}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="h-56 flex items-center justify-center text-slate-400">
          No image available
        </div>
      )}

      {/* 🧩 THUMBNAILS */}
      {images.length > 1 && (
        <div className="flex gap-2 px-4 pt-3">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Property ${index + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(img);
              }}
              className={`
                w-14 h-10
                object-cover
                rounded-lg
                cursor-pointer
                border
                ${
                  activeImage === img
                    ? "border-amber-500"
                    : "border-slate-700"
                }
              `}
            />
          ))}
        </div>
      )}

      {/* 📄 CONTENT */}
      <div className="p-5">
        <h3
          className="
            text-lg font-bold mb-1
            bg-gradient-to-r from-amber-400 to-amber-600
            bg-clip-text text-transparent
          "
        >
          {property.title}
        </h3>

        <p className="text-slate-400 text-sm mb-1">
          <span className="text-slate-300 font-medium">Location:</span>{" "}
          {property.location}
        </p>

        <p className="text-slate-400 text-sm mb-1">
          <span className="text-slate-300 font-medium">Type:</span>{" "}
          {property.type}
        </p>

        <p className="text-amber-400 font-semibold mt-2">
          ₹{property.price}
        </p>

        {property.description && (
          <p className="text-slate-400 text-sm mt-3 line-clamp-2">
            {property.description}
          </p>
        )}

        {/* 🛠 SELLER ACTIONS */}
        {(onEdit || onDelete) && (
          <div className="flex gap-3 mt-4">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(property);
                }}
                className="
                  px-4 py-2
                  bg-slate-800
                  text-slate-200
                  rounded-lg
                  hover:bg-slate-700
                "
              >
                Edit
              </button>
            )}

            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(property._id);
                }}
                className="
                  px-4 py-2
                  bg-red-600/10
                  text-red-400
                  rounded-lg
                  hover:bg-red-600/20
                "
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
