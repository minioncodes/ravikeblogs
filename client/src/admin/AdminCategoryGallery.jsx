import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  "Nature",
  "Portrait",
  "Animals",
  "Architecture",
  "Abstract",
  "Travel",
  "Food"
];

const AdminCategoryGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Nature");
  const [loading, setLoading] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const navigate = useNavigate();

  const fetchImagesByCategory = async (category) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin');
      return;
    }

    try {
      setLoading(true);
      const endpoint = `http://localhost:3000/api/image/getimage-category?category=${encodeURIComponent(category)}`;
      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      } else {
        setImages([]);
      }
    } catch (err) {
      console.error("Error fetching:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/image/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setFullscreenImage(null);
        fetchImagesByCategory(selectedCategory);
      } else {
        alert("Failed to delete image");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting image");
    }
  };

  useEffect(() => {
    fetchImagesByCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen  text-white px-6 py-8">
   
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide shadow-md transition-all ${
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
        <p className="text-center text-gray-400">No images found in "{selectedCategory}" category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-white/10 cursor-pointer"
              onClick={() => setFullscreenImage(img)}
            >
              <img
                src={img.url}
                alt={img.customName}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-2">
                <h3 className="font-semibold text-white truncate">{img.customName}</h3>
                <p className="text-sm text-pink-300">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4">
          <div className="relative w-full max-w-5xl">
            <img
              src={fullscreenImage.url}
              alt={fullscreenImage.customName}
              className="w-full max-h-[90vh] object-contain rounded-xl"
            />
            <div className="absolute top-4 right-4 flex gap-3">
              <button
                onClick={() => setFullscreenImage(null)}
                className="text-white text-2xl bg-black/60 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center"
                title="Close"
              >
                ✕
              </button>
              <button
                onClick={() => handleDeleteImage(fullscreenImage._id)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoryGallery;
