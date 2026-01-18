import { useControls } from "leva";
import { useRaycaster } from "../hooks/useRaycaster";

export function CursorBall() {
  const { worldSpacePosition } = useRaycaster();

  const controls = useControls("Cursor Ball", {
    bloomIntensity: {
      value: 20,
      min: 0,
      max: 100,
      step: 0.01,
    },
  });

  return (
    <mesh
      position={[
        worldSpacePosition.x,
        worldSpacePosition.y,
        worldSpacePosition.z,
      ]}
    >
      <sphereGeometry />
      <meshBasicMaterial
        color={[
          controls.bloomIntensity,
          controls.bloomIntensity,
          controls.bloomIntensity,
        ]}
        toneMapped={false}
      />
    </mesh>
  );
}
