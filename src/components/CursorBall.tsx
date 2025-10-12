import { useRaycaster } from "../hooks/useRaycaster";

export function CursorBall() {
  const { worldSpacePosition } = useRaycaster();

  return (
    <mesh
      position={[
        worldSpacePosition.x,
        worldSpacePosition.y,
        worldSpacePosition.z,
      ]}
    >
      <sphereGeometry />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}
