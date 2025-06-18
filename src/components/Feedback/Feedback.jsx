import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './SendFeedback.css'; // Custom fonts or overrides

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

      const email = localStorage.getItem("email");
      if (!email) {
        alert("please register or login");
        return;
      }

     try {

      const response = await fetch("https://brain-tumourbackend.onrender.com/send-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, email })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFeedback("");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert(data.message || "Failed to send feedback");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-100 font-poppins min-h-screen">
      {/* Header */}
      <motion.div
        className="bg-white font-quicksand"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header className="relative w-full h-36 sm:h-40 bg-black/80 flex flex-col justify-center px-4 sm:px-10">
          <img
            src="https://storage.googleapis.com/a1aa/image/b95e47d8-0974-478d-ade1-e79096464389.jpg"
            alt="Brain background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <h1 className="relative text-white text-2xl sm:text-3xl font-semibold">
            Send Feedback
          </h1>
          <nav className="relative mt-1 text-xs sm:text-sm text-gray-300">
            <span>Home</span>
            <span className="mx-1">/</span>
            <span className="text-green-500">Send Feedback</span>
          </nav>
        </header>
      </motion.div>

      {/* Main Section */}
      <main className="w-full px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-xl mx-auto bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-center text-gray-800 text-lg sm:text-xl font-semibold mb-4">
            Feedback!
          </h2>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border border-gray-300 rounded-md resize-none h-28 p-3 text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Write your feedback here..."
                required
              ></textarea>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
              >
                Send
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="text-center text-green-700 text-base font-semibold mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              ✅ Feedback Sent! Thank you.
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Feedback;
