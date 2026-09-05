function Fireworks({ active }) {
  if (!active) return null;

  const fireworks = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 60,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fireworks">
      {fireworks.map((f) => (
        <span
          key={f.id}
          className="firework"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            animationDelay: `${f.delay}s`,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}

export default Fireworks;