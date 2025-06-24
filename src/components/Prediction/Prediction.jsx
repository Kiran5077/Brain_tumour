import React, { useState, useEffect } from "react";
import { FaBrain, FaCheckCircle, FaUpload } from "react-icons/fa";
import brainBg from "/assets/brain8.webp"; // adjust path as needed

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select a brain scan file to upload.");

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
    } catch (err) {
      console.error("Prediction error:", err);
      setResult("Server error while predicting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 sm:px-6 lg:px-8 py-10 text-white"
      style={{ backgroundImage: `url(${brainBg})` }}
    >
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
              onClick={handleUpload}
              className="mt-6 bg-green-500 text-white px-5 sm:px-6 py-2 rounded hover:bg-green-600 transition text-sm sm:text-base w-full sm:w-auto"
            >
              Start Analysis
            </button>
          </div>

          {/* Result Box */}
          <div className="bg-white/20 backdrop-blur-md text-white p-4 sm:p-6 rounded-lg shadow-xl text-center flex flex-col justify-center items-center">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <FaBrain className="text-yellow-300" /> Analysis Results
            </h2>
            {loading ? (
              <p className="text-yellow-300 font-medium">Analyzing...</p>
            ) : result ? (
              <p className="text-green-200 font-bold text-base sm:text-lg">Prediction: {result}</p>
            ) : (
              <p className="text-white/70 text-sm sm:text-base">Upload a brain scan to see analysis results</p>
            )}
          </div>
        </div>

        {/* Features */}
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
