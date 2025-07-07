import { useEffect, useRef, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1743376272672-c130603a3af2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1751220418652-1c10d9616227?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1750222382424-610417abf3b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1750729058168-9cc8090ae2ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1751378838137-7871418702cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1Nnx8fGVufDB8fHx8fA%3D%3D",
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
    timeoutRef.current = setTimeout(nextSlide, 2000);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
     
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="w-full h-full flex-shrink-0"
            style={{ width: "100vw", height: "100vh" }}
          >
            <img
              src={src}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover"
            />
            {/* Remove or adjust overlay for better image visibility */}
            {/* <div className="absolute inset-0 bg-black/30"></div> */}
          </div>
        ))}
      </div>

  
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-4 h-4 rounded-full cursor-pointer border border-white ${
              currentIndex === i ? "bg-white scale-125" : "bg-transparent"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
