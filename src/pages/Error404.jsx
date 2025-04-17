import { Fragment } from "react";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

import { Navbar } from "../components/navbar";
import { Button } from "../components/ui/button";

export default function Error404() {
  return (
    <Fragment>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1.5 }}
        className="flex flex-col items-center justify-center min-h-[80vh] mx-auto mt-16 md:mt-20 space-y-4"
      >
        <DotLottieReact
          src="404.lottie"
          loop
          autoplay
          width={400}
          height={400}
          className="mx-auto"
        />

        <h1 className="text-3xl font-bold text-primary md:text-4xl">
          404 - Page Not Found
        </h1>

        <p className="mt-3 text-white">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Button size="lg">
          <Link to="/" className="text-white no-underline">
            Back to Home
          </Link>
        </Button>
      </motion.main>
    </Fragment>
  );
}
