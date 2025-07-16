import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/admin-login'); 
        return;
      }

      const res = await fetch('http://localhost:3000/api/image/getimages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Unauthorized or failed to fetch');
      }

      const data = await res.json();

      if (data.success) {
        setImages(data.images);
      } else {
        console.error('Failed to fetch images');
      }
    } catch (err) {
      console.error('Error fetching images:', err);
      navigate('/admin-login'); // redirect on error or invalid token
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 text-white">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-10 w-10 border-t-4 border-pink-500 rounded-full"></div>
        </div>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-400">No images found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <div
              key={img._id || index}
              className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-white/10"
            >
              <img
                src={img.url}
                alt={img.customName || `Gallery ${index + 1}`}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
