// Lightweight stand-in for framer-motion in jsdom tests.
// Strips animation props and renders plain HTML elements so component
// logic and ARIA attributes are testable without a real animation engine.

import React from 'react';

const MOTION_ONLY_PROPS = new Set([
  'animate', 'initial', 'exit', 'transition', 'variants',
  'whileHover', 'whileTap', 'whileFocus', 'whileInView',
  'viewport', 'layout', 'layoutId', 'drag', 'dragConstraints',
  'onAnimationComplete', 'onAnimationStart', 'transformTemplate',
  'positionTransition', 'inherit',
]);

function createMotionComponent(tag: string) {
  const Component = React.forwardRef<HTMLElement, Record<string, unknown>>(
    (props, ref) => {
      const htmlProps: Record<string, unknown> = { ref };
      for (const [key, val] of Object.entries(props)) {
        if (!MOTION_ONLY_PROPS.has(key)) htmlProps[key] = val;
      }
      return React.createElement(tag, htmlProps);
    },
  );
  Component.displayName = `motion.${tag}`;
  return Component;
}

const cache = new Map<string, ReturnType<typeof createMotionComponent>>();

export const motion = new Proxy({} as Record<string, ReturnType<typeof createMotionComponent>>, {
  get(_target, key: string) {
    if (!cache.has(key)) cache.set(key, createMotionComponent(key));
    return cache.get(key)!;
  },
});

export function AnimatePresence({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export const useAnimation = () => ({ start: () => Promise.resolve(), stop: () => {} });
export const useMotionValue = (initial: number) => ({ get: () => initial, set: () => {} });
export const useTransform = () => ({ get: () => 0, set: () => {} });
export const useSpring = (value: number) => ({ get: () => value, set: () => {} });
