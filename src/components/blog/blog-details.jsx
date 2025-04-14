import { forwardRef } from "react";

import { motion } from "framer-motion";
import { X } from "lucide-react";

export const BlogCardDetail = forwardRef(({ blog, onClose }, ref) => {
  return (
    <motion.div
      layoutId={`card-${blog.id}`}
      ref={ref}
      className="w-full max-w-2xl max-h-[90dvh] flex flex-col bg-background rounded-xl overflow-hidden shadow-xl mx-4"
    >
      <motion.div
        layoutId={`image-${blog.id}`}
        className="relative aspect-video max-h-[30dvh]"
      >
        <img
          src={blog.imgURL}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 z-10">
          <motion.h3
            layoutId={`title-${blog.id}`}
            className="text-white text-3xl font-bold drop-shadow-lg"
          >
            {blog.title}
          </motion.h3>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </motion.div>

      {/* Content section - grows with content but scrolls if too long */}
      <div className="flex-1 min-h-[100px] overflow-y-auto p-6">
        <p className="whitespace-pre-wrap font-sans text-xs sm:text-sm break-words">
          {blog.description || "No description provided."}
        </p>
      </div>
    </motion.div>
  );
});
