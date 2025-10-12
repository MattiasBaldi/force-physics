import { useThree, type Vector3 } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector3 } from "three";

export function useNormalizedCameraPosition() {
  const [cameraPosition, setCameraPosition] = useState<Vector3 | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    setCameraPosition(camera.position);
  }, [camera.position]);

  return { cameraPosition, setCameraPosition };
}
