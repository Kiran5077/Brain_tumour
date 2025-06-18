import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    try {
      const response = await fetch("https://brain-tumourbackend.onrender.com/get-feedback");
      const data = await response.json();

      if (response.ok && data.success) {
        setFeedbackList(data.feedback || []);
      } else {
        alert(data.message || "Failed to fetch feedback");
      }
    } catch (err) {
      console.error("Error fetching feedback:", err);
      alert("Server error while fetching feedback.");
    } finally {
      setLoading(false);
    }
  };
    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/delete_feedback/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        alert("Feedback deleted successfully.");
        setFeedbackList(feedbackList.filter(item => item._id !== id));
      } else {
        alert(result.message || "Failed to delete feedback.");
      }
    } catch (err) {
      console.error("Error deleting feedback:", err);
      alert("Server error while deleting feedback.");
    }
  };

  useEffect(() => {
    fetchFeedback();
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
            alt="Abstract brain network background"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <h1 className="relative text-white text-3xl sm:text-4xl font-semibold max-w-7xl">
            MNG Feedback
          </h1>
          <nav className="relative mt-1 text-sm text-gray-300 max-w-7xl">
            <span>Home</span>
            <span className="mx-1">/</span>
            <span className="text-green-600">MNG Feedback</span>
          </nav>
        </header>
      </motion.div>

      {/* Feedback Table */}
      <motion.div
        className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          User Feedback
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading feedback...</p>
        ) : feedbackList.length === 0 ? (
          <p className="text-center text-gray-500">No feedback found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-4 py-2 border border-gray-300">#</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">Feedback</th>
                   <th className="px-4 py-2 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.map((item, index) => (
                  <tr key={index} className="bg-white even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.email?.trim() || "Anonymous"}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.feedback || "No feedback provided."}
                    </td>
                     <td className="px-4 py-2 border border-gray-300 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
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

export default AdminFeedback;
