import React, { useEffect, useRef, useState } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

// Desktop positions
const desktopPositions = [
  { left: "5%", top: "10%" },
  { right: "10%", top: "20%" },
  { left: "8%", top: "55%" },
  { right: "7%", top: "65%" },
  { left: "12%", top: "85%" },
];

// Mobile positions
const mobilePositions = [
  { left: "10%", top: "5%" },
  { right: "10%", top: "25%" },
  { left: "10%", top: "45%" },
  { right: "10%", top: "65%" },
  { left: "10%", top: "85%" },
];

export const ParallaxText = ({ title, text, index }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const { scrollY } = useScroll();

  // Adjust parallax speeds for mobile
  const baseSpeed = isMobile ? 0.5 : 1.0;
  const speed = [0.8, 1.2, 0.7, 1.0, 0.9][index % 5] * baseSpeed;
  const direction = index % 2 === 0 ? 1 : -1;

  // Transform properties (reduced movement for mobile)
  const y = useTransform(scrollYProgress, [0, 1], [80 * speed, -80 * speed]);

  const x = useTransform(scrollYProgress, [0, 1], [0, 15 * direction * speed]);

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? 3 * direction : 5 * direction],
  );

  // Adjust timing for mobile
  const mobileOffset = isMobile ? 100 : 0;
  const cardVisibilityRange = isMobile ? 500 : 400;
  const cardStartOffset = index * (isMobile ? 150 : 200);

  const opacity = useTransform(
    scrollY,
    [
      300 + cardStartOffset - mobileOffset,
      400 + cardStartOffset - mobileOffset,
      400 + cardStartOffset + cardVisibilityRange,
      500 + cardStartOffset + cardVisibilityRange,
    ],
    [0, 1, 1, 0],
  );

  // Choose positioning based on device
  const positions = isMobile ? mobilePositions : desktopPositions;
  const positionStyle = positions[index % positions.length];

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        x,
        rotate,
        opacity,
        position: "absolute",
        ...positionStyle,
      }}
      className="pointer-events-none select-none max-w-xs md:p-5 p-4 bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-lg shadow-xl"
    >
      <h3 className="text-lg md:text-xl font-serif mb-1 md:mb-2 text-white">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-neutral-300">{text}</p>
    </motion.div>
  );
};
