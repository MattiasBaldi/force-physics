import { useState } from "react";
import { useNormalizedMousePosition } from "../hooks/useNormalizedMousePosition";

export type Position = {
  x: number;
  y: number;
  z: number;
};

export function CursorBall() {
  const { mousePosition, setMousePosition } = useNormalizedMousePosition();
  const [position, setPosition] = useState<Position>({ x: 0, y: 0, z: 0 });

  return (
    <mesh position={[mousePosition.x, mousePosition.y, 0]}>
      <sphereGeometry />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}
