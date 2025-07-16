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
  const [selectedCategory, setSelectedCategory] = useState("Nature"); // default category
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchImagesByCategory = async (category) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin-login');
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

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      } else {
        console.error("API Error:", data.message);
        setImages([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagesByCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen text-white px-6 py-8">
     

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
          {images.map((img, index) => (
            <div
              key={img._id || index}
              className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-white/10"
            >
              <img
                src={img.url}
                alt={img.customName || `Image ${index + 1}`}
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
    </div>
  );
};

export default AdminCategoryGallery;
