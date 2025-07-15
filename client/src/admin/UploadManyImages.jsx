import React, { useState } from "react";

export default function UploadImages() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFiles([...e.target.files]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFiles.length) {
            alert("Please select images first");
            return;
        }
        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("images", file));

        setUploading(true);

        try {
            const res = await fetch('http://localhost:3000/api/image/uploadmany', {
                method: "POST",
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await res.json();
            setResponseData(data);
            setSelectedFiles([]);
        } catch (err) {
            console.log("Upload failed:", err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 mt-10 border rounded-xl shadow-md bg-white">
            <h2 className="text-xl font-bold mb-4 text-center">Upload Images</h2>

            <form onSubmit={handleUpload} className="space-y-4">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded"
                />

                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </form>

            {responseData?.images && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Uploaded Images:</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {responseData.images.map((img, index) => (
                            <div key={index} className="border rounded p-2">
                                <img src={img.url} alt={img.name} className="w-full h-auto" />
                                <p className="text-sm mt-1 break-all">{img.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

