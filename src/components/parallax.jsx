import { useScroll, useTransform } from "framer-motion";

import { ParallaxText } from "./parallax-text";

// some abstract txt
const welcomeTexts = [
  {
    title: "Welcome to Nirvana",
    text: "Your calm corner on the web—where ideas in tech, design, and development come to life.",
  },
  {
    title: "Explore Fresh Perspectives",
    text: "Dive into thoughtful articles, deep dives, and curated insights from creators and innovators.",
  },
  {
    title: "Design Meets Clarity",
    text: "Our minimalist layout helps you focus on what matters—great content and clear thinking.",
  },
  {
    title: "Be Part of the Story",
    text: "Follow our evolving journey as we share experiences, lessons, and creative explorations.",
  },
  {
    title: "Fuel Your Curiosity",
    text: "From trending topics to timeless advice, find inspiration in every scroll.",
  },
];

export const Parallax = () => {
  const { scrollY } = useScroll();

  const initialScrollThreshold = 300;

  const masterOpacity = useTransform(
    scrollY,
    [initialScrollThreshold, initialScrollThreshold + 300],
    [0, 1],
  );
  return (
    <section
      className="relative mx-auto max-w-full h-[150dvh]"
      style={{ opacity: masterOpacity }}
    >
      <div className="absolute inset-0">
        {welcomeTexts.map((item, index) => (
          <ParallaxText
            key={index}
            title={item.title}
            text={item.text}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};
