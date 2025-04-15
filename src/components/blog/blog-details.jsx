import { forwardRef, useTransition } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { useAuth } from "../../hooks/use-auth";
import { deleteBlogById } from "../../libs/blog.service";
import { Button } from "../ui/button";

export const BlogCardDetail = forwardRef(({ blog, onClose }, ref) => {
  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const { userId } = useAuth();

  const { mutate } = useMutation({
    mutationFn: deleteBlogById,
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      queryClient.invalidateQueries(["blogs"]);
      onClose();
    },
    onError: () => {
      toast.error("Failed to delete blog");
    },
  });
  const handleDelete = () => {
    startTransition(() => mutate(blog.id));
  };
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
        <div className="absolute top-2 left-2 bg-card z-10 text-xs rounded-sm p-2">
          {userId === blog.authorId
            ? "✍️ Your work"
            : `📝 ${blog.author.name}'s article`}
        </div>
        <img
          src={blog.imgURL}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex items-center justify-between">
          <motion.h3
            layoutId={`title-${blog.id}`}
            className="text-white text-3xl font-bold drop-shadow-lg"
          >
            {blog.title}
          </motion.h3>
          {/* Buttons if author */}
          {userId === blog.authorId && (
            <div className="flex items-center gap-2">
              <Button disabled={isPending} onClick={handleDelete} size="sm">
                Delete
              </Button>
              <Button
                onClick={() => navigate(`/edit/${blog.id}`)}
                disabled={isPending}
                size="sm"
                variant="secondary"
              >
                Edit
              </Button>
            </div>
          )}
        </div>
        <Button
          size="icon"
          variant="secondary"
          onClick={onClose}
          className="absolute top-4 right-4 z-10  rounded-full backdrop-blur-sm"
        >
          <X className="w-4 h-4 text-white" />
        </Button>
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
