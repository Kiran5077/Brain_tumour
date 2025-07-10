import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://brain-tumourbackend.onrender.com//admin-dashboard");
        const data = await res.json();

        if (res.ok && data.users) {
          setUsers(data.users);
        } else {
          console.error("Error fetching users:", data.message);
          setUsers([]);
        }
      } catch (error) {
        console.error("Network error fetching users:", error);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const handleChangePassword = () => {
    const email = localStorage.getItem("email");
    navigate("/password", { state: { email, isAdmin: true } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleChangePassword}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4 text-gray-700">Registered Users</h3>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] table-auto border-collapse border border-gray-300 mb-8">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {user.name || user.username || "Unknown"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
