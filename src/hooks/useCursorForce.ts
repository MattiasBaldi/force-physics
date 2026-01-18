import { useCallback, useEffect, useRef } from "react";
import { MathUtils } from "three";
import { useControls } from "leva";
import { useRaycaster } from "./useRaycaster";

export type ForceProps = {
  ref: React.RefObject<any>;
  throttle?: number;
};

export function useCursorForce({ ref, throttle = 0 }: ForceProps) {
  const { worldSpacePosition } = useRaycaster();
  const throttleRef = useRef<number>(throttle);

  const controls = useControls("instances", {
    acceleration: {
      value: 50,
      min: 0,
      max: 50,
      step: 0.01,
    },
    maxForce: {
      value: 300,
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
    if (ref.current && Array.isArray(ref.current)) {
      const force = {
        x: MathUtils.clamp(
          worldSpacePosition.x * controls.acceleration,
          -controls.maxForce,
          controls.maxForce
        ),
        y: MathUtils.clamp(
          worldSpacePosition.y * controls.acceleration,
          -controls.maxForce,
          controls.maxForce
        ),
        z: MathUtils.clamp(
          worldSpacePosition.z * controls.acceleration,
          -controls.maxForce,
          controls.maxForce
        ),
      };

      ref.current.forEach((i: any) => {
        i.resetForces();
        i.addForceAtPoint(force, worldSpacePosition, true);
      });
    }
  }, [ref, controls, worldSpacePosition]);

  useEffect(() => {
    applyThrottle(applyForce);
  }, [ref, applyThrottle, applyForce]);
}
