import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import Why from "./Why";

const Home = () => {
  const navigate = useNavigate();
  const [introRef, introInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [showHeroBox, setShowHeroBox] = useState(true); // Control hero box visibility
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
      {/* Hero Section */}
      <div className="relative w-full h-[100vh] overflow-hidden">
        <video
          className="absolute top-12 left-0 w-full h-full object-center object-cover"
          src="/assets/video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-opacity-50 flex justify-center items-center px-4">
          {showHeroBox && (
            <motion.div
              className="relative bg-transparent bg-opacity-10 border border-white border-opacity-30 backdrop-blur-md rounded-xl p-8 max-w-2xl text-center text-black shadow-2xl"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowHeroBox(false)}
                className="absolute top-2 right-2 text-black hover:text-red-500 text-xl font-bold focus:outline-none"
              >
                ×
              </button>

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
                  <button className="border border-white bg-black text-white px-6 py-3 rounded-lg transition">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Introduction Section */}
      <section className="bg-white py-24 px-6 md:px-24 text-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 px-4 sm:px-6">
          {/* Left Column */}
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
              className="text-3xl md:text-4xl font-bold mb-6 text-black leading-snug"
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
              Built with a modern tech stack — React and Tailwind CSS for frontend, Flask for backend API,
              MongoDB for data storage, and a deep learning model for image analysis — this project demonstrates
              how AI and web technologies can work together to solve real-world medical problems.
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

          {/* Right Column - Steps */}
          <div className="w-full md:w-[60%] space-y-8">
            {[
              {
                number: "1",
                title: "Create an Account",
                text: "Sign up on our platform to get started with brain tumor detection and manage your prediction history securely.",
              },
              {
                number: "2",
                title: "Login to the Dashboard",
                text: "Access your dashboard to begin the detection process and explore additional features like feedback and contact.",
              },
              {
                number: "3",
                title: "Upload Brain Scan Image",
                text: "On the prediction page, upload the MRI or CT scan image of the brain where the tumor needs to be detected.",
              },
              {
                number: "4",
                title: "Click on Predict Button",
                text: "Once the image is uploaded, click on the Predict button to start the analysis.",
              },
              {
                number: "5",
                title: "View Prediction Result",
                text: "Our AI model analyzes the image and detects whether a tumor is present, identifying its type such as glioma, meningioma, or pituitary tumor.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15 * index }}
                className={`flex flex-col sm:flex-row items-start gap-6 p-6 bg-gray-900 rounded-xl shadow-lg ${index % 2 === 0 ? "md:mr-20" : "md:ml-10"}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 flex items-center justify-center bg-green-500 text-black text-lg font-bold rounded-full shadow-md">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h4>
                  <p className="text-gray-400">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Component */}
      <Why />
    </div>
  );
};

export default Home;
