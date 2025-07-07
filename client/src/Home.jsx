import { useEffect, useRef, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1743376272672-c130603a3af2?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1751220418652-1c10d9616227?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1750222382424-610417abf3b1?w=1200&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1750729058168-9cc8090ae2ec?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1751378838137-7871418702cb?w=1200&auto=format&fit=crop&q=60",
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    timeoutRef.current = setTimeout(nextSlide, 4000);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
     
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${(100 / images.length) * currentIndex}%)`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full h-full"
            style={{ width: "100%", height: "100%" }}
          >
            <img
              src={src}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover object-center"
              draggable="false"
            />
          </div>
        ))}
      </div>

    
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full border border-white ${
              currentIndex === i ? "bg-white scale-110" : "bg-transparent"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
