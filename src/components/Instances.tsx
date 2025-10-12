import React from "react";
import { useEffect, useRef } from "react";
import { useControls } from "leva";
import { InstancedRigidBodies } from "@react-three/rapier";
import useInstances from "../hooks/useInstances";
import useDebug from "../hooks/useDebug";
import { useCursorForce } from "../hooks/useCursorForce";

export function Instances() {
  const controls = useControls(
    "instances",
    {
      count: {
        value: 100,
        min: 10,
        max: 2000,
        step: 1,
      },
      spawnDistance: {
        value: 0.15,
        min: 0,
        max: 1,
        step: 0.01,
      },
      color: "black",
    },
    { collapsed: false }
  );

  const instances = useInstances({
    count: controls.count,
    spawnDistance: controls.count * controls.spawnDistance,
  });

  const instancesRef = useRef(null);
  useCursorForce({ ref: instancesRef, throttle: 0 });

  return (
    <InstancedRigidBodies
      ref={instancesRef}
      instances={instances}
      colliders="ball"
    >
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
  );
}
