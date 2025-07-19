import React from "react";
import { motion } from "framer-motion";

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
    <div className="text-white font-sans  bg-gradient-to-br from-gray-900 via-gray-800 to-black">
  
      <section className="flex items-center justify-center px-4 py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mt-15 w-full"
        >
          <img
            src={profileImg}
            alt="Ravi"
            className="w-60 h-40 top-6 rounded-full border-4 border-pink-500 shadow-lg object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-pink-400 mb-2">
              Ravi Ke Vlog
            </h1>
            <p className="text-xl font-semibold text-pink-200">Blogger & Vlogger</p>
            <p className="text-gray-300">📍 India</p>
            <p className="text-gray-400 mt-1">
              Interests: Travel, Technology, Storytelling, Food, Photography
            </p>
          </div>
        </motion.div>
      </section>

   
      <section className=" px-6 py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-pink-400 mb-4">About Ravi</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Hi, I'm Ravi! I'm passionate about vlogging, storytelling, and connecting with people. Through this blog, I hope to inspire, entertain, and inform readers from all walks of life. My journey started with a simple camera and a dream to share my experiences with the world.
          </p>
        </motion.div>
      </section>

  
      <section className=" px-6 py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-pink-400 mb-4">Journey</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Over the years, I've traveled across India, explored hidden gems, tasted amazing food, and met incredible people. My love for technology and photography helps me capture and share these moments in creative ways.
          </p>
        </motion.div>
      </section>

      <section className=" px-6 py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-pink-400 mb-4">About Ravi Ke Vlog</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">Ravi Ke Vlog</strong> is a personal blog where I share my experiences, stories, and insights from daily life, travel, technology, and more. Whether you're here to read about new adventures, learn something new, or just have fun, there’s something for everyone.
          </p>
        </motion.div>
      </section>

   
      <section className="px-6 py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-pink-400 mb-4">Join Me</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Join me as I explore new destinations, review gadgets, share travel tips, and tell stories that matter. Thank you for visiting and being a part of this journey!
          </p>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition"
          >
            Visit My YouTube Channel
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
