import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Prediction.css';

const Prediction = () => {
  const [activeTab, setActiveTab] = useState('predict');
  const [fileName, setFileName] = useState('No file chosen');
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : 'No file chosen');
    setPrediction('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email');
    if(!email) {
      alert("register or log in first");
      return;
    }
    if (!file) {
      alert('Please choose a file first!');
      return;
    }

   
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

  return (
    <motion.div className="bg-white font-quicksand min-h-screen">
      {/* Header */}
      <header className="relative w-full bg-gray-900 py-6 px-4 sm:px-6 md:px-12">
        <h1 className="text-white text-2xl sm:text-3xl font-semibold bg-blue-800 px-3 py-1 inline-block rounded">
          Brain Tumor Detection
        </h1>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mt-6">
        <div
          className={`px-6 py-2 cursor-pointer text-sm sm:text-base font-medium rounded-t ${
            activeTab === 'predict' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('predict')}
        >
          Perform Prediction
        </div>
      </div>

      {/* Tab Content */}
      <main className="py-10 px-4 sm:px-6 lg:px-8">
        {activeTab === 'predict' && (
          <div className="flex flex-col items-center space-y-6">
            <form
              className="w-full max-w-2xl flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
              onSubmit={handleSubmit}
            >
              <label htmlFor="file-upload" className="cursor-pointer bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-sm sm:text-base">
                Choose File
                <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
              </label>
              <span className="flex-1 text-sm sm:text-base truncate bg-gray-100 px-4 py-2 rounded border border-gray-300">
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
              <div className="text-center text-base sm:text-lg bg-gray-100 p-4 rounded shadow-md w-full max-w-xl mt-4">
                <span className="font-semibold">Prediction:</span> {prediction}
              </div>
            )}
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default Prediction;
