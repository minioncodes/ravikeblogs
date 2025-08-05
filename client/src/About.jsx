import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import profileImg from "../src/assets/profile.png"; // Adjust the path as necessary
import { Link } from "react-router-dom";



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
      <div>
        {" "} <br />
        { " "}
      </div>
<div className="mx-auto px-4 py-8">

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

      <section className="px-6 py-16">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-pink-400 mb-4">Who Am I</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
           I’m Ravi, a travel vlogger and nature photographer based in Lucknow, India. I explore hidden gems, scenic trails, and local cultures—capturing the soul of every journey through my lens.
          </p>
        </motion.div>
      </section>

      <section className="px-6 py-16">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-pink-400 mb-4"><Link to="/user-gallery">What I Do</Link></h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            From remote waterfalls to bustling hill stations, I create cinematic travel reels, YouTube vlogs, and still-life photography that tell real stories. My content blends adventure with visual storytelling to inspire and inform.
          </p>
        </motion.div>
      </section>
      <section className="px-6 py-16">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-pink-400 mb-4">Why I Do It</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
         Travel isn’t just about places—it’s about moments, people, and memories. Through my work, I aim to help others see the beauty in the world around them, and maybe even take the first step on their own journey.
          </p>
        </motion.div>
      </section>
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






     
    </div>
  );
};

export default About;
