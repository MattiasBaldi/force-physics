import { CuboidCollider, RigidBody } from "@react-three/rapier";

export type CustomColliderProps = {
  scale: number[];
  rotation: number[];
  position: number[];
};

export function CustomCollider({
  scale,
  rotation,
  position,
}: CustomColliderProps) {
  return (
    <CuboidCollider args={scale} rotation={rotation} position={position} />
  );
}
