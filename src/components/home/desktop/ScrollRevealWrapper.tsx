import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollRevealWrapper({ children, className = '' }: ScrollRevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position of this element relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to opacity: fades in, stays visible, fades out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.2, 1, 1, 0.2]
  );

  // Transform scroll progress to scale: slightly scales up, stays normal, scales down
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.96, 1, 1, 0.96]
  );

  // Transform scroll progress to blur: blurs out of view, sharp in view
  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [4, 0, 0, 4]
  );

  // Combine blurValue into standard filter string
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        filter,
        willChange: 'transform, opacity, filter'
      }}
      className={`w-full origin-center ${className}`}
    >
      {children}
    </motion.div>
  );
}
