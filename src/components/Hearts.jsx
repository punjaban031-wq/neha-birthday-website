import { useEffect, useState } from "react";

function Hearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();

      setHearts((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 100,
          size: 18 + Math.random() * 20,
        },
      ]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== id));
      }, 6000);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </span>
      ))}
    </>
  );
}

export default Hearts;