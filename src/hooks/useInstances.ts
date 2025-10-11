import { useMemo } from "react";

type Instance = {
  position: [number, number, number];
  spawnDistance?: number;
};

type UseInstancesProps = {
  count: number;
  spawnDistance: number;
};

// InstanceRigidBodyProps[]

export default function useInstances({
  count,
  spawnDistance,
}: UseInstancesProps): Instance[] {
  const instances = useMemo<Instance[]>(
    () =>
      Array.from({ length: count }, () => ({
        key: "instance_" + Math.random(),
        position: [
          (Math.random() - 0.5) * spawnDistance,
          (Math.random() - 0.5) * spawnDistance,
          (Math.random() - 0.5) * spawnDistance,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
        spawnDistance,
      })),
    [count, spawnDistance]
  );

  return instances;
}
