import { useControls, folder } from "leva";

export function Box() {
  const controls = useControls("collisionBox", {
    mesh: folder({
      show: false,
      scale: { value: 10, min: 0, max: 100, step: 0.01 },
      material: folder({
        color: { value: "#ffffff" },
        roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
        metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: 0.0, min: 0, max: 1, step: 0.01 },
        clearcoatRoughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
        reflectivity: { value: 0.5, min: 0, max: 1, step: 0.01 },
        transmission: { value: 0.0, min: 0, max: 1, step: 0.01 },
        thickness: { value: 0.01, min: 0, max: 1, step: 0.01 },
        transparency: true,
      }),
    }),
  });

  return (
    <>
      {controls.show ? (
        <mesh scale={controls.scale}>
          <boxGeometry />
          <meshPhysicalMaterial
            color={controls.color}
            roughness={controls.roughness}
            metalness={controls.metalness}
            clearcoat={controls.clearcoat}
            clearcoatRoughness={controls.clearcoatRoughness}
            reflectivity={controls.reflectivity}
            transmission={controls.transmission}
            thickness={controls.thickness}
            transparent={controls.transparency}
          />
        </mesh>
      ) : null}
    </>
  );
}
