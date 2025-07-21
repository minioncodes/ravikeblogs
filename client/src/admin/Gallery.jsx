import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const navigate = useNavigate();

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/admin');
        return;
      }

      const res = await fetch('https://backend-production-7e58.up.railway.app/api/image/getimages', {
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
      navigate('/admin');
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
      const res = await fetch(`https://backend-production-7e58.up.railway.app/api/image/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setFullscreenImage(null);
        fetchImages(); 
      } else {
        alert('Failed to delete image');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('Error deleting image');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8  text-white">

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
              className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-white/10 cursor-pointer"
              onClick={() => setFullscreenImage(img)}
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

export default Gallery;
