import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1743376272672-c130603a3af2?w=1200&auto=format&fit=crop&q=66",
  "https://images.unsplash.com/photo-1751220418652-1c10d9616227?w=1200&auto=format&fit=crop&q=60",
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoSlide();
  };

  const resetAutoSlide = () => {
    clearTimeout(timeoutRef.current);
    if (!isHovered) {
      timeoutRef.current = setTimeout(nextSlide, 3000);
    }
  };

  useEffect(() => {
    resetAutoSlide();
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="relative w-full min-h-screen h-screen max-h-full overflow-hidden">
      <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover object-center absolute inset-0"
          draggable="false"
          style={{ zIndex: 0 }}
        />
        {currentIndex === 0 && (
          <Link
            to="/about"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-6 py-3 md:px-12 md:py-5 rounded-lg text-7xl lg:text-7xl font-semibold shadow-lg"
            style={{ pointerEvents: "auto", zIndex: 2 }}
          >
            AboutMe
          </Link>
        )}
        {currentIndex === 1 && (
          <Link
            to="/user-gallery"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-6 py-3 md:px-12 md:py-5 rounded-lg text-7xl inline md:text-7xl font-semibold shadow-lg"
            style={{ pointerEvents: "auto", zIndex: 2 }}
          >
            MyWork
          </Link>
        )}
      </div>

      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full border border-white ${
              currentIndex === i ? "bg-white scale-110" : "bg-transparent"
            } transition-all duration-300`}
          />
        ))}
      </div>

      <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8 z-20 text-xs md:text-sm text-white bg-black/40 px-3 py-1 rounded select-none pointer-events-none">
        © 2025 RKV. All rights reserved.
      </div>
    </div>
  );
};

export default Home;
