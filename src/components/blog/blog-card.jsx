import { motion } from "framer-motion";

import { useAuth } from "../../hooks/use-auth";

export const BlogCard = ({ blog, onClick }) => {
  const { userId } = useAuth();
  return (
    <motion.div
      layoutId={`card-${blog.id}`}
      onClick={() => onClick(blog)}
      whileHover={{ y: -5 }}
      className="relative rounded-xl overflow-hidden shadow-md cursor-pointer h-64"
    >
      <div className="absolute top-2 left-2 bg-card z-10 text-xs rounded-sm p-2">
        {userId === blog.authorId
          ? "✍️ Your work"
          : `📝 ${blog.author.name}'s article`}
      </div>
      <div className="absolute inset-0">
        <img
          src={blog.imgURL}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-white text-xl font-bold mb-1">
            {blog.title || "Untitled"}
          </h3>
          <p className="text-white/80 text-sm line-clamp-2">
            {blog.description || "No description provided."}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
