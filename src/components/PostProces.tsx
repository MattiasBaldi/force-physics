import { ToneMappingMode, KernelSize } from "postprocessing";
import {
  ToneMapping,
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";
import { useControls, folder } from "leva";

export function PostProces() {
  const controls = useControls("postprocessing", {
    ToneMapping: {
      options: ToneMappingMode,
      value: ToneMappingMode.REINHARD2,
    },
    Bloom: folder({
      MipMapBlur: true,
      Intensity: { value: 1, min: 0, max: 1, step: 0.01 },
      luminanceThreshold: { value: 1, min: 0, max: 1, step: 0.01 },
      luminanceSmoothing: { value: 1, min: 0, max: 1, step: 0.01 },
      KernelSize: { options: KernelSize, value: KernelSize.VERY_SMALL },
    }),
  });

  return (
    <EffectComposer multisampling={8}>
      <Bloom
        mipmapBlur={controls.MipMapBlur}
        luminanceThreshold={controls.luminanceThreshold}
        luminanceSmoothing={controls.luminanceSmoothing}
        intensity={controls.Intensity}
        kernelSize={controls.KernelSize}
      />
      <ToneMapping mode={controls.ToneMapping} />
    </EffectComposer>
  );
}
