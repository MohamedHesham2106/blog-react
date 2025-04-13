import { Fragment } from "react";

import { motion } from "framer-motion";
import { Navigate } from "react-router";

import { BlogForm } from "../components/blog/blog-form";
import { Navbar } from "../components/navbar";
import { useAuth } from "../hooks/use-auth";

export default function CreateBlog() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return (
    <Fragment>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1.5 }}
      >
        <BlogForm />
      </motion.main>
    </Fragment>
  );
}
