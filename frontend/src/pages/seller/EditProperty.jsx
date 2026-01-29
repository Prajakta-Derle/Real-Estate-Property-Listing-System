import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const EditProperty = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // property passed from MyProperties

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    type: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state) {
      navigate("/seller/my-properties");
      return;
    }

    setForm({
      title: state.title || "",
      price: state.price || "",
      location: state.location || "",
      type: state.type || "",
      description: state.description || "",
    });
  }, [state, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`/property/${state._id}`, form);
      alert("Property updated successfully");
      navigate("/seller/my-properties");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* HEADER */}
      <h2
        className="
          text-2xl sm:text-3xl font-extrabold mb-6
          bg-gradient-to-r from-amber-400 to-amber-600
          bg-clip-text text-transparent
        "
      >
        Edit Property
      </h2>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="
          bg-slate-900
          border border-slate-800
          rounded-3xl
          p-6 sm:p-8
          space-y-4
          shadow-lg
        "
      >
        {/* TITLE */}
        <input
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        {/* LOCATION */}
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        {/* TYPE */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="">Select Type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="commercial">Commercial</option>
        </select>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        {/* ACTIONS */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="
              flex-1
              bg-amber-500 text-slate-900
              py-3 rounded-xl
              font-semibold
              hover:bg-amber-600
              transition
              active:scale-95
              disabled:opacity-60
            "
          >
            {loading ? "Updating..." : "Update Property"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/seller/my-properties")}
            className="
              flex-1
              bg-slate-800 text-slate-200
              py-3 rounded-xl
              font-semibold
              hover:bg-slate-700
              transition
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;
