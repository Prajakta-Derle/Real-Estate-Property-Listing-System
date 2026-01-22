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
    description: ""
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
        headers: { "Content-Type": "multipart/form-data" }
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
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <select name="type" onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="commercial">Commercial</option>
        </select>
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        <button disabled={loading}>
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
