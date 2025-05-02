import React from "react";

import { motion } from "framer-motion";

import { BlogCard } from "./blog-card";

export const BlogGrid = ({ blogs, onBlogClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 min-h-[600px] relative">
    {blogs.map((blog) => (
      <BlogCard key={blog.id} blog={blog} onClick={onBlogClick} />
    ))}
  </div>
);
