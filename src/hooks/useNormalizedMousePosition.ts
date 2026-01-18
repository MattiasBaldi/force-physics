import { useState, useEffect, useRef } from "react";

export type MousePosition = {
  x: number;
  y: number;
};

export function useNormalizedMousePosition() {
  const [normalizedMousePosition, setNormalizedMousePosition] =
    useState<MousePosition>({
      x: 0,
      y: 0,
    });

  // Store the last mouse position
  const lastMousePosition = useRef<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    const pos = {
      x: event.clientX,
      y: event.clientY,
    };
    lastMousePosition.current = pos;

    setNormalizedMousePosition({
      x: (pos.x / window.innerWidth) * 2 - 1,
      y: -((pos.y / window.innerHeight) * 2 - 1),
    });
  };

  const handleWheel = () => {
    const pos = lastMousePosition.current;
    setNormalizedMousePosition({
      x: (pos.x / window.innerWidth) * 2 - 1,
      y: -((pos.y / window.innerHeight) * 2 - 1),
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return { normalizedMousePosition, setNormalizedMousePosition };
}
