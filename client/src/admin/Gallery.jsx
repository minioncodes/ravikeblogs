import React from 'react';

function Gallery() {
 const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6",
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc4",
  "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
  "https://images.unsplash.com/photo-1501769214405-5e86c5e90dc9",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  "https://images.unsplash.com/photo-1557683316-973673baf926",
  "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1",
  "https://images.unsplash.com/photo-1602526216433-57c8d0c3b4f8",
  "https://images.unsplash.com/photo-1558981403-c5f9891be18f",
  "https://images.unsplash.com/photo-1611095564980-bebc6474c9ec",
  "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
  "https://images.unsplash.com/photo-1618221207362-618f982f8c84",
  "https://images.unsplash.com/photo-1622495542540-87884657c7ee",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
  "https://images.unsplash.com/photo-1612831819945-24b3e12eb06b",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
];

  return (
    <div className="min-h-screen px-4 py-8 text-white">
     

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((url, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-white/10"
          >
            <img
              src={url}
              alt={`Gallery ${index + 1}`}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
