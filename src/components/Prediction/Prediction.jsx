import React, { useState, useEffect } from "react";
import { FaBrain, FaCheckCircle, FaUpload, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import brainBg from "/assets/brain8.webp";

const API = "https://brain-tumourbackend.onrender.com";

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [captchaImg, setCaptchaImg] = useState(null);
  const [userCaptcha, setUserCaptcha] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // ✅ FETCH CAPTCHA WITH COOKIE
  const refreshCaptcha = async () => {
    try {
      setUserCaptcha("");
      const res = await fetch(`${API}/generate-captcha`, {
        credentials: "include",
      });

      const blob = await res.blob();
      const imgUrl = URL.createObjectURL(blob);
      setCaptchaImg(imgUrl);
      setShowCaptcha(true);
      setOtpSent(false);
    } catch {
      toast.error("Failed to load captcha");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResult(null);
    setShowCaptcha(false);
    setOtpSent(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return toast.error("Please select a file.");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("email", email);

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API}/predict`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(response.ok ? data.prediction : "Prediction failed.");
    } catch {
      setResult("Server error during prediction.");
    } finally {
      setLoading(false);
    }
  };

  const handleCaptchaSubmit = async () => {
    setVerifying(true);
    try {
      const res = await fetch(`${API}/verify-captcha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captcha: userCaptcha }),
        credentials: "include", // ✅ REQUIRED
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("CAPTCHA verified.");

        const otpRes = await fetch(`${API}/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const otpData = await otpRes.json();

        if (otpRes.ok) {
          toast.success("OTP sent to email.");
          setOtpSent(true);
        } else {
          toast.error(otpData.message || "Failed to send OTP.");
        }
      } else {
        toast.error("Incorrect CAPTCHA.");
        refreshCaptcha();
      }
    } catch {
      toast.error("Error verifying CAPTCHA.");
    } finally {
      setVerifying(false);
    }
  };

  const handleOtpSubmit = async () => {
    setVerifying(true);
    try {
      const res = await fetch(`${API}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: userOtp }),
      });

      if (res.ok) {
        toast.success("OTP verified. Starting analysis...");
        setShowCaptcha(false);
        setOtpSent(false);
        handleUpload();
      } else {
        toast.error("Invalid OTP.");
      }
    } catch {
      toast.error("Error verifying OTP.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10 text-white relative"
      style={{ backgroundImage: `url(${brainBg})` }}
    >
      {(loading || verifying) && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="w-16 h-16 border-[6px] border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Brain Tumor Prediction</h1>

        <input type="file" onChange={handleFileChange} />

        <button onClick={refreshCaptcha} className="bg-green-500 px-6 py-2 rounded mt-4">
          Start Analysis
        </button>

        {showCaptcha && !otpSent && (
          <div className="bg-white text-black p-6 rounded mt-6 text-center">
            {captchaImg && (
              <img src={captchaImg} alt="captcha" className="mx-auto mb-3" />
            )}

            <input
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              className="border px-3 py-2 w-full mb-3"
              placeholder="Enter captcha"
            />

            <button onClick={handleCaptchaSubmit} className="bg-yellow-500 px-4 py-2 rounded">
              Verify CAPTCHA
            </button>
          </div>
        )}

        {otpSent && (
          <div className="bg-white text-black p-6 rounded mt-6">
            <input
              type={showOtp ? "text" : "password"}
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value)}
              className="border px-3 py-2 w-full mb-3"
            />

            <button onClick={handleOtpSubmit} className="bg-green-500 px-4 py-2 rounded">
              Submit OTP
            </button>
          </div>
        )}

        {result && <p className="mt-6 text-xl">Prediction: {result}</p>}
      </div>
    </div>
  );
};

export default Prediction;
