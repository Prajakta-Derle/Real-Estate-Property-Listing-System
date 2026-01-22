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
    description: ""
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
      description: state.description || ""
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
    <div style={{ maxWidth: 500 }}>
      <h2>Edit Property</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="commercial">Commercial</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
