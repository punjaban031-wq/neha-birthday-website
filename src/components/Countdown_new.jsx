import { useEffect, useState } from "react";
import "../styles/Countdown.css";

function Countdown() {
  // Birthday: September 15, 2026 at 12:00 AM IST
  const targetDate = new Date("2026-09-15T00:00:00+05:30");

  // Music file placeholder - will be replaced with actual filename
  const countdownSong = "/music/SONG-FILE-HERE.mp3";

  const getTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isUnlocked: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isUnlocked: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef] = useState(new Audio(countdownSong));
  const [prevSeconds, setPrevSeconds] = useState(timeLeft.seconds);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle music play/pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.play().catch((error) => {
        console.log("Autoplay prevented or audio error:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.pause();
    }

    return () => {
      // Cleanup audio on unmount
      audioRef.pause();
      audioRef.currentTime = 0;
    };
  }, [isPlaying, audioRef]);

  // Animate card on time change
  const cardAnimationClass = timeLeft.seconds !== prevSeconds ? "card-update" : "";
  useEffect(() => {
    setPrevSeconds(timeLeft.seconds);
  }, [timeLeft.seconds]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  // Generate falling petals
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const petalCount = 20;
    const newPetals = Array.from({ length: petalCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 10 + Math.random() * 6,
      size: 6 + Math.random() * 14,
      opacity: 0.25 + Math.random() * 0.5,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="countdown-page">
      {/* Bokeh/Glow Effects Background */}
      <div className="bokeh-container">
        <div className="bokeh bokeh-light-1"></div>
        <div className="bokeh bokeh-light-2"></div>
        <div className="bokeh bokeh-light-3"></div>
      </div>

      {/* Falling Petals */}
      <div className="petals-container">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="petal"
            style={{
              left: `${petal.left}%`,
              "--delay": `${petal.delay}s`,
              "--duration": `${petal.duration}s`,
              "--size": `${petal.size}px`,
              "--opacity": petal.opacity,
            }}
          />
        ))}
      </div>

      {/* Top Badges */}
      <div className="countdown-badges">
        {/* Date Badge */}
        <div className="badge countdown-date-badge">
          <div className="badge-top">📅 15 September ❤️</div>
          <div className="badge-bottom">✨ A day only for you ✨</div>
        </div>

        {/* Music Badge */}
        <div className="badge countdown-music-badge">
          <div className="badge-top">🎵 Our Song</div>
          <div className="badge-bottom">Play a little love ✨</div>
          <button
            className={`countdown-music-button ${isPlaying ? "playing" : ""}`}
            onClick={toggleMusic}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>
      </div>

      {/* Premium Header */}
      <div className="countdown-header">
        <h1 className="countdown-greeting">Good Morning, ♡</h1>
        <h2 className="countdown-main-title">My Sunshine</h2>
        <p className="countdown-personal-message">
          I hope your day begins with the same beautiful smile
          <br />
          that brightens my world every morning. ❤️
        </p>
      </div>

      {/* Countdown Section */}
      {!timeLeft.isUnlocked ? (
        <div className="countdown-locked">
          {/* Countdown Title */}
          <div className="countdown-title">
            ♡  THE SURPRISE UNLOCKS IN  ♡
          </div>

          {/* Countdown Cards */}
          <div className="countdown-cards">
            <div className={`countdown-card ${cardAnimationClass}`}>
              <div className="card-number">{String(timeLeft.days).padStart(2, "0")}</div>
              <div className="card-divider">─♡─</div>
              <div className="card-label">DAYS</div>
            </div>

            <div className={`countdown-card ${cardAnimationClass}`}>
              <div className="card-number">{String(timeLeft.hours).padStart(2, "0")}</div>
              <div className="card-divider">─♡─</div>
              <div className="card-label">HOURS</div>
            </div>

            <div className={`countdown-card ${cardAnimationClass}`}>
              <div className="card-number">{String(timeLeft.minutes).padStart(2, "0")}</div>
              <div className="card-divider">─♡─</div>
              <div className="card-label">MINUTES</div>
            </div>

            <div className={`countdown-card ${cardAnimationClass}`}>
              <div className="card-number">{String(timeLeft.seconds).padStart(2, "0")}</div>
              <div className="card-divider">─♡─</div>
              <div className="card-label">SECONDS</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p className="progress-text">The wait is almost over...</p>
          </div>

          {/* Birthday Vault / Gift Section */}
          <div className="birthday-vault">
            <div className="vault-left">
              <div className="gift-box">
                <div className="gift-ribbon"></div>
                <div className="gift-box-top"></div>
                <div className="gift-box-bottom"></div>
                <div className="gift-sparkles">
                  <span className="sparkle">✨</span>
                  <span className="sparkle">✨</span>
                  <span className="sparkle">✨</span>
                </div>
                <div className="lock-icon">🔒</div>
              </div>
            </div>

            <div className="vault-right">
              <h3 className="vault-title">🔒 SURPRISE LOCKED</h3>
              <p className="vault-message">
                This little world is waiting for the right moment...
              </p>
              <p className="vault-unlock-time">
                Come back when the clock reaches 12:00 AM ❤️
              </p>
              <p className="vault-date">
                📅 Unlocks on 15 September, 2026
              </p>
              <button className="vault-button countdown-disabled-button" disabled>
                🎁 OPEN SURPRISE
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="countdown-unlocked">
          <div className="unlock-animation">
            <span>🔓</span>
          </div>
          <h2 className="unlock-title">It's your day, Neha! ❤️</h2>
          <p className="unlock-message">
            The surprise is now unlocked. Let's celebrate together! ✨
          </p>
          <button className="vault-button countdown-unlocked-button" id="openSurpriseBtn">
            🎁 OPEN YOUR SURPRISE
          </button>
        </div>
      )}

      {/* Final Quote */}
      <div className="countdown-final-quote">
        You are my today and all of my tomorrows.
      </div>
    </div>
  );
}

export default Countdown;
