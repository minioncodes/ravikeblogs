import React, { useState } from 'react';
import axios from 'axios';

const AddImages = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file");

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedImageUrl(response.data.image.url);
      alert("Upload successful!");
    } catch (err) {
      console.error('Upload error:', err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="  flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl p-8 rounded-2xl max-w-md w-full text-white">
        <h2 className="text-3xl font-semibold mb-6 text-center">📤 Upload Your Image</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition duration-300"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>

        {uploadedImageUrl && (
          <div className="mt-6">
            <p className="text-lg font-semibold mb-2">✨ Preview:</p>
            <img
              src={uploadedImageUrl}
              alt="Uploaded"
              className="w-full rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddImages;
