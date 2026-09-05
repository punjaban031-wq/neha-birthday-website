import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function VideoPage() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const [petals, setPetals] = useState([]);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  // Floating rose petals background
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      setPetals((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 100,
          size: 18 + Math.random() * 16,
          duration: 6 + Math.random() * 5,
        },
      ]);

      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== id));
      }, 11000);
    }, 350);

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
    <div className="video-page">
      {/* Floating Rose Petals */}
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

      {/* Romantic Background Glow & Sparkles */}
      <div className="stars"></div>
      <div className="hearts-bg"></div>

      {/* Main Content Container */}
      <div className="video-container">
        {/* Header */}
        <div className="neha1-video-header">
          <h1 className="neha1-video-title">Just One More Little Surprise ❤️</h1>
          <p className="neha1-video-subtitle">
            Some moments are better felt than explained... ✨
          </p>
        </div>

        {/* Video Glass Card */}
        <div className="neha1-video-card-wrapper">
          <video
            ref={videoRef}
            src="/videos/neha1.mp4"
            className="neha1-birthday-video"
            controls
            playsInline
            onPlay={() => setShowPlayOverlay(false)}
            onEnded={() => setVideoEnded(true)}
          />

          {showPlayOverlay && (
            <div className="neha1-play-overlay" onClick={handlePlayVideo}>
              <div className="neha1-play-btn-circle">▶</div>
              <div className="neha1-play-text">Tap to Play ❤️</div>
              <div className="neha1-play-subtext">
                Listen to our special memory ✨
              </div>
            </div>
          )}
        </div>

        {videoEnded && (
          <button
            className="continue-story-btn"
            onClick={() => navigate("/video2")}
          >
            Continue Our Story ❤️ →
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoPage;