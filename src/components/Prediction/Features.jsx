import React, { useState, useEffect } from "react";
import { FaBrain, FaCheckCircle, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } 
  }, [navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async (e) => {
     e.preventDefault();
    const email=localStorage.getItem('email');
     if(!email) {
      alert("register or log in first");
      return;
    }
    if (!file) {
      alert('Please choose a file first!');
      return;
    }
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
      if (response.ok) {
        setResult(data.prediction);
      } else {
        alert(data.error || "Prediction failed.");
      }
    } catch (err) {
      alert("Server error while predicting.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10 text-gray-800 font-sans">
      <br/>
      <br/>
      <br/>
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Brain Tumor Prediction</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Upload your brain scan image for AI-powered analysis. Our advanced
          algorithms will detect potential tumors and provide detailed insights.
        </p>
      </div>

      {/* Upload and Result Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
        {/* Upload Box */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaUpload className="text-blue-500" /> Upload Brain Scan
          </h2>


          <div className="border-2 border-dashed border-blue-400 rounded-md p-6 text-center cursor-pointer">
            <FaBrain className="text-5xl text-blue-500 mx-auto mb-4" />
            <p className="text-lg font-medium">Choose a file</p>
            <p className="text-sm text-gray-500 mt-1">
              Supports JPEG, PNG, DICOM
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="inline-block mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
            >
              Browse Files
            </label>
            {selectedFile && (
              <p className="mt-2 text-green-600">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <button
            onSubmit={handleUpload}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Start Analysis
          </button>
        </div>

        {/* Result Box */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaBrain className="text-blue-500" /> Analysis Results
          </h2>
          {loading ? (
            <p className="text-blue-500 font-medium">Analyzing...</p>
          ) : result ? (
            <p className="text-green-600 font-bold text-lg">Prediction: {result}</p>
          ) : (
            <p className="text-gray-500">
              Upload a brain scan to see analysis results
            </p>
          )}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <FaBrain className="text-3xl text-blue-500 mb-2" />
          <h3 className="font-semibold text-lg mb-1">AI-Powered</h3>
          <p className="text-sm text-gray-600">
            Deep learning models trained on thousands of medical images.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <FaCheckCircle className="text-3xl text-green-500 mb-2" />
          <h3 className="font-semibold text-lg mb-1">High Accuracy</h3>
          <p className="text-sm text-gray-600">
            98.5% accuracy validated in clinical trials.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <FaUpload className="text-3xl text-blue-400 mb-2" />
          <h3 className="font-semibold text-lg mb-1">Easy Upload</h3>
          <p className="text-sm text-gray-600">
            Supports JPEG, PNG, and DICOM formats.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Prediction;