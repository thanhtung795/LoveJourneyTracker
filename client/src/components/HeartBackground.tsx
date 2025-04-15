import { useEffect, useRef } from "react";

const HeartBackground = () => {
  const heartsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heartsRef.current) return;
    
    const hearts = heartsRef.current;
    const intervalId = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${3 + Math.random() * 3}s`;
      hearts.appendChild(heart);
      
      setTimeout(() => heart.remove(), 6000);
    }, 300);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  return (
    <div 
      ref={heartsRef} 
      className="hearts fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0"
    />
  );
};

export default HeartBackground;
