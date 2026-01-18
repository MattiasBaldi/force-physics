import { useRef } from "react";
import { folder, useControls } from "leva";
import {
  InstancedRigidBodies,
  type RigidBodyTypeString,
} from "@react-three/rapier";
import useInstances from "../hooks/useInstances";
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
      scale: {
        value: 0.1,
        min: 0,
        max: 10,
        step: 0.01,
      },
      spawnDistance: {
        value: 0.15,
        min: 0,
        max: 1,
        step: 0.01,
      },
      throttle: {
        value: 20,
        min: 0,
        max: 100,
        step: 0.1,
      },
    },
    { collapsed: false }
  );

  const physicsControls = useControls("physics", {
    instances: folder({
      type: { value: "dynamic", options: ["dynamic", "kinematic", "fixed"] }, // physics body type: dynamic (moves), kinematic (controlled), fixed (static)
      mass: { value: 1, min: 0, max: 100, step: 0.1 }, // object's mass, affects inertia and force response
      gravityScale: { value: 1, min: 0, max: 5, step: 0.1 }, // multiplier for gravity effect on this object
      linearDamping: { value: 0.01, min: 0, max: 1, step: 0.01 }, // reduces speed over time (linear movement)
      angularDamping: { value: 0.01, min: 0, max: 1, step: 0.01 }, // reduces rotational speed over time
      friction: { value: 0.5, min: 0, max: 1, step: 0.01 }, // resistance to sliding along surfaces
      restitution: { value: 0.01, min: 0, max: 1, step: 0.01 }, // how much the object bounces after collisions
      sensor: { value: false }, // if true, detects collisions but doesn't physically interact
    }),
  });

  const instances = useInstances({
    count: controls.count,
    spawnDistance: controls.count * controls.spawnDistance,
  });

  const instancesRef = useRef(null);
  useCursorForce({ ref: instancesRef, throttle: controls.throttle });

  return (
    <InstancedRigidBodies
      ref={instancesRef}
      instances={instances as any}
      colliders="ball"
      type={physicsControls.type as RigidBodyTypeString}
      mass={physicsControls.mass}
      gravityScale={physicsControls.gravityScale}
      linearDamping={physicsControls.linearDamping}
      angularDamping={physicsControls.angularDamping}
      friction={physicsControls.friction}
      restitution={physicsControls.restitution}
      sensor={physicsControls.sensor}
    >
      <instancedMesh
        receiveShadow
        castShadow
        args={[undefined, undefined, controls.count]}
        count={controls.count}
        dispose={null}
      >
        <sphereGeometry
          scale={[controls.scale, controls.scale, controls.scale]}
        />
        <meshStandardMaterial color={[20, 20, 20]} toneMapped={false} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
