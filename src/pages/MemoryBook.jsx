import "../App.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function MemoryBook() {
  const navigate = useNavigate();

  const audioRef = useRef(null);

  const photos = [
    "/images/IMG-20260515-WA0027.jpg",
    "/images/IMG-20260529-WA0009.jpg",
    "/images/IMG-20260628-WA0018.jpg",
    "/images/IMG-20260628-WA0032.jpg",
    "/images/IMG-20260628-WA0035.jpg",
    "/images/IMG-20260628-WA0036.jpg",
    "/images/IMG-20260703-WA0002.jpg",
    "/images/photo1.png",
  ];

  const captions = [
    "My favourite smile 😊",
    "Cutiee 💕",
    "Beautiful memories 🌸",
    "My happy place 💖",
    "Every moment with you ✨",
    "My sunshine ☀️",
    "Forever & Always ❤️",
    "Love ❤️",
  ];

  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const [petals, setPetals] = useState([]);

  const positions = [
    { top: 60, left: 330, rotate: 7 },
    { top: 260, left: 120, rotate: -6 },
    { top: 270, left: 430, rotate: 10 },
    { top: 90, left: 690, rotate: -9 },
    { top: 330, left: 760, rotate: 6 },
    { top: 510, left: 430, rotate: -10 },
    { top: 500, left: 120, rotate: 8 },
  ];

  const isPolaroidComplete = visiblePhotos.length >= Math.min(photos.length, positions.length);

  // ---------------- MUSIC ----------------

  useEffect(() => {
    const audio = new Audio("/music/bairan.mp3");
    audioRef.current = audio;

    audio.currentTime = 6;
    audio.volume = 0.5;

    audio.play().catch(() => {});

    return () => {
      audio.pause();
    };
  }, []);

  // ---------------- PETALS ----------------

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();

      setPetals((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 100,
          size: 18 + Math.random() * 15,
          duration: 6 + Math.random() * 5,
        },
      ]);

      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== id));
      }, 11000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // ---------------- PHOTOS ----------------

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (
        index >= photos.length ||
        index >= captions.length ||
        index >= positions.length
      ) {
        clearInterval(interval);
        return;
      }

      const position = positions[index];

      setVisiblePhotos((prev) => [
        ...prev,
        {
          id: index,
          src: photos[index],
          caption: captions[index],
          top: position.top,
          left: position.left,
          rotate: position.rotate,
        },
      ]);

      index++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="memory-page">
      <h1 className="memory-title">📸 Our Beautiful Memories ❤️</h1>

      {/* Falling Petals */}
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="rose-petal"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          🌸
        </span>
      ))}

      {/* Scrapbook / Polaroid Section */}
      <div className="polaroid-area">
        {visiblePhotos.map((photo) => (
          <div
            key={photo.id}
            className="polaroid"
            style={{
              top: `${photo.top}px`,
              left: `${photo.left}px`,
              transform: `rotate(${photo.rotate}deg)`,
              zIndex: photo.id + 1,
            }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              draggable="false"
            />
            <div className="caption">{photo.caption}</div>
          </div>
        ))}
      </div>

      {/* Bottom Message */}
      {isPolaroidComplete && (
        <div className="memory-message">
          <h2>
            Every picture tells a story, but my favourite story is the one
            where I met you. ❤️
          </h2>
          <p>
            Thank you for every smile, every laugh, every memory, and every
            little moment that made life beautiful. I can't wait to make
            thousands more memories together.
          </p>
        </div>
      )}

      {/* Continue Button to Video Page */}
      {isPolaroidComplete && (
        <button
          className="continue-story-btn"
          onClick={() => navigate("/video")}
          style={{ marginTop: "40px" }}
        >
          Continue Our Story ❤️ →
        </button>
      )}
    </div>
  );
}

export default MemoryBook;