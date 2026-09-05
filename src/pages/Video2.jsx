import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Video2() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [petals, setPetals] = useState([]);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  // Generate lightweight dreamy garden floating petals
  useEffect(() => {
    const petalSymbols = ["🌸", "🌹", "✨", "🌷", "💖"];
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const symbol = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
      setPetals((prev) => [
        ...prev,
        {
          id,
          symbol,
          left: Math.random() * 95,
          size: 16 + Math.random() * 14,
          duration: 7 + Math.random() * 5,
        },
      ]);

      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== id));
      }, 12000);
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // Play video with original audio & handle mobile autoplay restrictions
  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .then(() => {
          setShowPlayOverlay(false);
        })
        .catch(() => {
          setShowPlayOverlay(true);
        });
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .then(() => {
          setShowPlayOverlay(false);
        })
        .catch(() => {
          setShowPlayOverlay(true);
        });
    }
  }, []);

  return (
    <div className="video2-page">
      {/* Floating Dreamy Garden Petals */}
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="video2-petal"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          {petal.symbol}
        </span>
      ))}

      {/* Soft Romantic Garden Glow */}
      <div className="video2-garden-glow" />

      {/* Main Content Container */}
      <div className="video2-container">
        {/* Romantic Heading */}
        <div className="video2-header">
          <h1 className="video2-title">Just One More Special Moment ❤️</h1>
          <p className="video2-subtitle">
            Some moments are better felt than explained... ✨
          </p>
        </div>

        {/* Video Glass Garden Card */}
        <div className="video2-card">
          <video
            ref={videoRef}
            className="video2-video"
            controls
            playsInline
            onPlay={() => setShowPlayOverlay(false)}
            onEnded={() => setVideoEnded(true)}
          >
            <source src="/videos/neha2.mp4" type="video/mp4" />
            <source src="/video/neha2.mp4" type="video/mp4" />
          </video>

          {showPlayOverlay && (
            <div className="video2-overlay" onClick={handlePlayVideo}>
              <div className="video2-play-btn">▶</div>
              <div className="video2-overlay-text">Tap to Play ❤️</div>
              <div className="video2-overlay-subtext">
                Listen to our sweet memory ✨
              </div>
            </div>
          )}
        </div>

        {/* Continue Button After Video */}
        {videoEnded && (
          <button
            className="video2-continue"
            onClick={() => navigate("/final")}
          >
            Continue Our Story →
          </button>
        )}
      </div>
    </div>
  );
}

export default Video2;
