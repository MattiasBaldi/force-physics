import { Instance, Instances } from "@react-three/drei";
import { useControls } from "leva";
import useInstances from "../hooks/useInstances";
import { useMemo, useState } from "react";
import { MeshStandardMaterial, SphereGeometry } from "three";
import { Physics, RigidBody, InstancedRigidBodies } from "@react-three/rapier";
import { CollisionBoxCube } from "./CollisionBoxCube";
import { CollisionBoxPlanes } from "./CollisionBoxPlanes";
import useDebug from "../hooks/useDebug";

export function World() {
  type Position = {
    x: number;
    y: number;
    z: number;
  };

  const [position, setPosition] = useState<Position>({ x: 0, y: 0, z: 0 });

  const controls = useControls({
    count: {
      value: 100,
      min: 10,
      max: 1000,
      step: 1,
    },
    spawnDistance: {
      value: 0.15,
      min: 0,
      max: 1,
      step: 0.01,
    },
    color: "black",

    // Physics controls
    PhysicsDebug: useDebug(),
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
      max: 0,
      step: 0.1,
    },
    scale: {
      value: 18,
      min: 0,
      max: 50,
      step: 0.01,
    },
    options: {
      value: "cuboids",
      options: ["trimesh", "cuboids"],
    },
  });

  const instances = useInstances({
    count: controls.count,
    spawnDistance: controls.count * controls.spawnDistance,
  });

  return (
    <>
      <Physics debug={controls.PhysicsDebug} gravity={[0, controls.gravity, 0]}>
        <InstancedRigidBodies instances={instances} colliders="ball">
          <instancedMesh
            receiveShadow
            castShadow
            args={[undefined, undefined, controls.count]}
            count={controls.count}
            dispose={null}
          >
            <sphereGeometry />
            <meshStandardMaterial metalness={1} roughness={0.2} />
          </instancedMesh>
        </InstancedRigidBodies>

        <RigidBody>
          <mesh
            onPointerMove={(e) =>
              setPosition((prev: Position) => ({
                ...prev,
                x: e.point.x,
                y: e.point.y,
              }))
            }
            position={[position.x, position.y, position.z]}
          >
            <sphereGeometry />
            <meshBasicMaterial color="red" />
          </mesh>
        </RigidBody>

        {/* Passive */}
        {controls.options === "trimesh" ? (
          <CollisionBoxCube scale={controls.scale} />
        ) : (
          <CollisionBoxPlanes scale={controls.scale} />
        )}
      </Physics>
    </>
  );
}
