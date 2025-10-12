import { useEffect, useState } from "react";
import { useNormalizedMousePosition } from "../hooks/useNormalizedMousePosition";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export type Position = {
  x: number;
  y: number;
  z: number;
};

export function useRaycaster() {
  const { normalizedMousePosition } = useNormalizedMousePosition();
  const { camera, raycaster } = useThree();
  const [worldSpacePosition, setWorldspacePosition] = useState<Position>({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    if (camera) {
      raycaster.setFromCamera(
        new THREE.Vector2(normalizedMousePosition.x, normalizedMousePosition.y),
        camera
      );

      const distance = camera.position.length(); // depth - distance from the camera is constant
      const point = new THREE.Vector3();
      point
        .copy(raycaster.ray.direction)
        .multiplyScalar(distance)
        .add(raycaster.ray.origin);
      setWorldspacePosition(point);
    }
  }, [normalizedMousePosition, camera, raycaster]);

  return { worldSpacePosition, setWorldspacePosition };
}
