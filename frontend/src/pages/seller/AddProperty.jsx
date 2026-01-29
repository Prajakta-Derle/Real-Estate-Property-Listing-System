import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    type: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.price || !form.location || !form.type) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      images.forEach((img) => formData.append("images", img));

      await axios.post("/property/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Property added successfully");
      navigate("/seller/my-properties");
    } catch (err) {
      setError(err.response?.data?.message || "Add property failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-6 text-amber-400">
        Add Property
      </h2>

      {error && (
        <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-800 rounded-lg px-4 py-2">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5"
      >
        {/* TITLE */}
        <input
          name="title"
          placeholder="Property Title"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        {/* LOCATION */}
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        {/* TYPE */}
        <select
          name="type"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="">Select Property Type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="commercial">Commercial</option>
        </select>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description (optional)"
          rows="4"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        {/* IMAGES */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-slate-300 file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-amber-500 file:text-slate-900 file:font-semibold hover:file:bg-amber-600"
        />

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="
            w-full h-12
            flex items-center justify-center 
            bg-amber-500
            text-slate-900
            rounded-xl
            font-semibold
            hover:bg-amber-600
            transition
            disabled:opacity-60
          "
        >
  {loading ? "Adding..." : "Add Property"}
</button>
      </form>
    </div>
  );
};

export default AddProperty;
