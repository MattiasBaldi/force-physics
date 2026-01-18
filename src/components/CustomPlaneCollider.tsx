import { CuboidCollider } from "@react-three/rapier";

export type CustomColliderProps = {
  scale: [number, number, number];
  rotation: [number, number, number];
  position: [number, number, number];
};

export function CustomPlaneCollider({
  scale,
  rotation,
  position,
}: CustomColliderProps) {
  return (
    <CuboidCollider args={scale} rotation={rotation} position={position} />
  );
}
