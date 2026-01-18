import { useControls } from "leva";
import { RigidBody } from "@react-three/rapier";
import { DoubleSide } from "three";
export type TransformationProps = {
  scale?: number[];
  position?: number[];
  rotation?: number[];
};

export default function Plane(props: TransformationProps) {
  const key: string = Math.random().toString();

  const controls = useControls({
    [`position${key}`]: props.position || [0, 0, 0],
    [`rotation${key}`]: props.rotation || [0, 0, 0],
    [`scale${key}`]: props.scale || [10, 10, 10], // Changed from [0,0,0] which would make it invisible
  } as any) as any;

  return (
    <RigidBody colliders="cuboid">
      <mesh
        scale={controls.scale}
        position={controls.position}
        rotation={controls.rotation}
      >
        <planeGeometry />
        <meshBasicMaterial side={DoubleSide} />
      </mesh>
    </RigidBody>
  );
}
