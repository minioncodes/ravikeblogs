import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const profileImg =
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=400&facepad=2";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const About = () => {
  return (
    <div className="text-white font-sans bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Profile Section */}
      <section className="flex items-center justify-center px-4 py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center gap-8 max-w-5xl w-full"
        >
          <img
            src={profileImg}
            alt="Ravi's profile"
            className="w-40 h-40 rounded-full border-4 border-pink-500 shadow-lg object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-pink-400 mb-2">Ravi Ke Vlog</h1>
            <p className="text-xl font-semibold text-pink-200">Blogger & Vlogger</p>
            <p className="text-gray-300">📍 India</p>
            <p className="text-gray-400 mt-1">
              Interests: Travel, Technology, Storytelling, Food, Photography
            </p>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="px-6 py-16">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-pink-400 mb-4">About Ravi</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Hi, I'm Ravi! I'm passionate about vlogging, storytelling, and connecting with people...
          </p>
        </motion.div>
      </section>

      {/* Journey Section */}
      <section className="px-6 py-16">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-pink-400 mb-4">Journey</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Over the years, I've traveled across India, explored hidden gems...
          </p>
        </motion.div>
      </section>

      {/* About Vlog */}
      <section className="px-6 py-16">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-pink-400 mb-4">About Ravi Ke Vlog</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">Ravi Ke Vlog</strong> is a personal blog where I share my experiences...
          </p>
        </motion.div>
      </section>

      {/* Join Section */}
      <section className="px-6 py-16 text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-pink-400 mb-4">Join Me</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Join me as I explore new destinations, review gadgets...
          </p>
          <a
            href="https://www.youtube.com/@ravikvlogsss"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition"
          >
            Visit My YouTube Channel
          </a>
        </motion.div>
      </section>

      {/* Social Media Links */}
      <section className="px-6 pb-20 text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-pink-400 mb-4">Follow Me</h2>
          <div className="flex justify-center gap-6 text-3xl text-pink-300">
            <a
              href="https://www.instagram.com/ravi_coolpics/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@ravikvlogsss"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-pink-500 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100006735422500"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-pink-500 transition"
            >
              <FaFacebook />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
