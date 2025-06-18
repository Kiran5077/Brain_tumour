import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminPrediction = () => {
  const [activeTab, setActiveTab] = useState('predict');
  const [fileName, setFileName] = useState('No file chosen');
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [loadingPredictions, setLoadingPredictions] = useState(true);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : 'No file chosen');
    setPrediction('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please choose a file first!');
      return;
    }

    const email = localStorage.getItem('email');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    try {
      const res = await fetch('https://brain-tumourbackend.onrender.com/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setPrediction(data.prediction);
      } else {
        setPrediction(`Error: ${data.error || 'Something went wrong.'}`);
      }
    } catch (err) {
      setPrediction('Failed to connect to backend.');
    }
  };

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch("https://brain-tumourbackend.onrender.com/history");
        const data = await response.json();

        if (response.ok) {
          setPredictions(data.predictions || []);
        } else {
          console.error("Failed to fetch predictions:", data.message);
        }
      } catch (error) {
        console.error("Error fetching prediction history:", error);
      } finally {
        setLoadingPredictions(false);
      }
    };

    fetchPredictions();
  }, []);

  const handleDeletePrediction = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/delete-history/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        setPredictions((prev) => prev.filter((p) => p._id !== id));
        alert(result.message);
      } else {
        alert(result.message || "Failed to delete prediction.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error deleting prediction.");
    }
  };

  return (
    <motion.div className="bg-white font-quicksand min-h-screen">
      {/* Header */}
      <header className="w-full h-28 bg-gray-900 flex items-center px-4 sm:px-8">
        <h1 className="text-white text-2xl sm:text-3xl font-semibold bg-blue-800 px-3 py-1 rounded">
          Brain Tumor Detection
        </h1>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mt-6 space-x-4 px-4 sm:px-0">
        <button
          className={`px-6 py-2 rounded text-sm sm:text-base font-medium ${
            activeTab === 'predict' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('predict')}
        >
          Perform Prediction
        </button>
        <button
          className={`px-6 py-2 rounded text-sm sm:text-base font-medium ${
            activeTab === 'history' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('history')}
        >
          Prediction History
        </button>
      </div>

      {/* Tab Content */}
      <main className="py-8 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        {activeTab === 'predict' ? (
          <div className="flex flex-col items-center space-y-6">
            <form
              className="w-full max-w-2xl flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-sm sm:text-base text-center"
              >
                Choose File
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <span className="flex-1 truncate bg-green-700 text-white px-3 py-2 rounded text-sm sm:text-base">
                {fileName}
              </span>
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded text-sm sm:text-base"
              >
                Predict
              </button>
            </form>
            {prediction && (
              <div className="text-center text-base sm:text-lg bg-gray-100 p-4 rounded shadow-md w-full max-w-xl mt-4 break-words">
                <span className="font-semibold">Prediction:</span> {prediction}
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Prediction History</h3>
            {loadingPredictions ? (
              <p>Loading predictions...</p>
            ) : predictions.length === 0 ? (
              <p>No prediction records available.</p>
            ) : (
              <table className="w-full min-w-[600px] table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Prediction</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Timestamp</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 truncate max-w-xs">
                        {item.email?.trim() || "Anonymous"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 truncate max-w-xs">{item.prediction}</td>
                      <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => handleDeletePrediction(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default AdminPrediction;
