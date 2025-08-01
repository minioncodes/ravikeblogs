import React, { useEffect, useState } from "react";

const categories = [
  "All",
  "Nature",
  "Portrait",
  "Animals",
  "Architecture",
  "Abstract",
  "Travel",
  "Food",
];

const UserGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchImages = async (category = "All") => {
    try {
      setLoading(true);
      const url =
        category === "All"
          ? "https://backend-production-7e58.up.railway.app/api/image/getimages"
          : `https:/backend-production-7e58.up.railway.app/api/image/getimage-category?category=${encodeURIComponent(
              category
            )}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setImages(data.images);
      } else {
        console.error("Failed to fetch images");
      }
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-10">
      <h1 className="text-4xl mt-18 font-extrabold text-pink-400 mb-8 text-center drop-shadow-lg">
      
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-md transition-all ${
              selectedCategory === cat
                ? "bg-pink-600 text-white"
                : "bg-white/10 text-pink-200 hover:bg-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-10 w-10 border-t-4 border-pink-500 rounded-full"></div>
        </div>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-400">No images found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((img) => (
            <div
              key={img._id}
              onClick={() => setPreviewImage(img.url)}
              className="cursor-pointer bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={img.url}
                alt={img.customName}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <div>
                <h3 className="text-lg font-bold text-white truncate">
                  {img.customName}
                </h3>
                <p className="text-sm text-pink-300">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}

   
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div className="relative max-w-4xl w-full mx-4">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-contain rounded-xl"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 text-white text-2xl bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGallery;
