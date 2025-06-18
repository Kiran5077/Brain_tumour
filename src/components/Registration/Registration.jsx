import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("https://brain-tumourbackend.onrender.com/user-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Registration Successful!");
        localStorage.setItem("email", data.email);
        localStorage.setItem("isUser", "true");
        navigate("/");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch {
      setMessage("Error: Could not connect to server");
    }
  };

  return (
    <div className="bg-white text-gray-900 font-nunito min-h-screen">
      {/* Header */}
      <motion.div
        className="bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <section className="relative bg-black bg-opacity-80 text-white py-14 px-4 sm:px-10 md:px-20">
          <img
            src="https://storage.googleapis.com/a1aa/image/7a13c41d-f55e-41f8-dcdb-2143c16968db.jpg"
            alt="Brain background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            aria-hidden="true"
          />
          <div className="relative max-w-4xl mx-auto text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-1">User Registration</h2>
            <nav className="text-sm text-green-400">
              Home / <span className="text-green-600">Register</span>
            </nav>
          </div>
        </section>
      </motion.div>

      {/* Form */}
      <main className="w-full max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 sm:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center text-xl font-semibold mb-6">Create an Account</h3>
          <form className="space-y-5" onSubmit={handleRegister}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Id"
              required
              className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded transition"
            >
              Register
            </button>
            {message && (
              <p className={`mt-4 text-center text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default Register;
