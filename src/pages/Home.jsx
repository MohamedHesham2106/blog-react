import { Fragment } from "react";

import { motion } from "framer-motion";

import { BlogList } from "../components/blog/blog-list";
import { FloatingButton } from "../components/floating-button";
import { Hero } from "../components/hero";
import { Navbar } from "../components/navbar";

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1.5 }}
      >
        <Hero />
        <BlogList />
        <FloatingButton />
      </motion.main>
    </Fragment>
  );
}
