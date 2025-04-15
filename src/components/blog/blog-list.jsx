import { useEffect, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { useOutsideClick } from "../../hooks/use-outside-click";
import { getAllBlogs } from "../../libs/blog.service";
import { Button } from "../ui/button";
import { BlogCard } from "./blog-card";
import { BlogCardDetail } from "./blog-details";

const DEFAULT_LIMIT = 6;

export const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeBlog, setActiveBlog] = useState(null);
  const ref = useRef(null);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, {
    once: false,
    margin: "0px 100px -50px 0px",
  });
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);
  const { data, isError, isFetching } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: () =>
      getAllBlogs({
        page: currentPage,
        limit: DEFAULT_LIMIT,
      }),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const { blogs, meta } = data || { blogs: [], meta: null };
  const { total = 0, page = 1, limit = DEFAULT_LIMIT, pages = 1 } = meta || {};

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setActiveBlog(null);
    document.body.style.overflow = activeBlog ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeBlog]);

  useOutsideClick(ref, () => setActiveBlog(null));

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p>Something went wrong while fetching the blogs.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      className="container mx-auto px-4 py-8 font-poppins"
      ref={containerRef}
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      transition={{
        duration: 1.2,
      }}
    >
      {/* Header with title and results count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
        <h2 className="text-5xl font-bold text-foreground font-playfair">
          Latest Blogs
        </h2>
        <div className="text-muted-foreground text-xs bg-secondary p-2 rounded-sm">
          Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of{" "}
          {total} blogs
        </div>
      </div>

      {/* Loading overlay that doesn't affect layout */}
      {isFetching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 pointer-events-none">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      )}

      {/* Blog Grid with stable height */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 min-h-[600px] relative">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} onClick={setActiveBlog} />
        ))}
      </div>

      {/* Pagination Controls */}
      {pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 mb-12 sticky bottom-4 right-0 z-10">
          <div className="bg-card p-2 rounded-sm shadow-lg">
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => handlePageChange(Math.max(page - 1, 1))}
                disabled={page === 1 || isFetching}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                  let pageNum;
                  if (pages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= pages - 2) {
                    pageNum = pages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={isFetching}
                      variant={page === pageNum ? "secondary" : "ghost"}
                      className={` ${isFetching ? "opacity-70" : ""}`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {pages > 5 &&
                  page < pages - 2 &&
                  ![pages - 2, pages - 1, pages].includes(page) && (
                    <>
                      <span className="px-2">...</span>
                      <Button
                        variant={"ghost"}
                        className={isFetching ? "opacity-70" : ""}
                        onClick={() => handlePageChange(pages)}
                        disabled={isFetching}
                      >
                        {pages}
                      </Button>
                    </>
                  )}
              </div>

              <Button
                variant="secondary"
                size="icon"
                onClick={() => handlePageChange(Math.min(page + 1, pages))}
                disabled={page === pages || isFetching}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {activeBlog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-10"
            />
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <BlogCardDetail
                ref={ref}
                blog={activeBlog}
                onClose={() => setActiveBlog(null)}
              />
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
