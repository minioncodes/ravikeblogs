import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  const fetchImages = async () => {
    try {
      const res = await axios.get("https://backend-production-7e58.up.railway.app/api/image/getimages");
      const data = res.data;

      if (data.success && Array.isArray(data.images)) {
        const shuffled = data.images.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2).map((img) => img.url || img.image || img); 
        setImages(selected);
      }
    } catch (err) {
      console.error("Failed to fetch images", err);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const startAutoSlide = () => {
    clearTimeout(timeoutRef.current);
    if (!isHovered && images.length > 1) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 3000);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isHovered, images]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-t-transparent border-r-cyan-500 border-b-yellow-500 border-l-pink-500"></div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-lg">
        Failed to load images.
      </div>
    );
  }

  return (
    <div
      className="relative w-full min-h-screen h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
   
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />


      <div className="absolute inset-0 flex items-center justify-center z-10">
        {currentIndex === 0 && (
          <Link
            to="/about"
            className="text-white px-6 py-3 md:px-12 md:py-5 rounded-lg whitespace-nowrap text-7xl md:text-7xl font-semibold"
          >
            About Me
          </Link>
        )}
        {currentIndex === 1 && (
          <Link
            to="/user-gallery"
            className="text-white px-6 py-3 md:px-12 md:py-5 rounded-lg whitespace-nowrap text-7xl md:text-7xl font-semibold"
          >
            My Work
          </Link>
        )}
      </div>

     
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              clearTimeout(timeoutRef.current);
            }}
            className={`w-3 h-3 rounded-full border border-white ${
              currentIndex === i ? "bg-white scale-110" : "bg-transparent"
            } transition-all duration-300`}
          />
        ))}
      </div>

     
      <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8 z-20 text-xs md:text-sm text-white bg-black/40 px-3 py-1 rounded">
        © 2025 RKV. All rights reserved.
      </div>
    </div>
  );
};

export default Home;
