import React from "react";
import { motion } from "framer-motion";

const profileImg =
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=400&facepad=2";

const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, when: "beforeChildren" } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: "spring" } },
};

const About = () => (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
            minHeight: "100vh",
            width: "100vw",
            margin: 0,
            padding: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            background: "transparent",
            marginTop: "10%",
        }}
    >
        <motion.div
            variants={itemVariants}
            style={{
                width: "100%",
                maxWidth: 900,
                margin: "40px 16px",
                padding: 40,
                background: "#fff",
                borderRadius: 24,
              
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
          
            <motion.div
                variants={itemVariants}
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 40,
                    width: "100%",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <motion.img
                    variants={itemVariants}
                    src={profileImg}
                    alt="Ravi Profile"
                    style={{
                        width: 160,
                        height: 160,
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: 40,
                        border: "4px solid #4f8cff",
                        boxShadow: "0 4px 16px rgba(79,140,255,0.15)",
                        marginBottom: 16,
                    }}
                />
                <motion.div variants={itemVariants}>
                    <h1 style={{ marginBottom: 12, fontSize: 38, fontWeight: 800, color: "#222" }}>
                        Ravi Ke Vlog
                    </h1>
                    <p style={{ margin: 0, fontWeight: "bold", fontSize: 22, color: "#4f8cff" }}>
                        Blogger & Vlogger
                    </p>
                    <p style={{ margin: 0, fontSize: 18, color: "#555" }}>📍 India</p>
                    <p style={{ margin: 0, fontSize: 18, color: "#555" }}>
                        Interests: Travel, Technology, Storytelling, Food, Photography
                    </p>
                </motion.div>
            </motion.div>

            {/* Detailing Form Section */}
            <motion.dl variants={itemVariants} style={{ width: "100%", textAlign: "left", fontSize: 20, color: "#333" }}>
                <dt style={{ fontWeight: "bold", color: "#4f8cff", fontSize: 26, marginBottom: 8 }}>About Ravi</dt>
                <dd style={{ marginBottom: 20 }}>
                    Hi, I'm Ravi! I'm passionate about vlogging, storytelling, and connecting with people. Through this blog, I hope to inspire, entertain, and inform readers from all walks of life.
                    My journey started with a simple camera and a dream to share my experiences with the world.
                </dd>
                <dt style={{ fontWeight: "bold", color: "#4f8cff", fontSize: 26, marginBottom: 8 }}>Journey</dt>
                <dd style={{ marginBottom: 20 }}>
                    Over the years, I've traveled across India, explored hidden gems, tasted amazing food, and met incredible people. My love for technology and photography helps me capture and share these moments in creative ways.
                </dd>
                <dt style={{ fontWeight: "bold", color: "#4f8cff", fontSize: 26, marginBottom: 8 }}>About Ravi Ke Vlog</dt>
                <dd style={{ marginBottom: 20 }}>
                    <strong>Ravi Ke Vlog</strong> is a personal blog where I share my experiences, stories, and insights from daily life, travel, technology, and more. Whether you're here to read about new adventures, learn something new, or just have fun, there’s something for everyone.
                </dd>
                <dt style={{ fontWeight: "bold", color: "#4f8cff", fontSize: 26, marginBottom: 8 }}>Join Me</dt>
                <dd style={{ marginBottom: 20 }}>
                    Join me as I explore new destinations, review gadgets, share travel tips, and tell stories that matter. Thank you for visiting and being a part of this journey!
                </dd>
                <dd>
                    <a
                        href="https://www.youtube.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            background: "#4f8cff",
                            color: "#fff",
                            padding: "14px 36px",
                            borderRadius: 32,
                            fontSize: 20,
                            fontWeight: 700,
                            textDecoration: "none",
                            boxShadow: "0 2px 8px rgba(79,140,255,0.18)",
                            transition: "background 0.2s",
                        }}
                    >
                        Visit My YouTube Channel
                    </a>
                </dd>
            </motion.dl>
        </motion.div>
    </motion.div>
);

export default About;