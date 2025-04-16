import React, { Fragment } from "react";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useParams } from "react-router";

import { BlogEditForm } from "../components/blog/blog-edit-form";
import { Navbar } from "../components/navbar";
import { MultiStepLoader } from "../components/ui/step-loader";
import { getBlogById } from "../services/blog.service";

const editBlogLoadingStates = [
  { text: "Fetching your brilliant draft..." },
  { text: "Unpacking your creative genius..." },
  { text: "Formatting paragraphs for maximum impact..." },
  { text: "Sharpening your wittiest phrases..." },
  { text: "Checking for rebellious typos..." },
  { text: "Optimizing for reader engagement..." },
  { text: "Applying final polish..." },
  { text: "Ready for your magic touch!" },
];
export default function EditBlog() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: () => getBlogById(id),
  });
  if (isLoading)
    return (
      <MultiStepLoader
        loadingStates={editBlogLoadingStates}
        loading={isLoading}
      />
    );
  return (
    <Fragment>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1.5 }}
      >
        <BlogEditForm blog={data.data} />
      </motion.main>
    </Fragment>
  );
}
