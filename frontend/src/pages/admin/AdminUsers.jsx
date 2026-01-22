import { useEffect, useState } from "react";
import axios from "../../api/axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await axios.delete(`/admin/users/${id}`);
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {users.map((u) => (
        <div key={u._id}>
          {u.name} ({u.role})
          {u.role !== "admin" && (
            <button onClick={() => handleDelete(u._id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
