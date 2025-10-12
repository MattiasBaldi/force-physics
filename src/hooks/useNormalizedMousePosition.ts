import { useState, useEffect } from "react";

export type MousePosition = {
  x: number;
  y: number;
};

export function useNormalizedMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({
      x: event.clientX - window.innerWidth / 2, // Normalize
      y: -(event.clientY - window.innerHeight / 2), // Normalize and invert Y
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return { mousePosition, setMousePosition };
}
