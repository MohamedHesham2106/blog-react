import { Fragment } from "react";

import { motion } from "framer-motion";
import { Navigate } from "react-router";

import { BlogList } from "../components/blog/blog-list";
import { Navbar } from "../components/navbar";
import { useAuth } from "../hooks/use-auth";
import { FloatingButton } from "../components/floating-button";

export default function MyBlogs() {
  const { userId, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <Fragment>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1.5 }}
        className="flex items-center justify-between flex-col my-18"
      >
        <BlogList filterByAuthorId={userId} header="My Blogs" />
        <FloatingButton/>
      </motion.main>
    </Fragment>
  );
}
