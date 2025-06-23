import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import brainBg from "/assets/brain4.jpg";

const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [openFAQ, setOpenFAQ] = useState(null); // Track which FAQ is open

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://brain-tumourbackend.onrender.com/contact", form);
      alert("Message sent successfully!");
      setForm({ fullName: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("Failed to send message");
    }
  };

  const faqList = [
    { q: "🔍 How accurate is the AI detection?", a: "98.5% accuracy in clinical trials." },
    { q: "🖼 What image formats are supported?", a: "DICOM, JPEG, PNG and more." },
    { q: "🔐 Is patient data secure?", a: "Yes, HIPAA-compliant and encrypted." },
    { q: "⏱ How quickly do I get results?", a: "Usually within 30 seconds to 2 minutes." },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 sm:px-6 py-10 text-gray-800"
      style={{ backgroundImage: `url(${brainBg})` }}
    >
      <div className="max-w-7xl mx-auto bg-white/30 backdrop-blur-md rounded-xl p-6 sm:p-10 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
          Get In Touch
        </h1>
        <p className="text-center text-white/90 mb-10 max-w-2xl mx-auto text-sm sm:text-base">
          Have questions about our brain tumor detection technology? Need support? We're here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 p-6 rounded-lg shadow space-y-4"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Send us a message</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-white/90 p-6 rounded-lg shadow space-y-5">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>

            <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-md shadow-sm break-words max-w-full">
              <FaEnvelope className="text-blue-600 text-xl mt-1 shrink-0" />
              <div className="overflow-hidden">
                <p className="font-semibold">Email Us</p>
                <p className="text-gray-700 text-sm break-all">
                  pranshujena2511@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-green-50 p-4 rounded-md">
              <FaPhone className="text-green-600 text-xl mt-1" />
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-gray-700 text-sm">+91 7978120502</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-md">
              <FaMapMarkerAlt className="text-purple-600 text-xl mt-1" />
              <div>
                <p className="font-semibold">Visit Us</p>
                <p className="text-gray-700 text-sm">****</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-md">
              <FaClock className="text-yellow-600 text-xl mt-1" />
              <div>
                <p className="font-semibold">Business Hours</p>
                <p className="text-gray-700 text-sm">*****</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-center mb-8 text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {faqList.map((item, index) => (
              <div
                key={index}
                onClick={() => toggleFAQ(index)}
                className="cursor-pointer bg-white/90 border border-blue-200 p-5 rounded-xl shadow hover:shadow-md transition duration-300"
              >
                <h3 className="text-blue-800 font-semibold mb-2 flex justify-between items-center">
                  {item.q}
                  <span>{openFAQ === index ? "−" : "+"}</span>
                </h3>
                {openFAQ === index && (
                  <p className="text-gray-700 text-sm mt-2">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
