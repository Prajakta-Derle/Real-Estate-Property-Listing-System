import { useEffect, useState } from "react";
import axios from "../../api/axios";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("/property").then((res) => setProperties(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Properties</h2>
      <ul>
        {properties.map((p) => (
          <li key={p._id}>
            {p.title} — ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProperties;
