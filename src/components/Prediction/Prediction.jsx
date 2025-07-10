import React, { useState, useEffect } from "react";
import { FaBrain, FaCheckCircle, FaUpload, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import brainBg from "/assets/brain8.webp";

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
  const [verifying, setVerifying] = useState(false); // loading during verify

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const refreshCaptcha = () => {
    setUserCaptcha("");
    setCaptchaImg(`https://brain-tumourbackend.onrender.com/generate-captcha?${Date.now()}`);
    setShowCaptcha(true);
    setOtpSent(false);
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
      const response = await fetch("https://brain-tumourbackend.onrender.com/predict", {
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
      const res = await fetch("https://brain-tumourbackend.onrender.com/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captcha: userCaptcha }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("CAPTCHA verified.");
        const otpRes = await fetch("https://brain-tumourbackend.onrender.com/send-otp", {
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
      const res = await fetch("https://brain-tumourbackend.onrender.com/verify-otp", {
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

       <div className="backdrop-blur-sm bg-black/30 rounded-xl p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Brain Tumor Prediction</h1>
          <p className="text-white/80 text-sm sm:text-base max-w-3xl mx-auto">
            Upload your brain scan image for AI-powered analysis. Our advanced algorithms will detect potential tumors and provide detailed insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mb-12">
          {/* Upload Box */}
          <div className="bg-white/20 backdrop-blur-md text-white p-4 sm:p-6 rounded-lg shadow-xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <FaUpload className="text-yellow-300" /> Upload Brain Scan
            </h2>
            <div className="border-2 border-dashed border-yellow-300 rounded-md p-4 sm:p-6 text-center cursor-pointer">
              <FaBrain className="text-4xl sm:text-5xl text-yellow-300 mx-auto mb-4" />
              <p className="text-base sm:text-lg font-medium">Choose a file</p>
              <p className="text-xs sm:text-sm text-white/80 mt-1">Supports JPEG, PNG, DICOM</p>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="inline-block mt-4 bg-yellow-500 text-white px-5 sm:px-6 py-2 rounded hover:bg-yellow-600 transition cursor-pointer text-sm sm:text-base"
              >
                Browse Files
              </label>
              {selectedFile && (
                <p className="mt-2 text-green-200 text-sm break-words">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <button
              onClick={refreshCaptcha}
              className="mt-4 bg-green-500 px-6 py-2 rounded hover:bg-green-600"
            >
              Start Analysis
            </button>
          </div>

         {showCaptcha && !otpSent && (
  <motion.div
    className="w-full flex justify-center items-center mt-6 px-4"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-xl text-black w-full max-w-sm sm:max-w-md md:max-w-lg text-center">
      <p className="mb-2 font-semibold text-base sm:text-lg">Type the word below:</p>

      {captchaImg && (
        <img
          src={captchaImg}
          alt="CAPTCHA"
          className="mx-auto mb-4 rounded shadow select-none pointer-events-none max-w-full h-auto"
        />
      )}

      <input
        type="text"
        value={userCaptcha}
        onChange={(e) => setUserCaptcha(e.target.value)}
        placeholder="Enter CAPTCHA"
        className="w-full border border-gray-300 px-4 py-2 rounded mb-4 text-center focus:ring-2 focus:ring-yellow-500 focus:outline-none"
      />

      <button
        onClick={handleCaptchaSubmit}
        className="w-full bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition font-medium"
      >
        Verify CAPTCHA
      </button>
    </div>
  </motion.div>
)}


          <div className="bg-white/20 p-6 rounded-lg text-white text-center flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
              <FaBrain /> Analysis Results
            </h2>
            {loading ? (
              <p className="text-yellow-300 font-medium">Analyzing...</p>
            ) : result ? (
              <p className="text-green-300 text-lg font-bold">Prediction: {result}</p>
            ) : (
              <p className="text-white/70">Upload a brain scan to start analysis.</p>
            )}
          </div>
        </div>

        <AnimatePresence>
          {otpSent && (
            <motion.div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white text-black rounded-lg p-6 w-full max-w-md"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-center">Enter OTP</h3>

                <div className="relative mb-4">
                  <input
                    type={showOtp ? "text" : "password"}
                    value={userOtp}
                    onChange={(e) => setUserOtp(e.target.value)}
                    className="w-full border px-4 py-2 rounded pr-10"
                    placeholder="Enter OTP"
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowOtp((prev) => !prev)}
                  >
                    {showOtp ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button
                  onClick={handleOtpSubmit}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit OTP
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="my-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <FaBrain className="text-3xl text-yellow-300 mb-2" />,
              title: "AI-Powered",
              desc: "Deep learning models trained on thousands of medical images.",
            },
            {
              icon: <FaCheckCircle className="text-3xl text-green-300 mb-2" />,
              title: "High Accuracy",
              desc: "98.5% accuracy validated in clinical trials.",
            },
            {
              icon: <FaUpload className="text-3xl text-yellow-200 mb-2" />,
              title: "Easy Upload",
              desc: "Supports JPEG, PNG, and DICOM formats.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/20 backdrop-blur-md text-white p-4 sm:p-6 rounded-lg shadow-xl text-center"
            >
              {item.icon}
              <h3 className="font-semibold text-base sm:text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
