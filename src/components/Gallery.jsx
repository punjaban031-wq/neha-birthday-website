import { useEffect, useState } from "react";

function Gallery() {
  const photos = [
    "/images/IMG-20250925-WA0005.jpg",
    "/images/IMG-20251022-WA0040.jpg",
    "/images/IMG-20251025-WA0005.jpg",
    "/images/IMG-20251025-WA0007.jpg",
    "/images/IMG-20251123-WA0015.jpg",
    "/images/IMG-20251123-WA0017.jpg",
    "/images/IMG-20251123-WA0051.jpg",
    "/images/IMG-20251124-WA0002.jpg",
    "/images/IMG-20251130-WA0023.jpg",
    "/images/IMG-20251206-WA0022.jpg",
    "/images/IMG-20260112-WA0004.jpg",
    "/images/IMG-20260112-WA0038.jpg",
  ];

  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(slider);
  }, []);

  return (
    <div className="gallery">
      <img
        src={photos[currentPhoto]}
        alt="Memory"
        className="slider-image"
      />
    </div>
  );
}

export default Gallery;