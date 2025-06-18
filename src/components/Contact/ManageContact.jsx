import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ManageContact = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch("https://brain-tumourbackend.onrender.com/admin/contacts");
      const data = await response.json();

      if (response.ok) {
        setMessages(data || []);
      } else {
        alert(data.error || "Failed to fetch contact messages");
      }
    } catch (err) {
      console.error("Error fetching contact messages:", err);
      alert("Server error while fetching contact messages.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/admin/contacts/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        alert("Message deleted successfully.");
        setMessages(messages.filter(msg => msg._id !== id));
      } else {
        alert(result.error || "Failed to delete message.");
      }
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Server error while deleting message.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="bg-gray-100 font-poppins min-h-screen px-6 py-8">
      {/* Header */}
      <motion.div
        className="bg-white font-quicksand"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <header className="relative w-full h-40 bg-black/80 flex flex-col justify-center px-6 sm:px-12">
          <img
            src="https://storage.googleapis.com/a1aa/image/b95e47d8-0974-478d-ade1-e79096464389.jpg"
            alt="Background"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <h1 className="relative text-white text-3xl sm:text-4xl font-semibold max-w-7xl">
            Contact Messages
          </h1>
          <nav className="relative mt-1 text-sm text-gray-300 max-w-7xl">
            <span>Home</span>
            <span className="mx-1">/</span>
            <span className="text-green-600">Contact</span>
          </nav>
        </header>
      </motion.div>

      {/* Message Table */}
      <motion.div
        className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          User Contact Messages
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-4 py-2 border border-gray-300">#</th>
                  <th className="px-4 py-2 border border-gray-300">Name</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">Message</th>
                  <th className="px-4 py-2 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, index) => (
                  <tr key={msg._id} className="bg-white even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
                    <td className="px-4 py-2 border border-gray-300">{msg.name || "Unknown"}</td>
                    <td className="px-4 py-2 border border-gray-300">{msg.email || "N/A"}</td>
                    <td className="px-4 py-2 border border-gray-300">{msg.message || "-"}</td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageContact;
