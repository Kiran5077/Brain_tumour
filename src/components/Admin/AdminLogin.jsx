import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { motion } from 'framer-motion';



const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const response = await fetch("https://brain-tumourbackend.onrender.com/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem("email", data.email);
      localStorage.setItem("isAdmin", "true");

      setMessage("Login successful!");
      navigate("/");
    } else {
      setMessage(data.message || "Login failed");
    }
  } catch {
    setMessage("Error: Could not connect to server");
  }
};

  return (
    <div className="bg-white text-gray-900 font-nunito">
      <motion.div
        className="bg-white font-quicksand"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <section className="relative bg-black bg-opacity-80 text-white py-16 px-6 sm:px-12 md:px-20" style={{ backgroundColor: "#0f2f2f" }}>
          <img
            src="https://storage.googleapis.com/a1aa/image/7a13c41d-f55e-41f8-dcdb-2143c16968db.jpg"
            alt="Background brain"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            aria-hidden="true"
          />
          <div className="relative max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-2">Admin Login</h2>
            <nav className="text-sm text-green-500 font-medium">
              Home / <span className="text-green-600">Admin Login</span>
            </nav>
          </div>
        </section>
      </motion.div>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <motion.div
          className="bg-white font-quicksand"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h3 className="text-center text-xl font-semibold mb-8">Admin Login</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Id"
              required
              className="w-full border border-gray-300 rounded px-4 py-3"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded px-4 py-3"
            />
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
              Sign In
            </button>
            {message && (
              <p className={`mt-4 text-center ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLogin;
