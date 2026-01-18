import { useControls } from "leva";
import { Physics } from "@react-three/rapier";
import { CollisionBox } from "./CollisionBox/CollisionBox.tsx";
import { Instances } from "./Instances.tsx";
import { CursorBall } from "./CursorBall.tsx";
import { useThree } from "@react-three/fiber";
import { PostProces } from "./PostProces.tsx";

export function World() {
  const controls = useControls(
    "physics",
    {
      // Physics controls
      debug: false,
      restitution: {
        value: 0.8,
        min: 0,
        max: 1,
        step: 0.01,
      },
      friction: {
        value: 0.1,
        min: 0,
        max: 1,
        step: 0.01,
      },
      gravity: {
        value: -9.81,
        min: -20,
        max: 20,
        step: 0.1,
      },
    },
    { collapsed: false }
  );

  const cameraControls = useControls("camera", {
    position: {
      value: { x: -70, y: 0, z: 0 },
      step: 0.1,
    },
  });

  const { camera } = useThree();
  camera.position.set(
    cameraControls.position.x,
    cameraControls.position.y,
    cameraControls.position.z
  );

  return (
    <>
      <PostProces />
      <CursorBall />
      <Physics debug={controls.debug} gravity={[0, controls.gravity, 0]}>
        {/* Instances */}
        <Instances />
        {/* Passive || Collision */}
        <CollisionBox />
      </Physics>
    </>
  );
}
