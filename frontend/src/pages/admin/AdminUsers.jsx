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
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      
      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto mb-8">
        <h2
          className="
            text-2xl sm:text-3xl font-extrabold mb-2
            bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
            bg-clip-text text-transparent
            drop-shadow-[0_1px_4px_rgba(251,191,36,0.35)]
          "
        >
          Users
        </h2>

        <p className="text-slate-400">
          Manage all registered users on the platform
        </p>
      </div>

      {/* USERS LIST */}
      <div className="max-w-[1400px] mx-auto">
        {users.length === 0 ? (
          <div className="text-slate-400 text-sm">
            No users found.
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((u) => (
              <div
                key={u._id}
                className="
                  bg-slate-900
                  border border-slate-800
                  rounded-2xl
                  p-5
                  flex
                  flex-col sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                  hover:border-amber-500
                  transition
                "
              >
                {/* USER INFO */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">
                    {u.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Role:{" "}
                    <span className="capitalize text-slate-300">
                      {u.role}
                    </span>
                  </p>
                </div>

                {/* ACTION */}
                {u.role !== "admin" && (
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="
                      px-5 py-2
                      bg-red-500
                      text-white
                      rounded-xl
                      text-sm font-semibold
                      hover:bg-red-600
                      transition
                      active:scale-95
                      whitespace-nowrap
                    "
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
