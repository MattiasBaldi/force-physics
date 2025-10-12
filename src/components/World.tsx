import { useControls } from "leva";
import { Physics } from "@react-three/rapier";
import { CollisionBox } from "./CollisionBox.tsx";
import useDebug from "../hooks/useDebug";
import { Instances } from "./Instances.tsx";
import { CursorBall } from "./CursorBall.tsx";

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
    { collapsed: true }
  );

  return (
    <>
      <CursorBall />
      <Physics debug={useDebug()} gravity={[0, controls.gravity, 0]}>
        {/* Instances */}
        <Instances />
        {/* Passive || Collision */}
        <CollisionBox />
      </Physics>
    </>
  );
}
