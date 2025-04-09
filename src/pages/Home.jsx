import { motion } from "framer-motion";

import { Hero } from "../components/hero";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 2.5 }}
    >
      <Hero />
    </motion.main>
  );
}
