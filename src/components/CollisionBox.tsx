import { RigidBody } from "@react-three/rapier";
import { CustomPlaneCollider } from "./CustomPlaneCollider.tsx";
import { useControls } from "leva";
import { useMemo } from "react";

export function CollisionBox() {
  const controls = useControls(
    "box",
    {
      scale: {
        value: 2,
        min: 0,
        max: 10,
        step: 0.01,
      },
    },
    { collapsed: true }
  );

  const { scaledDimensions, positions } = useMemo(() => {
    const scale = controls.scale;
    return {
      scaledDimensions: [6 * scale, 0.5 * scale, 5 * scale] as [
        number,
        number,
        number
      ],
      positions: {
        bottom: [0, -5 * scale, 0] as [number, number, number],
        top: [0, 5 * scale, 0] as [number, number, number],
        back: [0, 0, -5 * scale] as [number, number, number],
        front: [0, 0, 5 * scale] as [number, number, number],
        left: [-5 * scale, 0, 0] as [number, number, number],
        right: [5 * scale, 0, 0] as [number, number, number],
      },
    };
  }, [controls.scale]);

  return (
    <RigidBody type="fixed">
      <CustomPlaneCollider
        scale={scaledDimensions}
        position={positions.bottom}
        rotation={[0, 0, 0]}
      />
      <CustomPlaneCollider
        scale={scaledDimensions}
        position={positions.top}
        rotation={[Math.PI, 0, 0]}
      />
      <CustomPlaneCollider
        scale={scaledDimensions}
        position={positions.back}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <CustomPlaneCollider
        scale={scaledDimensions}
        position={positions.front}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <CustomPlaneCollider
        scale={scaledDimensions}
        position={positions.left}
        rotation={[0, 0, Math.PI / 2]}
      />
      <CustomPlaneCollider
        scale={scaledDimensions}
        position={positions.right}
        rotation={[0, 0, -Math.PI / 2]}
      />
    </RigidBody>
  );
}
