import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function UploadImages() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files).map((file) => ({
            file,
            customName: file.name.split('.')[0],
            category: "",
            filters: "",
        }));
        setSelectedFiles(files);
    };

    const handleChange = (index, key, value) => {
        const updated = [...selectedFiles];
        updated[index][key] = value;
        setSelectedFiles(updated);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFiles.length) return alert("Please select images first");

        const formData = new FormData();
        selectedFiles.forEach(({ file, customName, category, filters }) => {
            formData.append("images", file);
            formData.append("customNames[]", customName);
            formData.append("categories[]", category);
            formData.append("filters[]", filters);
        });

        try {
            const res = await fetch("http://localhost:3000/api/image/uploadmany", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log("Uploaded:", data);
        } catch (err) {
            console.error("Upload failed:", err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-3xl rounded-3xl shadow-2xl p-8 space-y-8">
                <div className="text-center">
                    <UploadCloud className="mx-auto mb-4 text-pink-600 w-12 h-12" />
                    <h2 className="text-3xl font-extrabold text-black">Upload Your Images</h2>
                    <p className="text-md text-black mt-1">Add name, category & filters per image 🚀</p>
                </div>
                <form onSubmit={handleUpload} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-pink-700 font-medium border-2 border-pink-400 rounded-lg cursor-pointer"
                        />
                    </div>

                    {selectedFiles.length > 0 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-purple-700">Customize Each Image 🛠️</h3>

                            {selectedFiles.map((fileObj, index) => (
                                <div key={index} className="p-4 border-2 border-purple-300 rounded-xl shadow-sm space-y-4 bg-white">
                                    <h4 className="text-md font-semibold text-gray-800">
                                        Image {index + 1}: {fileObj.file.name}
                                    </h4>

                                    <div>
                                        <label className="block text-sm font-medium text-purple-700 mb-1">Custom Name</label>
                                        <input
                                            type="text"
                                            value={fileObj.customName}
                                            onChange={(e) => handleChange(index, "customName", e.target.value)}
                                            placeholder="e.g., sunset_beach"
                                            className="w-full px-3 py-2 border-2 border-purple-400 text-black rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-blue-700 mb-1">Category</label>
                                        <select
                                            value={fileObj.category}
                                            onChange={(e) => handleChange(index, "category", e.target.value)}
                                            className="w-full px-3 py-2 border-2 border-blue-400 rounded-md text-black"
                                        >
                                            <option value="">Select a category</option>
                                            <option value="Nature">Nature</option>
                                            <option value="Portrait">Portrait</option>
                                            <option value="Animals">Animals</option>
                                            <option value="Architecture">Architecture</option>
                                            <option value="Abstract">Abstract</option>
                                            <option value="Travel">Travel</option>
                                            <option value="Food">Food</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-1">Filters / Tags</label>
                                        <input
                                            type="text"
                                            value={fileObj.filters}
                                            onChange={(e) => handleChange(index, "filters", e.target.value)}
                                            placeholder="e.g., sunset, travel, summer"
                                            className="w-full px-3 py-2 border-2 border-green-400 rounded-md text-black"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-xl"
                    >
                        <UploadCloud className="w-5 h-5" />
                        Upload The Images
                    </button>
                </form>

            </div>
        </div>
    );
}
