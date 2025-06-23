import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const techStack = [
  {
    name: "MongoDB",
    color: "text-blue-500",
    icon: "https://www.svgrepo.com/show/331488/mongodb.svg",
  },
  {
    name: "Flask",
    color: "text-blue-500",
    icon: "https://www.svgrepo.com/show/452091/python.svg",
  },
  {
    name: "Tailwind CSS",
    color: "text-blue-500",
    icon: "https://www.svgrepo.com/show/374118/tailwind.svg",
  },
  {
    name: "React JSX",
    color: "text-blue-500",
    icon: "https://www.svgrepo.com/show/452092/react.svg",
  },
  {
    name: "Deep Learning",
    color: "text-blue-500",
    icon: "https://cdn-icons-png.flaticon.com/512/4206/4206277.png",
  },
];

const Impact = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-8 lg:px-16">
      <div className="text-center max-w-4xl mx-auto">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          custom={0}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800"
        >
          Technologies We Use
        </motion.h3>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          custom={1}
          className="mt-3 text-sm sm:text-base md:text-lg text-gray-600"
        >
          We leverage a powerful and modern tech stack to ensure speed, scalability, and intelligence.
        </motion.p>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto text-center">
        {techStack.map((tech, i) => (
          <motion.div
            key={tech.name}
            className="flex flex-col items-center justify-center space-y-2 p-2 sm:p-4 hover:scale-105 transition-transform duration-300"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            custom={i + 2}
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-md"
            />
            <p className={`text-sm sm:text-base md:text-lg font-medium ${tech.color}`}>
              {tech.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Impact;
