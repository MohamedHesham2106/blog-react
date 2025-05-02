import React, { forwardRef } from "react";

import { motion } from "framer-motion";

import { BlogCardDetail } from "./blog-details";

export const BlogModal = forwardRef(({ blog, onClose }, ref) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 z-10"
    />
    <div className="fixed inset-0 grid place-items-center z-[100]">
      <BlogCardDetail ref={ref} blog={blog} onClose={onClose} />
    </div>
  </>
));
