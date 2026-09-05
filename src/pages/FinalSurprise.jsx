import "../App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function FinalSurprise() {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState([]);

  const audioRef = useRef(new Audio("/music/inam.mp3"));

  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    audioRef.current.play().catch(() => {});

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);
  useEffect(() => {
  const interval = setInterval(() => {
    const id = Date.now();

    setHearts((prev) => [
      ...prev,
      {
        id,
        left: Math.random() * 100,
        size: 20 + Math.random() * 30,
      },
    ]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 6000);
  }, 350);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="final-page">

  {hearts.map((heart) => (
    <span
      key={heart.id}
      className="floating-heart"
      style={{
        left: `${heart.left}%`,
        fontSize: `${heart.size}px`,
      }}
    >
      ❤️
    </span>
  ))}

  <h1 className="birthday-title"></h1>

      <h1 className="birthday-title">
  <span className="party">🎉</span>

  <span>HAPPY BIRTHDAY</span>

  <span>MY LOVE ❤️</span>
</h1>

      <h2 className="subtitle">
  You Will Always Be
  <br />
  My Favorite Person ✨
</h2>

      <p className="final-message">
        Thank you for coming into my life.

        <br /><br />

        Every smile of yours makes my world brighter.

        <br /><br />

        I don't know what the future holds,
        but I know one thing...

        <br /><br />

        Wherever life takes us,
        my heart will always choose you.

        <br /><br />

        Happy Birthday once again,
        My Beautiful Girl. ❤️

        <br /><br />

        I Love You Forever. 🌹
      </p>

      <button
        className="btn"
        onClick={() => navigate("/")}
      >
        ❤️ Start Again
      </button>

    </div>
  );
}

export default FinalSurprise;