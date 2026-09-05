import "../App.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

function Gallery() {

  const navigate = useNavigate();

  const [currentPhoto, setCurrentPhoto] = useState(0);

  const audioRef = useRef(new Audio("/music/inam.mp3"));

  useEffect(() => {

    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    audioRef.current.play().catch(() => {});

    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3500);

    return () => {
      clearInterval(interval);
      audioRef.current.pause();
    };

  }, []);

  const next = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prev = () => {
    setCurrentPhoto((prev) =>
      prev === 0 ? photos.length - 1 : prev - 1
    );
  };

  return (

    <div className="container">

      <h1>💖 My Girl ❤️</h1>

      <div className="gallery">

        <img
          src={photos[currentPhoto]}
          alt="memory"
          className="slider-image"
        />

      </div>

      <h3>
        {currentPhoto + 1} / {photos.length}
      </h3>

      <div
        style={{
          display:"flex",
          gap:"20px",
          marginTop:"20px"
        }}
      >

        <button className="btn" onClick={prev}>
          ⬅ Previous
        </button>

        <button className="btn" onClick={next}>
          Next ➡
        </button>

      </div>

      <button
        className="letterBtn"
        onClick={() => navigate("/love-letter")}
      >
        💌 Read My Letter
      </button>

    </div>

  );

}

export default Gallery;