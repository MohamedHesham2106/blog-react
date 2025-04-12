import React, { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

const positionArray = [
  { left: "5%", top: "10%" },
  { right: "10%", top: "20%" },
  { left: "8%", top: "55%" },
  { right: "7%", top: "65%" },
  { left: "12%", top: "85%" },
];
export const ParallaxText = ({ title, text, index }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const { scrollY } = useScroll();

  const speed = [0.8, 1.2, 0.7, 1.0, 0.9][index % 5];
  const direction = index % 2 === 0 ? 1 : -1;

  // Transform properties
  const y = useTransform(scrollYProgress, [0, 1], [80 * speed, -80 * speed]);

  const x = useTransform(scrollYProgress, [0, 1], [0, 15 * direction * speed]);

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5 * direction]);

  // Sequential fade effect
  // each card gets a specific scroll range where it's visible
  const cardVisibilityRange = 400;
  const cardStartOffset = index * 200;

  const opacity = useTransform(
    scrollY,
    [
      300 + cardStartOffset,
      400 + cardStartOffset,
      400 + cardStartOffset + cardVisibilityRange,
      500 + cardStartOffset + cardVisibilityRange,
    ],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        x,
        rotate,
        opacity,
        position: "absolute",
        ...positionArray[index % positionArray.length],
      }}
      className="pointer-events-none select-none max-w-xs p-5 bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-lg shadow-xl"
    >
      <h3 className="text-xl font-serif mb-2 text-white">{title}</h3>
      <p className="text-sm text-neutral-300">{text}</p>
    </motion.div>
  );
};
