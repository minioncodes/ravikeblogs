import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

export default function UploadImages() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      customName: file.name.split(".")[0],
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
    <div className=" w-full bg-transparent flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl rounded-3xl backdrop-blur-xl bg-white/10 shadow-2xl p-8 space-y-10 border border-white/20">
        <div className="text-center">
          <FiUploadCloud className="mx-auto mb-4 text-pink-400 w-14 h-14" />
          <h2 className="text-4xl font-extrabold text-white">
            Upload Your Images
          </h2>
          <p className="text-md text-gray-300 mt-2">
            Add name, category & filters per image 🚀
          </p>
        </div>

        <form onSubmit={handleUpload} className="space-y-8">
          <div className="relative border-2 border-dashed border-pink-500 bg-gradient-to-br from-pink-900/30 to-pink-500/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:border-pink-400">
            <label className="block text-lg font-bold text-white mb-3">
              📁 Select or Drop Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-base text-pink-300 font-medium bg-white/10 border border-pink-400 rounded-lg cursor-pointer px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <p className="text-sm text-gray-300 mt-2">
              Supported formats: JPG, PNG, WEBP • Max size: 5MB
            </p>
          </div>

          {selectedFiles.length > 0 && (
            <div className="space-y-10">
              <h3 className="text-xl font-bold text-pink-200">
                Customize Each Image 🛠️
              </h3>

              {selectedFiles.map((fileObj, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white/10 border border-white/20 rounded-2xl shadow-lg backdrop-blur-md"
                >
                  <div className="md:w-1/3 w-full flex-shrink-0">
                    <img
                      src={fileObj.preview}
                      alt={`preview-${index}`}
                      className="w-full h-48 object-cover rounded-xl border border-white/30 shadow-lg"
                    />
                    <div className="text-white mt-2 text-sm truncate">
                      {fileObj.file.name}
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-1">
                        Custom Name
                      </label>
                      <input
                        type="text"
                        value={fileObj.customName}
                        onChange={(e) =>
                          handleChange(index, "customName", e.target.value)
                        }
                        placeholder="e.g., sunset_beach"
                        className="w-full px-4 py-2 border border-purple-400 bg-white/10 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-300 mb-1">
                        Category
                      </label>
                      <select
                        value={fileObj.category}
                        onChange={(e) =>
                          handleChange(index, "category", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-blue-400 bg-white/10 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <label className="block text-sm font-medium text-green-300 mb-1">
                        Filters / Tags
                      </label>
                      <input
                        type="text"
                        value={fileObj.filters}
                        onChange={(e) =>
                          handleChange(index, "filters", e.target.value)
                        }
                        placeholder="e.g., sunset, travel, summer"
                        className="w-full px-4 py-2 border border-green-400 bg-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:scale-[1.02] transition-transform text-white font-bold py-3 rounded-2xl shadow-md"
          >
            <FiUploadCloud className="w-5 h-5" />
            Upload The Images
          </button>
        </form>
      </div>
    </div>
  );
}
