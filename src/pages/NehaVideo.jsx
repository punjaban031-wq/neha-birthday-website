import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function NehaVideo() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [petals, setPetals] = useState([]);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  // Floating rose and blossom petals background effect
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const icons = ["🌸", "🌷", "✨", "💖"];
      const icon = icons[Math.floor(Math.random() * icons.length)];

      setPetals((prev) => [
        ...prev,
        {
          id,
          icon,
          left: Math.random() * 100,
          size: 16 + Math.random() * 18,
          duration: 6 + Math.random() * 5,
        },
      ]);

      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== id));
      }, 11000);
    }, 350);

    return () => clearInterval(interval);
  }, []);

  // Handle playing video with embedded audio & mobile autoplay restrictions
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

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="neha-video-page">
      {/* Floating Petals & Sparkles */}
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
          {petal.icon}
        </span>
      ))}

      {/* Romantic Background Glow & Sparkles */}
      <div className="stars"></div>
      <div className="hearts-bg"></div>

      {/* Main Content Container */}
      <div className="neha1-video-section" style={{ marginTop: "20px" }}>
        {/* Header Text */}
        <div className="neha1-video-header">
          <h1
            className="neha1-video-title"
            style={{
              color: "#ff65a3",
              textShadow: "0 4px 20px rgba(255, 101, 163, 0.4)",
            }}
          >
            Just For You, Nehaaaaa ❤️
          </h1>
          <p className="neha1-video-subtitle" style={{ color: "#e8b0d5" }}>
            A little memory before we continue our story... 🌸
          </p>
        </div>

        {/* Video Glass Card */}
        <div
          className="neha1-video-card-wrapper"
          style={{
            background: "rgba(50, 20, 60, 0.55)",
            border: "1.5px solid rgba(232, 176, 213, 0.4)",
            boxShadow: "0 20px 50px rgba(180, 50, 140, 0.35)",
            maxWidth: "450px",
          }}
        >
          <video
            ref={videoRef}
            src="/videos/neha.mp4"
            className="neha1-birthday-video"
            controls
            playsInline
            onPlay={() => setShowPlayOverlay(false)}
            onEnded={() => setVideoEnded(true)}
            style={{ borderRadius: "18px" }}
          />

          {showPlayOverlay && (
            <div className="neha1-play-overlay" onClick={handlePlayVideo}>
              <div
                className="neha1-play-btn-circle"
                style={{
                  background: "linear-gradient(135deg, #d1569c, #ff758c)",
                }}
              >
                ▶
              </div>
              <div className="neha1-play-text">Tap to Play ❤️</div>
              <div className="neha1-play-subtext">
                Listen to our special memory ✨
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        {videoEnded && (
          <button
            className="continue-story-btn"
            onClick={() => navigate("/memory")}
            style={{
              background: "linear-gradient(135deg, #c44593, #ff6584)",
              boxShadow: "0 10px 30px rgba(196, 69, 147, 0.5)",
              marginTop: "30px",
            }}
          >
            Continue Our Memories → ❤️
          </button>
        )}
      </div>
    </div>
  );
}

export default NehaVideo;
