import { RigidBody } from "@react-three/rapier";
import { CustomCollider } from "./CustomCollider.tsx";
import { useControls } from "leva";
import { useMemo } from "react";

export type Props = {
  scale: number;
};

export function CollisionBoxPlanes(props: Props) {
  const scaleConversion = 0.1;

  const { scaledDimensions, positions } = useMemo(() => {
    const scale = props.scale * scaleConversion;
    return {
      scaledDimensions: [5 * scale, 0.001 * scale, 5 * scale] as [
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
  }, [props.scale]);

  return (
    <RigidBody type="fixed">
      <CustomCollider
        scale={scaledDimensions}
        position={positions.bottom}
        rotation={[0, 0, 0]}
      />
      <CustomCollider
        scale={scaledDimensions}
        position={positions.top}
        rotation={[Math.PI, 0, 0]}
      />
      <CustomCollider
        scale={scaledDimensions}
        position={positions.back}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <CustomCollider
        scale={scaledDimensions}
        position={positions.front}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <CustomCollider
        scale={scaledDimensions}
        position={positions.left}
        rotation={[0, 0, Math.PI / 2]}
      />
      <CustomCollider
        scale={scaledDimensions}
        position={positions.right}
        rotation={[0, 0, -Math.PI / 2]}
      />
    </RigidBody>
  );
}
