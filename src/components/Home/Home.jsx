import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";


import "./Home.css";
import Why from "./Why";

const Home = () => {
  const [introRef, introInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const handleStartPrediction = () => {
    const userEmail = localStorage.getItem("email");
    if (!userEmail) {
      alert("Please register or login first.");
      navigate("/user");
    } else {
      navigate("/prediction");
    }
  };


  return (
    <div className="bg-white text-gray-900 font-quicksand">

      {/* Hero Section with Background Video */}
     {/* Hero Section with Background Video */}
<div className="relative w-full h-[100vh] overflow-hidden">
  <video
    className="absolute top-12 left-0 w-full h-full  object-center object-cover"
    src="/assets/video.mp4"
    autoPlay
    muted
    loop
    playsInline
  />
  <div className="absolute inset-0  bg-opacity-50 flex justify-center items-center px-4">
    <motion.div
      className="bg-transparent bg-opacity-10 border border-white border-opacity-30 backdrop-blur-md rounded-xl p-8 max-w-2xl text-center text-black shadow-2xl"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
        Brain Tumor Detection
      </h1>
      <p className="max-w-xl mx-auto text-sm sm:text-base text-black-200 mb-6 drop-shadow-md">
        Upload your brain scan images and let the system detect the presence of a tumor with precision.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
                  onClick={handleStartPrediction}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
                >
                  Start Prediction
                </button>

        <Link to="/about">
          <button className="border border-white  bg-black text-white px-6 py-3 rounded-lg transition">
            Learn More
          </button>
        </Link>
      </div>
    </motion.div>
  </div>
</div>


      {/* Introduction Section remains unchanged */}
      <section className="bg-white py-24 px-6 md:px-24 text-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 px-4 sm:px-6">
          <div className="w-full md:w-[40%]">
            <motion.h3
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-sm text-green-400 uppercase tracking-widest mb-3"
            >
              How We Work
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-3xl md:text-4xl font-bold mb-6  text-black leading-snug"
            >
              5 Simple Steps for Brain Tumor Detection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-gray-400 mb-12"
            >
              The Brain Tumor Detection System is a web-based application that uses advanced AI 
              models to predict brain tumors from MRI or CT scan images. The system is designed to
               provide quick, accurate, and accessible predictions to assist patients and healthcare 
               providers in early detection.

              <br />
              <br />
                Our cutting-edge technology combines artificial intelligence with medical expertise 
                to provide the most accurate brain tumor detection available — accessible anytime
                 with 24/7 service support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 md:mt-12"
            >
              <a
              href="https://www.youtube.com/watch?v=fPhyKvOe8X8"
               target="_blank"
               rel="noopener noreferrer"
            >
  <button
    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-black text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
  >
    Watch This
  </button>
</a>
            </motion.div>
          </div>

          {/* Steps */}
          <div className="w-full md:w-[60%] space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-gray-900 rounded-xl shadow-lg md:mr-20"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 flex items-center justify-center bg-green-500 text-black text-lg font-bold rounded-full shadow-md">
                  1
                </div>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold mb-2">
                   Create an Account
                </h4>
                <p className="text-gray-400">
                   Sign up on our platform to get started with brain tumor detection and manage your prediction history securely.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-gray-900 rounded-xl shadow-lg md:ml-10"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 flex items-center justify-center bg-green-500 text-black text-lg font-bold rounded-full shadow-md">
                  2
                </div>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold mb-2">
                  Login to the Dashboard
                </h4>
                <p className="text-gray-400">
                   Access your dashboard to begin the detection process and explore
                   additional features like feedback and contact .
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-gray-900 rounded-xl shadow-lg md:mr-20"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 flex items-center justify-center bg-green-500 text-black text-lg font-bold rounded-full shadow-md">
                  3
                </div>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold mb-2">
                  Upload Brain Scan Image
                </h4>
                <p className="text-gray-400">
                 On the prediction page, upload the MRI or CT scan image of the brain
                 where the tumor needs to be detected.

                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-gray-900 rounded-xl shadow-lg md:ml-10"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 flex items-center justify-center bg-green-500 text-black text-lg font-bold rounded-full shadow-md">
                  4
                </div>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold mb-2">
                  Click on Predict Button
                </h4>
                <p className="text-gray-400">
                 Once the image is uploaded, click on the Predict button to start
                  the analysis
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-gray-900 rounded-xl shadow-lg md:mr-20"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 flex items-center justify-center bg-green-500 text-black text-lg font-bold rounded-full shadow-md">
                  5
                </div>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold mb-2">
                  View Prediction Result
                </h4>
                <p className="text-gray-400">
                  Our AI model analyzes the image and detects whether a tumor is present,
                   identifying its type such as glioma, meningioma, or pituitary tumor.
                </p>

              </div>
              
            </motion.div>
             
          </div>
            
        </div>
        
      </section>
       <Why />
    </div>
  );
};

export default Home;
