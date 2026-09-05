import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import Countdown from "../components/Countdown";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the unlock button click when birthday arrives
    const handleUnlockClick = () => {
      const button = document.getElementById("openSurpriseBtn");
      if (button) {
        button.addEventListener("click", () => {
          document.body.style.opacity = "0";
          setTimeout(() => {
            navigate("/gallery");
            setTimeout(() => {
              document.body.style.opacity = "1";
            }, 100);
          }, 700);
        });
      }
    };

    // Check for button and add listener
    const timer = setInterval(handleUnlockClick, 100);

    return () => clearInterval(timer);
  }, [navigate]);

  return <Countdown />;
}

export default Home;