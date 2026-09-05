import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LetterContent from "../components/LetterContent";
import "../App.css";

function LoveLetter() {

  const navigate = useNavigate();

  const [petals, setPetals] = useState([]);

  const audioRef = useRef(new Audio("/music/tera-hua.mp3"));

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
      const id = Date.now() + Math.random();

      setPetals((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 100,
          size: 20 + Math.random() * 20,
          duration: 6 + Math.random() * 4,
        },
      ]);

      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== id));
      }, 10000);

    }, 350);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="love-page">

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

      <div className="stars"></div>

      <div className="hearts-bg"></div>

      <div className="love-container">

        <h1 className="love-title">
          💌 A Letter For My Beautiful Girl ❤️
        </h1>

        <div className="love-paper">
          <LetterContent />
        </div>

        <button
          className="btn"
          onClick={() => navigate("/memory")}
        >
          📸 Our Special Memories ❤️
        </button>

      </div>

    </div>
  );
}

export default LoveLetter;