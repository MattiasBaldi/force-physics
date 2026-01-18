import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Environment, OrbitControls } from "@react-three/drei";
import { World } from "./World";

export type ExperienceProps = {
  isDebug: boolean;
};

export function Experience({ isDebug }: ExperienceProps) {
  return (
    <Canvas
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        background: "black",
      }}
    >
      {isDebug ? <Perf position="bottom-left" /> : null}
      <OrbitControls />
      <Environment preset="city" />
      <World />
    </Canvas>
  );
}
