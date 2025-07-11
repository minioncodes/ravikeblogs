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
          // 'Authorization': `token ${token}`,
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
    <div style={styles.container}>
      <h2 style={styles.heading}>📤 Upload Image</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />

      <button onClick={handleUpload} style={styles.button} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {uploadedImageUrl && (
        <div style={styles.preview}>
          <p style={styles.previewText}>Preview:</p>
          <img src={uploadedImageUrl} alt="Uploaded" style={styles.image} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '400px',
    margin: '40px auto',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    backgroundColor: '#fdfdfd',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  heading: {
    marginBottom: '1.5rem',
    color: '#333',
  },
  fileInput: {
    marginBottom: '1rem',
    cursor: 'pointer',
  },
  button: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  },
  preview: {
    marginTop: '1.5rem',
    textAlign: 'left',
  },
  previewText: {
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
};

export default AddImages;
