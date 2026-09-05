import { useEffect, useRef, useState } from "react";
import "../styles/Countdown.css";

const letterSong = "/music/Gujarati.mp3";

// ==========================================
// CONFIGURATION
// ==========================================
// Lock #1: Entry password required to enter the website
const ENTRY_PASSWORD = "1234";

// Private Developer Mode Check (Localhost / Local Dev Only)
// Production builds for Neha on deployed domains will always return false here.
const checkDevUnlock = () => {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname;
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".local");

  // Safety guard: Dev unlock is ONLY allowed in local development environments
  const isDevEnvironment = Boolean(import.meta.env.DEV || isLocalhost);
  if (!isDevEnvironment) {
    return false;
  }

  // 1. URL search param override (e.g. ?dev=true or ?dev=false)
  const params = new URLSearchParams(window.location.search);
  if (params.get("dev") === "true" || params.get("unlock") === "true") {
    try {
      localStorage.setItem("dev_unlock", "true");
    } catch {}
    return true;
  }
  if (params.get("dev") === "false" || params.get("unlock") === "false") {
    try {
      localStorage.setItem("dev_unlock", "false");
    } catch {}
    return false;
  }

  // 2. Vite environment variable flag override
  if (import.meta.env.VITE_DEV_UNLOCK === "true") return true;
  if (import.meta.env.VITE_DEV_UNLOCK === "false") return false;

  // 3. Saved localStorage preference
  try {
    const storedDevUnlock = localStorage.getItem("dev_unlock");
    if (storedDevUnlock === "true") return true;
    if (storedDevUnlock === "false") return false;
  } catch {}

  // Default for local development: enabled for developer testing
  return true;
};

// Editable image path for the entry lock photo
const LOCK_PHOTO_PATH = "/images/lock-photo.jpg";

const newGujaratiLetterText = `મારી વહાલી Nehaaaaa... 🥹❤️

ક્યારેક મને લાગે છે કે તારા માટે લખવા બેસું ત્યારે શબ્દો પણ મારી સામે નાના પડી જાય છે. 🫶🏻 તું મારા જીવનમાં આવી ત્યારથી નાની નાની ખુશીઓ પણ ખાસ લાગવા લાગી છે. તારી એક સ્માઈલ મારો આખો દિવસ સુંદર બનાવી દે છે, અને તારી સાથેની એક નાની વાત પણ મારા દિલમાં આખો દિવસ રહી જાય છે. 🌸❤️

તને એક વાત કહું? 🙈

તું જ્યારે શરમાઈને સ્માઈલ કરે છે ને, ત્યારે ખરેખર બહુ જ વધારે સુંદર લાગે છે... એટલી કે તને જોઈને હું પોતે જ શરમાઈ જાઉં છું. 🥹❤️🙈

અને જ્યારે તું મારી સામે જોઈને હળવું સ્માઈલ કરે છે, ત્યારે મારા દિલમાં બસ એક જ વાત આવે છે—

"આટલી સુંદર હોવાની પરમિશન તમને કોણે આપી?" 😭🌹

મારી Nehaaaaa, તારી આંખોમાં કંઈક એવું છે જેમાં હું વારંવાર ખોવાઈ જવા માંગુ છું. 🌙 અને તારી સ્માઈલ તો મારી સૌથી favourite વસ્તુ બની ગઈ છે. બસ તું હંમેશા આવી જ હસતી રહેજે, કારણ કે તારી ખુશી જોઈને મારું દિલ પણ ખુશ થઈ જાય છે. ❤️

મને ખબર નથી કે પ્રેમને કેવી રીતે સમજાવવો... પણ જો કોઈ મને પૂછે કે પ્રેમ કેવો દેખાય છે, તો હું બસ તમારું નામ લઈશ. 🥹🌹

હંમેશા તમારો,
જેને તમારી સ્માઈલ થોડી વધારે જ ગમે છે... 🙈❤️`;

const dailyLetters = {
  "2026-09-05": {
    title: "💌 મારી પ્યારી Nehaaaaa માટે ❤️🌸",
    text: newGujaratiLetterText,
    song: letterSong,
  },
  "2026-08-18": {
    title: "💌 મારી પ્યારી Nehaaaaa માટે ❤️🌸",
    text: newGujaratiLetterText,
    song: letterSong,
  },
  "2026-08-19": {
    title: "💌 મારી પ્યારી Nehaaaaa માટે ❤️🌸",
    text: newGujaratiLetterText,
    song: letterSong,
  },
  "2026-08-20": {
    title: "💌 મારી પ્યારી Nehaaaaa માટે ❤️🌸",
    text: newGujaratiLetterText,
    song: letterSong,
  },
};

export const checkBirthdayUnlocked = () => {
  const targetDate = new Date("2026-09-15T00:00:00+05:30");
  const now = new Date();
  const isBirthdayUnlocked = now >= targetDate;
  return isBirthdayUnlocked || checkDevUnlock();
};

function Countdown() {
  // Lock #1: Entry Lock State (Persisted for smooth session experience)
  const [entryUnlocked, setEntryUnlocked] = useState(() => {
    try {
      return localStorage.getItem("neha_entry_unlocked") === "true";
    } catch {
      return false;
    }
  });
  const [entryPin, setEntryPin] = useState("");
  const [entryPinError, setEntryPinError] = useState("");
  const [entryUnlockAnim, setEntryUnlockAnim] = useState(false);

  // Lock #2: Birthday Surprise Target Date (September 15, 2026 at 12:00 AM IST)
  const targetDate = new Date("2026-09-15T00:00:00+05:30");

  const handleEntryKeyPress = (digit) => {
    if (entryUnlocked || entryUnlockAnim) return;
    if (entryPin.length >= 4) return;

    setEntryPinError("");
    const newPin = entryPin + digit;
    setEntryPin(newPin);

    if (newPin.length === 4) {
      if (newPin === ENTRY_PASSWORD) {
        setEntryUnlockAnim(true);
        try {
          localStorage.setItem("neha_entry_unlocked", "true");
        } catch {}
        setTimeout(() => {
          setEntryUnlocked(true);
          setEntryUnlockAnim(false);
        }, 900);
      } else {
        setEntryPinError("Not quite, my love ❤️ Try again...");
        setTimeout(() => {
          setEntryPin("");
        }, 700);
        setTimeout(() => {
          setEntryPinError("");
        }, 2500);
      }
    }
  };

  const handleEntryDelete = () => {
    if (entryUnlocked || entryUnlockAnim) return;
    setEntryPinError("");
    setEntryPin((prev) => prev.slice(0, -1));
  };

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayKey = formatDateKey(new Date());
  const fallbackLetter = {
    title: "💌 મારી પ્યારી Nehaaaaa માટે ❤️🌸",
    text: newGujaratiLetterText,
    song: letterSong,
  };
  const currentLetter = dailyLetters[todayKey] || fallbackLetter;

  const getTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;
    const isBirthdayUnlocked = difference <= 0;
    const isUnlocked = isBirthdayUnlocked || checkDevUnlock();

    if (isBirthdayUnlocked) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isUnlocked,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isUnlocked,
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [greeting, setGreeting] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [prevSeconds, setPrevSeconds] = useState(timeLeft.seconds);

  const dilDiyanGallanRef = useRef(null);
  const gujaratiAudioRef = useRef(null);
  const dilDiyanGallanPositionRef = useRef(176);

  const ensureDilDiyanGallanAudio = () => {
    if (!dilDiyanGallanRef.current) {
      dilDiyanGallanRef.current = new Audio("/music/Dil Diyan Gallan.mp3");
      dilDiyanGallanRef.current.volume = 0.8;
      dilDiyanGallanRef.current.preload = "auto";
    }

    return dilDiyanGallanRef.current;
  };

  const ensureGujaratiAudio = () => {
    if (!gujaratiAudioRef.current) {
      gujaratiAudioRef.current = new Audio("/music/Gujarati.mp3");
      gujaratiAudioRef.current.volume = 0.7;
      gujaratiAudioRef.current.preload = "auto";
    }

    return gujaratiAudioRef.current;
  };

  const pauseDilDiyanGallan = () => {
    const audio = ensureDilDiyanGallanAudio();

    if (audio) {
      dilDiyanGallanPositionRef.current = Number.isFinite(audio.currentTime) ? audio.currentTime : 176;
      audio.pause();
    }
  };

  const pauseGujaratiAudio = () => {
    const audio = ensureGujaratiAudio();

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const startDilDiyanGallan = async (resumeFromSavedPosition = false) => {
    const audio = ensureDilDiyanGallanAudio();

    if (!audio) {
      return;
    }

    const targetTime = resumeFromSavedPosition
      ? Number.isFinite(dilDiyanGallanPositionRef.current)
        ? dilDiyanGallanPositionRef.current
        : 176
      : 176;

    const attemptPlay = async () => {
      try {
        audio.currentTime = targetTime;
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        setIsPlaying(false);
      }
    };

    if (audio.readyState >= 1) {
      await attemptPlay();
      return;
    }

    audio.addEventListener(
      "loadedmetadata",
      () => {
        attemptPlay();
      },
      { once: true }
    );
  };

  const openGujaratiLetterAudio = async () => {
    const dilAudio = ensureDilDiyanGallanAudio();
    if (dilAudio) {
      dilDiyanGallanPositionRef.current = Number.isFinite(dilAudio.currentTime) ? dilAudio.currentTime : 176;
      dilAudio.pause();
    }

    const gujaratiAudio = ensureGujaratiAudio();
    if (gujaratiAudio) {
      gujaratiAudio.currentTime = 0;
      gujaratiAudio.volume = 0.7;
      try {
        await gujaratiAudio.play();
      } catch (error) {
        // Autoplay is blocked; the user interaction already triggered this flow.
      }
    }
  };

  const closeGujaratiLetterAudio = () => {
    const gujaratiAudio = ensureGujaratiAudio();
    if (gujaratiAudio) {
      gujaratiAudio.pause();
      gujaratiAudio.currentTime = 0;
    }

    const dilAudio = ensureDilDiyanGallanAudio();
    if (!dilAudio) {
      return;
    }

    const resumePosition = Number.isFinite(dilDiyanGallanPositionRef.current)
      ? dilDiyanGallanPositionRef.current
      : 176;

    const safeDuration = Number.isFinite(dilAudio.duration) ? dilAudio.duration : 0;

    if (safeDuration > 0 && resumePosition >= 0 && resumePosition < safeDuration) {
      dilAudio.currentTime = resumePosition;
      dilAudio.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleOpenLetter = async () => {
    if (isOpen || isClosing) {
      return;
    }

    setIsClosing(false);
    setIsOpen(true);
    await openGujaratiLetterAudio();
  };

  const handleCloseLetter = () => {
    if (!isOpen && !isClosing) {
      return;
    }

    setIsClosing(true);
    pauseGujaratiAudio();
    closeGujaratiLetterAudio();

    window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 900);
  };

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning, My Sunshine ❤️");
      } else if (hour >= 12 && hour < 20) {
        setGreeting("Good Afternoon, My Lovee ❤️");
      } else {
        setGreeting("Good Night, My Darling ❤️");
      }
    };

    updateGreeting();

    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle music play/pause
  useEffect(() => {
    if (!entryUnlocked) return; // Only trigger music once website is entered

    const audio = ensureDilDiyanGallanAudio();

    if (isPlaying) {
      audio.currentTime = 176;
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      pauseDilDiyanGallan();
    }

    return () => {
      pauseDilDiyanGallan();
      pauseGujaratiAudio();
    };
  }, [isPlaying, entryUnlocked]);

  useEffect(() => {
    if (!entryUnlocked) return;

    const audio = ensureDilDiyanGallanAudio();
    audio.volume = 0.8;

    const startAudio = async () => {
      try {
        if (audio.readyState >= 1) {
          audio.currentTime = 176;
          await audio.play();
        } else {
          audio.addEventListener(
            "loadedmetadata",
            async () => {
              audio.currentTime = 176;
              try {
                await audio.play();
                setIsPlaying(true);
              } catch (error) {
                setIsPlaying(false);
              }
            },
            { once: true }
          );
        }
      } catch (error) {
        setIsPlaying(false);
      }
    };

    startAudio();

    return () => {
      pauseDilDiyanGallan();
      pauseGujaratiAudio();
    };
  }, [entryUnlocked]);

  // Animate card on time change
  const cardAnimationClass = timeLeft.seconds !== prevSeconds ? "card-update" : "";
  useEffect(() => {
    setPrevSeconds(timeLeft.seconds);
  }, [timeLeft.seconds]);

  const renderLetterParagraph = (paragraph) => {
    const emphasis = [
      "આટલી સુંદર છોકરીને હું મારી જિંદગીમાં કેવી રીતે મળી ગયો?",
      "બસ હવે આ છોકરીને જોતા જ રહો!",
      "તું જ્યારે શરમાય છે ત્યારે તું એટલી cute લાગે છે કે મને તને વધારે શરમાવવાનું મન થાય છે...",
      "આટલી સુંદર હોવાની permission કોણે આપી તને?",
      "તું મારા માટે ખૂબ જ ખાસ છે.",
      "મને તું ગમે છે—પૂર્ણપણે, જેવી તું છે એવી.",
      "તને શરમાતી જોવી મારી સૌથી dangerous weakness છે.",
      "આ જ છોકરી છે... જેને હું વારંવાર પ્રેમ કરી બેસું છું.",
      "દરેક વખતે મારું દિલ તને જ પસંદ કરશે.",
      "તું હસતી રહેજે, ખુશ રહેજે અને આવી જ cute રીતે શરમાતી રહેજે...",
    ];

    let content = paragraph;

    emphasis.forEach((word) => {
      const target = word;
      const pattern = new RegExp(target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
      content = content.replace(pattern, `<strong>${target}</strong>`);
    });

    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const toggleMusic = async () => {
    if (isPlaying) {
      pauseDilDiyanGallan();
      setIsPlaying(false);
      return;
    }

    await startDilDiyanGallan();
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

  const renderGardenFlowers = () => (
    <div className="garden-flowers-overlay">
      {/* Top Left Flower Arch */}
      <div className="garden-flower-corner top-left-flowers">
        <svg viewBox="0 0 200 200" className="floral-svg">
          <defs>
            <linearGradient id="roseGradTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff758c" />
              <stop offset="50%" stopColor="#ff7eb3" />
              <stop offset="100%" stopColor="#fda085" />
            </linearGradient>
            <linearGradient id="leafGradTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path d="M0,0 Q60,20 100,80 Q50,90 0,60 Z" fill="url(#leafGradTL)" />
          <circle cx="40" cy="40" r="30" fill="url(#roseGradTL)" opacity="0.9" />
          <circle cx="75" cy="55" r="22" fill="#ffa6b9" opacity="0.85" />
          <circle cx="30" cy="75" r="18" fill="#ffd1dc" opacity="0.9" />
        </svg>
      </div>

      {/* Top Right Flower Arch */}
      <div className="garden-flower-corner top-right-flowers">
        <svg viewBox="0 0 200 200" className="floral-svg">
          <defs>
            <linearGradient id="roseGradTR" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff758c" />
              <stop offset="50%" stopColor="#ff7eb3" />
              <stop offset="100%" stopColor="#fda085" />
            </linearGradient>
          </defs>
          <path d="M200,0 Q140,20 100,80 Q150,90 200,60 Z" fill="url(#leafGradTL)" />
          <circle cx="160" cy="40" r="30" fill="url(#roseGradTR)" opacity="0.9" />
          <circle cx="125" cy="55" r="22" fill="#ffa6b9" opacity="0.85" />
          <circle cx="170" cy="75" r="18" fill="#ffd1dc" opacity="0.9" />
        </svg>
      </div>

      {/* Bottom Left Main Flower Garden Branch */}
      <div className="garden-flower-corner bottom-left-flowers">
        <svg viewBox="0 0 320 400" className="floral-svg-large">
          <defs>
            <linearGradient id="roseGlowL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4fa8" />
              <stop offset="50%" stopColor="#ff7bd5" />
              <stop offset="100%" stopColor="#ffb88c" />
            </linearGradient>
            <linearGradient id="blushGlowL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd1dc" />
              <stop offset="100%" stopColor="#ff9a9e" />
            </linearGradient>
            <radialGradient id="sunGlowLeft" cx="20%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#fff3d7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ffb88c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sun glow halo behind flowers */}
          <circle cx="60" cy="340" r="140" fill="url(#sunGlowLeft)" />

          {/* Stem / Vines */}
          <path d="M-20,420 Q80,300 40,160 Q20,100 80,40" fill="none" stroke="#e879f9" strokeWidth="4" opacity="0.4" strokeDasharray="6 6" />

          {/* Golden Leaves */}
          <path d="M30,220 C60,200 90,220 80,250 C50,260 30,240 30,220 Z" fill="#fef08a" opacity="0.75" />
          <path d="M80,140 C110,120 130,150 120,175 C90,180 70,160 80,140 Z" fill="#fbcfe8" opacity="0.8" />
          <path d="M10,300 C40,280 60,310 50,335 C20,340 0,320 10,300 Z" fill="#fef08a" opacity="0.7" />

          {/* Roses & Petal Bloomed Clusters */}
          <g transform="translate(70, 310)">
            <circle cx="0" cy="0" r="45" fill="url(#roseGlowL)" />
            <circle cx="-10" cy="-8" r="32" fill="#ff7eb3" opacity="0.9" />
            <circle cx="8" cy="10" r="24" fill="#ffb8c6" opacity="0.95" />
            <circle cx="0" cy="0" r="14" fill="#fff0f5" opacity="0.95" />
          </g>

          <g transform="translate(130, 220)">
            <circle cx="0" cy="0" r="36" fill="url(#blushGlowL)" />
            <circle cx="-6" cy="-6" r="25" fill="#ff758c" opacity="0.9" />
            <circle cx="5" cy="5" r="16" fill="#ffe4e1" opacity="0.95" />
          </g>

          <g transform="translate(70, 120)">
            <circle cx="0" cy="0" r="26" fill="url(#roseGlowL)" />
            <circle cx="-4" cy="-4" r="17" fill="#ffd1dc" opacity="0.9" />
            <circle cx="0" cy="0" r="9" fill="#fff" opacity="0.9" />
          </g>

          <circle cx="170" cy="280" r="12" fill="#ffb3c6" opacity="0.8" />
          <circle cx="130" cy="90" r="14" fill="#fecdd3" opacity="0.85" />
        </svg>
      </div>

      {/* Bottom Right Main Flower Garden Branch */}
      <div className="garden-flower-corner bottom-right-flowers">
        <svg viewBox="0 0 320 400" className="floral-svg-large">
          <defs>
            <radialGradient id="sunGlowRight" cx="80%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#fff3d7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#e879f9" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sun glow halo behind right flowers */}
          <circle cx="260" cy="340" r="140" fill="url(#sunGlowRight)" />

          {/* Golden Leaves */}
          <path d="M290,220 C260,200 230,220 240,250 C270,260 290,240 290,220 Z" fill="#fbcfe8" opacity="0.8" />
          <path d="M240,140 C210,120 190,150 200,175 C230,180 250,160 240,140 Z" fill="#fef08a" opacity="0.75" />

          {/* Roses & Petal Bloomed Clusters */}
          <g transform="translate(250, 310)">
            <circle cx="0" cy="0" r="45" fill="url(#roseGlowL)" />
            <circle cx="10" cy="-8" r="32" fill="#ff7eb3" opacity="0.9" />
            <circle cx="-8" cy="10" r="24" fill="#ffb8c6" opacity="0.95" />
            <circle cx="0" cy="0" r="14" fill="#fff0f5" opacity="0.95" />
          </g>

          <g transform="translate(190, 220)">
            <circle cx="0" cy="0" r="36" fill="url(#blushGlowL)" />
            <circle cx="6" cy="-6" r="25" fill="#ff758c" opacity="0.9" />
            <circle cx="-5" cy="5" r="16" fill="#ffe4e1" opacity="0.95" />
          </g>

          <g transform="translate(250, 120)">
            <circle cx="0" cy="0" r="26" fill="url(#roseGlowL)" />
            <circle cx="4" cy="-4" r="17" fill="#ffd1dc" opacity="0.9" />
            <circle cx="0" cy="0" r="9" fill="#fff" opacity="0.9" />
          </g>

          <circle cx="150" cy="280" r="12" fill="#fbcfe8" opacity="0.85" />
          <circle cx="190" cy="90" r="14" fill="#ffd1dc" opacity="0.85" />
        </svg>
      </div>
    </div>
  );

  // ==========================================
  // LOCK #1: ENTRY LOCK SCREEN
  // ==========================================
  if (!entryUnlocked) {
    return (
      <div className="entry-lock-screen">
        {/* Bokeh/Glow Effects Background */}
        <div className="bokeh-container">
          <div className="bokeh bokeh-light-1"></div>
          <div className="bokeh bokeh-light-2"></div>
          <div className="bokeh bokeh-light-3"></div>
        </div>

        {/* Romantic Garden Edge Flowers */}
        {renderGardenFlowers()}

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

        {/* Entry Lock Card */}
        <div className={`entry-lock-card ${entryUnlockAnim ? "card-unlocking" : ""}`}>
          <div className="card-decorations">
            <span className="floating-heart heart-1">❤️</span>
            <span className="floating-heart heart-2">💖</span>
            <span className="floating-sparkle sparkle-1">✨</span>
            <span className="floating-sparkle sparkle-2">✨</span>
          </div>

          <div className="locked-card-header">
            <div className={`lock-icon-wrapper ${entryUnlockAnim ? "unlocking" : ""}`}>
              <span className="lock-emoji">{entryUnlockAnim ? "🔓" : "🔒"}</span>
            </div>
            <h3 className="locked-card-title">
              {entryUnlockAnim ? "WELCOME ❤️" : "SURPRISE LOCKED"}
            </h3>
            <p className="locked-card-intro">
              "This little world is waiting for the right moment..."
            </p>
            <p className="locked-card-subintro">
              Something special is waiting for you ❤️
            </p>
          </div>

          <div className="locked-card-body">
            {/* Special Image in Polaroid Frame */}
            <div className="polaroid-wrapper">
              <div className="polaroid-card">
                <div className="polaroid-pin">📍</div>
                <div className="polaroid-image-container">
                  <img
                    src={LOCK_PHOTO_PATH}
                    alt="Special Memory"
                    className="polaroid-img"
                    onError={(e) => {
                      e.target.src = "/images/image.jpeg";
                    }}
                  />
                  <div className="polaroid-lock-overlay">
                    <div className="overlay-lock-badge">
                      <span className="overlay-lock-icon">🔒</span>
                      <span className="overlay-lock-text">Protected with Love</span>
                    </div>
                  </div>
                </div>
                <div className="polaroid-caption">
                  Waiting for 15 Sept ✨
                </div>
              </div>
            </div>

            {/* Entry PIN Keypad */}
            <div className="pin-section">
              <p className="pin-prompt">Enter our secret code ❤️</p>

              <div className={`pin-dots-container ${entryPinError ? "pin-dots-error" : ""} ${entryUnlockAnim ? "pin-dots-success" : ""}`}>
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`pin-dot ${idx < entryPin.length ? "filled" : ""}`}
                  >
                    {idx < entryPin.length ? "●" : "○"}
                  </div>
                ))}
              </div>

              {entryPinError && (
                <div className="pin-error-msg">
                  <span>{entryPinError}</span>
                </div>
              )}

              <div className="pin-keypad">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className="pin-key"
                    onClick={() => handleEntryKeyPress(num)}
                  >
                    {num}
                  </button>
                ))}
                <div className="pin-key-blank"></div>
                <button
                  type="button"
                  className="pin-key"
                  onClick={() => handleEntryKeyPress("0")}
                >
                  0
                </button>
                <button
                  type="button"
                  className="pin-key pin-key-del"
                  onClick={handleEntryDelete}
                  title="Delete digit"
                >
                  ⌫
                </button>
              </div>
            </div>
          </div>

          <div className="locked-card-footer">
            <p className="locked-time-notice">
              Come back when the clock reaches 12:00 AM ❤️
            </p>
            <div className="locked-date-badge">
              📅 Unlocks on 15 September, 2026
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // LOCK #2 & EXISTING COUNTDOWN PAGE
  // ==========================================
  return (
    <div className="countdown-page">
      {/* Bokeh/Glow Effects Background */}
      <div className="bokeh-container">
        <div className="bokeh bokeh-light-1"></div>
        <div className="bokeh bokeh-light-2"></div>
        <div className="bokeh bokeh-light-3"></div>
      </div>

      {/* Romantic Garden Edge Flowers */}
      {renderGardenFlowers()}

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
        <h1 className="countdown-greeting">{greeting}</h1>
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

          {/* Birthday Vault / Gift Section (Lock #2) */}
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

      <div className="daily-letter-section">
        <div className="daily-letter-title">💌 Today's Little Letter</div>
        <p className="daily-letter-subtitle">Written especially for you.</p>

        {!isOpen && !isClosing ? (
          <div className="envelope-wrapper">
            <div className="envelope-card">
              <div
                className="daily-letter-envelope"
                onClick={handleOpenLetter}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleOpenLetter();
                  }
                }}
              >
                <div className="daily-letter-envelope-flap" />
                <div className="daily-letter-envelope-body" />
                <div className="daily-letter-seal">❤</div>
                <div className="daily-letter-text-block">
                  <div className="daily-letter-icon">💌</div>
                  <h3 className="daily-letter-envelope-title">A Letter For You</h3>
                  <p className="daily-letter-envelope-subtitle">Open this little piece of my heart ❤️</p>
                  <button
                    className="daily-letter-open-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenLetter();
                    }}
                  >
                    Open My Letter 💌
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="daily-letter-paper-wrapper">
            <div className={`daily-letter-paper ${isClosing ? "daily-letter-paper-closing" : "daily-letter-paper-open"}`}>
              <div className="daily-letter-title">{currentLetter.title}</div>
              <div className="daily-letter-scroll">
                <div className="daily-letter-gujarati">
                  {currentLetter.text.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{renderLetterParagraph(paragraph)}</p>
                  ))}
                </div>
              </div>
              <div className="daily-letter-signature">હંમેશા તારો ❤️</div>

              <button className="daily-letter-close-button" onClick={handleCloseLetter}>
                💌 Close Letter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Countdown;