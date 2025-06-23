import { motion } from "framer-motion";
import {
  FaBullseye,
  FaRegHeart,
  FaBolt,
  FaBrain,
  FaRegSmile,
} from "react-icons/fa";
import "./Navbar.css";
import Impact from "./Impact";

// Scroll Fade-In Animation
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

// Icon Bounce Animation
const iconBounce = {
  initial: { y: 0 },
  animate: {
    y: [0, -6, 0],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const Navbar = () => {
  return (
    <div className="pt-20 animated-gradient text-white">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          custom={0}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold"
        >
          About TumorDetect
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          custom={1}
          className="mt-4 text-base sm:text-lg"
        >
          We're on a mission to revolutionize brain tumor detection through artificial intelligence,
          making early diagnosis accessible, accurate, and affordable for everyone.
        </motion.p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center px-4">
        {[
          {
            title: "Our Mission",
            icon: <FaBullseye />,
            text:  "To democratize access to advanced brain tumor detection technology, enabling healthcare providers worldwide to deliver faster, more accurate diagnoses and ultimately save more lives through early intervention.",
             
          },
          {
            title: "Our Vision",
            icon: <FaRegHeart />,
            text:  "A world where brain tumors are detected at the earliest possible stage, where distance and resources no longer limit access to world-class medical imaging analysis, and where AI empowers every healthcare provider.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            custom={i + 2}
            className="bg-white text-black p-6 rounded-xl shadow-md w-full md:w-1/2"
          >
            <div className="flex items-center gap-3 text-blue-700 font-bold text-lg sm:text-xl mb-2">
              <motion.div
                className="text-2xl sm:text-3xl"
                variants={iconBounce}
                initial="initial"
                animate="animate"
              >
                {item.icon}
              </motion.div>
              {item.title}
            </div>
            <p className="text-gray-700 text-sm sm:text-base">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* What Makes Us Different */}
      <div className="animated-gradient text-white mt-16 py-12">
        <div className="text-center px-4">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            custom={4}
            className="text-2xl sm:text-3xl font-bold"
          >
            What Makes Us Different
          </motion.h3>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            custom={5}
            className="mt-2 max-w-3xl mx-auto text-base sm:text-lg"
          >
            Our cutting-edge technology combines the latest advances in AI with decades of medical
            expertise to deliver unparalleled accuracy.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="mt-10 flex flex-col md:flex-row justify-center gap-10 px-6">
          {[
            {
              title: "Lightning Fast",
              desc: "Get results in under 30 seconds...",
              icon: <FaBolt />,
            },
            {
              title: "Free to Use",
              desc: "Our AI-powered brain tumor detection service is completely free...",
              icon: <FaRegSmile />,
            },
            {
              title: "AI-Powered",
              desc: "Deep learning models trained on over 1 million brain scans...",
              icon: <FaBrain />,
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="text-center w-full md:w-1/3"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              custom={i + 6}
            >
              <motion.div
                className="text-4xl flex justify-center items-center mb-2"
                variants={iconBounce}
                initial="initial"
                animate="animate"
              >
                {feature.icon}
              </motion.div>
              <h4 className="text-lg sm:text-xl font-semibold">{feature.title}</h4>
              <p className="text-sm sm:text-base mt-1">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Impact />
      </div>
    </div>
  );
};

export default Navbar;
