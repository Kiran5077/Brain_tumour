import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "./Login.css";

const Login = ({ role = "user" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const loginEndpoint = role === "admin" ? "/admin-login" : "/user-login";

      const response = await fetch(`https://brain-tumourbackend.onrender.com${loginEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Login Successful!");
        localStorage.setItem("email", data.email);

        if (role === "admin") {
          localStorage.setItem("isAdmin", "true");
          localStorage.removeItem("isUser");
          navigate("/admin-dashboard");
        } else {
          localStorage.setItem("isUser", "true");
          localStorage.removeItem("isAdmin");
          navigate("/");
        }
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch {
      setMessage("Error: Could not connect to server");
    }
  };

  return (
    <div className="bg-white text-gray-900 font-nunito min-h-screen">
      <motion.div
        className="bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <section className="relative bg-black bg-opacity-80 text-white py-14 px-4 sm:px-10 md:px-20">
          <img
            src="https://storage.googleapis.com/a1aa/image/7a13c41d-f55e-41f8-dcdb-2143c16968db.jpg"
            alt="Brain background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            aria-hidden="true"
          />
          <div className="relative max-w-4xl mx-auto text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-1">
              {role === "admin" ? "Admin Login" : "User Login"}
            </h2>
            <nav className="text-sm text-green-400">
              Home / <span className="text-green-600">{role === "admin" ? "Admin Login" : "User Login"}</span>
            </nav>
          </div>
        </section>
      </motion.div>

      <main className="w-full max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 sm:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center text-xl font-semibold mb-6">Login to your account</h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
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
              Sign In
            </button>
            {message && (
              <p className={`mt-4 text-center text-sm ${message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;
