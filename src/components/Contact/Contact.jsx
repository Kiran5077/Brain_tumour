import React, { useState } from 'react';
import './Contact.css';
import { motion } from 'framer-motion';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
      if (!email) {
        alert("please register or login");
        return;
      }

    const response = await fetch('https://brain-tumourbackend.onrender.com/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="contact-bg font-quicksand min-h-screen flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <header className="relative w-full h-32 sm:h-40 bg-black/80 flex flex-col justify-center px-4 sm:px-12">
          <img
            src="https://storage.googleapis.com/a1aa/image/b95e47d8-0974-478d-ade1-e79096464389.jpg"
            alt="Brain background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <h1 className="relative text-white text-2xl sm:text-3xl font-semibold">Contact Us</h1>
          <nav className="relative mt-1 text-xs sm:text-sm text-gray-300">
            <span>Home</span>
            <span className="mx-1">/</span>
            <a href="#" className="text-white hover:underline">Contact Us</a>
          </nav>
        </header>
      </motion.div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6">
        <motion.div
          className="bg-white w-full max-w-md p-5 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-center text-gray-800 text-lg sm:text-xl font-semibold mb-5">Send Us a Message</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded p-3 h-24 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Send
              </button>
            </form>
          ) : (
            <div className="text-center text-green-700 text-base font-semibold mt-4">
              ✅ Message Sent! Thank you for contacting us.
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Contact;
