import { useRef, useState } from "react";

import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import { Nirvana } from "./svg/logo";

const SECTION_HEIGHT = 1500;

export const Hero = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const [isPastSection, setIsPastSection] = useState(false);

  const firstClip = useTransform(scrollY, [0, SECTION_HEIGHT], [25, 0]);
  const secondClip = useTransform(scrollY, [0, SECTION_HEIGHT], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${firstClip}% ${firstClip}%, ${secondClip}% ${firstClip}%, ${secondClip}% ${secondClip}%, ${firstClip}% ${secondClip}%)`;

  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 200],
    [1, 0],
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsPastSection(latest > SECTION_HEIGHT + 200);
  });

  //  fixed -> absolute
  const logoClass = isPastSection
    ? "absolute top-[100dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex item-center justify-center flex-col space-y-2"
    : "fixed inset-0 flex items-center justify-center z-10 pointer-events-none flex item-center justify-center flex-col space-y-2";

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ height: `calc(${SECTION_HEIGHT}px + 100dvh)` }}
    >
      {/* Background image */}
      <motion.div
        className="sticky top-0 h-screen w-full z-0"
        style={{
          clipPath,
          opacity,
          backgroundSize: useTransform(
            scrollY,
            [0, SECTION_HEIGHT + 500],
            ["170%", "100%"],
          ),
          backgroundImage:
            "url(https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Nirvana logo */}
      <motion.div className={logoClass} style={{ opacity }}>
        <Nirvana width="md:w-96 w-46" />
        <p className="text-base md:text-xl w-1/2 text-center font-playfair">
          Discover thought-provoking articles on technology, design, and
          development from industry experts.
        </p>
      </motion.div>
    </section>
  );
};
