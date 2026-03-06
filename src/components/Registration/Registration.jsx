import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Import icons

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false); // 👈 show/hide OTP
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (showOTPInput && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0 && showOTPInput) {
      setShowOTPInput(false);
      setMessage("OTP expired. Please register again with a valid email.");
      toast.warning("OTP expired. Please register again.");
    }

    return () => clearInterval(interval);
  }, [timer, showOTPInput]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://brain-tumourbackend.onrender.com/user-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success("OTP sent to your email!");
        setShowOTPInput(true);
        setTimer(60);
      } else {
        setMessage(data.message || "Failed to send OTP. Try again.");
      }
    } catch {
      setMessage("Error: Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://brain-tumourbackend.onrender.com/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("OTP Verified! Registration Complete.");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isUser", "true");

        setName("");
        setEmail("");
        setPassword("");
        setOtp("");
        setTimer(0);
        setShowOTPInput(false);

        navigate("/");
      } else {
        toast.error(data.message || "Invalid OTP or registration failed.");
      }
    } catch {
      toast.error("Error: Could not verify and register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat font-nunito relative"
      style={{ backgroundImage: `url('/assets/brain7.webp')` }}
    >
      <div className="absolute inset-0 bg-opacity-40 backdrop-blur-sm z-0" />

      {loading && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-[6px] border-green-400 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <section className="text-center py-14 px-4 sm:px-10 md:px-20 text-white">
          <h2 className="text-4xl font-bold mb-1">Register</h2>
          <p className="text-green-300 text-sm">
            Home / <span className="text-green-200">User Register</span>
          </p>
        </section>
      </motion.div>

      <main className="w-full max-w-md mx-auto mt-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center text-2xl font-bold text-white mb-6">
            Create an Account
          </h3>

          {!showOTPInput ? (
            <form className="space-y-5" onSubmit={handleRegister}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full border border-gray-200 bg-white bg-opacity-80 rounded px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Id"
                required
                className="w-full border border-gray-200 bg-white bg-opacity-80 rounded px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full border border-gray-200 bg-white bg-opacity-80 rounded px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
                } text-white font-medium py-2.5 rounded transition`}
              >
                {loading ? "Sending OTP..." : "Register"}
              </button>
              {message && (
                <p className="mt-4 text-center text-sm text-red-200">{message}</p>
              )}
            </form>
          ) : (
            <div className="space-y-5 relative">
              <div className="relative">
                <input
                  type={showOtp ? "text" : "password"}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP sent to your email"
                  required
                  className="w-full border border-gray-200 bg-white bg-opacity-80 rounded px-4 py-3 text-sm pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  onClick={() => setShowOtp(!showOtp)}
                >
                  {showOtp ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading}
                className={`w-full ${
                  loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                } text-white font-medium py-2.5 rounded transition`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <p className="text-sm text-white text-center">
                Time left: <span className="font-bold">{timer}</span> seconds
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Register;
