import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LetterContent from "../components/LetterContent";
import "../App.css";

function LoveLetter() {
  const navigate = useNavigate();

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

  return (
    <div className="love-page">

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
          onClick={() => navigate("/gallery")}
        >
          ⬅ Back To Memories
        </button>

      </div>

    </div>
  );
}

export default LoveLetter;