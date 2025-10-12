import { useCallback, useEffect, useRef } from "react";
import { useNormalizedMousePosition } from "./useNormalizedMousePosition";
import { useNormalizedCameraPosition } from "./useCameraPosition";
import { MathUtils } from "three";
import { useControls } from "leva";

export type ForceProps = {
  ref: React.RefObject<null>;
  throttle?: number;
};

export function useCursorForce({ ref, throttle = 0 }: ForceProps) {
  const { mousePosition, setMousePosition } = useNormalizedMousePosition();
  const { cameraPosition, setCameraPosition } = useNormalizedCameraPosition();
  const throttleRef = useRef<number>(throttle);

  const controls = useControls("instances", {
    acceleration: {
      value: 10,
      min: 0,
      max: 50,
      step: 0.01,
    },
    maxForce: {
      value: 100,
      min: 0,
      max: 500,
      step: 0.1,
    },
  });

  const applyThrottle = useCallback(
    (fn: () => void) => {
      const now = Date.now();
      if (now - throttleRef.current < throttle) return;
      throttleRef.current = now;
      fn();
    },
    [throttleRef, throttle]
  );

  const applyForce = useCallback(() => {
    if (ref.current) {
      const force = {
        x: MathUtils.clamp(
          mousePosition.x * controls.acceleration,
          -controls.maxForce,
          controls.maxForce
        ),
        y: MathUtils.clamp(
          mousePosition.y * controls.acceleration,
          -controls.maxForce,
          controls.maxForce
        ),
        z: MathUtils.clamp(
          mousePosition.x * controls.acceleration,
          -controls.maxForce,
          controls.maxForce
        ),
      };

      ref.current.forEach((i: any) => {
        i.resetForces();
        i.addForceAtPoint(
          force,
          { x: mousePosition.x, y: mousePosition.y, z: 0 },
          true
        );
      });
    }
  }, [ref, mousePosition, controls]);

  useEffect(() => {
    applyThrottle(applyForce);
  }, [mousePosition, ref, applyThrottle, applyForce]);
}
