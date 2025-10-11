import { useControls } from "leva";
import { RigidBody } from "@react-three/rapier";
import { DoubleSide } from "three";

type BoxProps = {
  scale: number;
};

export function CollisionBoxCube({ scale }: BoxProps) {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <mesh scale={scale}>
        <boxGeometry />
        <meshStandardMaterial
          color="black"
          wireframe={true}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>
    </RigidBody>
  );
}
