import { useState } from "react";
import brainBg from "/assets/brain5.jpg"; // Use a good-quality transparent image

export default function Feedback() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    feedbackTitle: "",
    category: "General Feedback",
    rating: 5,
    detailedFeedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Register or log in first");
      return;
    }
    const res = await fetch("https://brain-tumourbackend.onrender.com/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok){
        alert("Feedback submitted!");
    setFormData({
      fullName: "",
      email: "",
      feedbackTitle: "",
      category: "General Feedback",
      rating: 5,
      detailedFeedback: "",
    });
    }
    else {
      alert("Submission failed.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center pt-20 justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${brainBg})` }}
    >
     
      <div className="max-w-xl w-full bg-white/30 backdrop-blur-md shadow-2xl rounded-xl p-6 border border-white border-opacity-30">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Share Your Experience
        </h2>

        <div className="mb-4 text-center">
          <label className="block text-white font-medium mb-1">
            Overall Rating
          </label>
          <div className="text-yellow-400 text-2xl">★★★★★</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full p-3 border border-white/50 rounded bg-white/10 text-white placeholder-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full p-3 border border-white/50 rounded bg-white/10 text-white placeholder-white"
          />
          <input
            type="text"
            name="feedbackTitle"
            placeholder="Feedback Title"
            onChange={handleChange}
            required
            className="w-full p-3 border border-white/50 rounded bg-white/10 text-white placeholder-white"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-white/50 rounded bg-white/10 text-white"
          >
            <option className="text-black">General Feedback</option>
            <option className="text-black">Bug Report</option>
            <option className="text-black">Feature Request</option>
          </select>
          <textarea
            name="detailedFeedback"
            placeholder="Your Feedback"
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-white/50 rounded bg-white/10 text-white placeholder-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
    
  );
}
