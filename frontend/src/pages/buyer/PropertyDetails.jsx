import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertyById } from "../../api/property.api";
import useAuth from "../../context/useAuth";

import {
  MapPin,
  Home,
  IndianRupee,
  Phone,
  Mail,
  User,
  MessageCircle,
} from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    getPropertyById(id)
      .then((data) => setProperty(data))
      .catch(console.error);
  }, [id]);

  if (!property) {
    return <p className="text-white p-6">Loading...</p>;
  }

  const images = property.images || [];

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      <div className="grid md:grid-cols-2 gap-8">
        {/* ================= IMAGE SECTION ================= */}
        <div>
          <img
            src={images[activeImage]}
            alt="Property"
            className="w-full h-[380px] object-cover rounded-2xl"
          />

          {images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setActiveImage(index)}
                  className={`
                    w-20 h-14 object-cover rounded-lg cursor-pointer border
                    ${
                      activeImage === index
                        ? "border-amber-500"
                        : "border-slate-700"
                    }
                  `}
                />
              ))}
            </div>
          )}
        </div>

        {/* ================= PROPERTY INFO ================= */}
        <div>
          <h1 className="text-3xl font-bold text-amber-400">
            {property.title}
          </h1>

          <p className="text-slate-400 mt-2">
            {property.description}
          </p>

          {/* DETAILS */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin size={18} className="text-amber-400" />
              <span>{property.location}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Home size={18} className="text-amber-400" />
              <span className="capitalize">{property.type}</span>
            </div>

            <div className="flex items-center gap-2 text-amber-400 text-xl font-semibold">
              <IndianRupee size={20} />
              <span>{property.price}</span>
            </div>
          </div>

          {/* ================= SELLER DETAILS ================= */}
          <div className="mt-8 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">
              Seller Details
            </h2>

            {user ? (
              <>
                <div className="flex items-center gap-2 text-slate-300 mb-2">
                  <User size={18} className="text-amber-400" />
                  <span>{property.owner.name}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300 mb-2">
                  <Mail size={18} className="text-amber-400" />
                  <span>{property.owner.email}</span>
                </div>

                {property.owner.phone && (
                  <div className="flex items-center gap-2 text-slate-300 mb-4">
                    <Phone size={18} className="text-amber-400" />
                    <span>{property.owner.phone}</span>
                  </div>
                )}

                {/* ACTION BUTTONS */}
                {property.owner.phone && (
                  <div className="flex gap-4 mt-2">
                    <a
                      href={`tel:${property.owner.phone}`}
                      className="
                        flex items-center gap-2
                        px-4 py-2
                        bg-green-600
                        rounded-lg
                        hover:bg-green-700
                      "
                    >
                      <Phone size={18} />
                      Call
                    </a>

                    <a
                      href={`https://wa.me/91${property.owner.phone}?text=Hi, I am interested in your property`}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        flex items-center gap-2
                        px-4 py-2
                        bg-green-500
                        rounded-lg
                        hover:bg-green-600
                      "
                    >
                      <MessageCircle size={18} />
                      WhatsApp
                    </a>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-4">
                <p className="text-slate-400">
                  Login to view seller contact details
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-3 px-4 py-2 bg-amber-500 text-black rounded-lg"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
