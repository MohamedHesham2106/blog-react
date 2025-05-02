import { useEffect, useMemo, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";

import { useOutsideClick } from "../../hooks/use-outside-click";
import { getAllBlogs } from "../../services/blog.service";
import { BlogGrid } from "./blog-grid";
import { BlogListHeader } from "./blog-list-header";
import { BlogModal } from "./blog-modal";
import { LoadingOverlay } from "./loading-overlay";
import { PaginationControls } from "./pagination-control";
import { Search } from "./search";

const DEFAULT_LIMIT = 6;

export const BlogList = ({ filterByAuthorId, header }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [activeBlog, setActiveBlog] = useState(null);

  const ref = useRef(null);
  const containerRef = useRef(null);

  const controls = useAnimation();
  const isInView = useInView(containerRef, {
    once: false,
    margin: "0px 100px -50px 0px",
  });

  useEffect(() => {
    controls.start(isInView ? "visible" : "hidden");
  }, [controls, isInView]);

  // fetch all blogs
  const { data, isError, isFetching } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlogs({ page: 1, limit: 1000 }),
    staleTime: 5 * 60 * 1000,
  });

  const filteredBlogs = useMemo(() => {
    const allBlogs = data?.blogs || [];
    const term = debouncedSearchTerm.trim().toLowerCase();
    let filtered = allBlogs;

    if (filterByAuthorId) {
      filtered = filtered.filter((blog) => blog.authorId === filterByAuthorId);
    }

    if (term) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          blog.description.toLowerCase().includes(term),
      );
    }

    return filtered;
  }, [data?.blogs, debouncedSearchTerm, filterByAuthorId]);

  // pagination
  const total = filteredBlogs.length;
  const pages = Math.ceil(total / DEFAULT_LIMIT) || 1;
  const currentPageSafe = Math.min(currentPage, pages);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPageSafe - 1) * DEFAULT_LIMIT,
    currentPageSafe * DEFAULT_LIMIT,
  );

  // reset page when debounced search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  // Escape and outside click to close modal
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
      transition={{ duration: 1.2 }}
    >
      <BlogListHeader
        page={currentPageSafe}
        limit={DEFAULT_LIMIT}
        total={total}
        header={header ?? "Latest Blogs"}
        searchAcetive={!!debouncedSearchTerm.trim()}
      />
      <Search
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search blogs..."
      />
      <LoadingOverlay fetching={isFetching} />

      {paginatedBlogs.length > 0 ? (
        <BlogGrid blogs={paginatedBlogs} onBlogClick={setActiveBlog} />
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          {debouncedSearchTerm.trim()
            ? `No blogs found for "${debouncedSearchTerm.trim()}".`
            : "No blogs available."}
        </div>
      )}

      <PaginationControls
        page={currentPageSafe}
        pages={pages}
        isFetching={isFetching}
        onPageChange={setCurrentPage}
      />

      <AnimatePresence>
        {activeBlog && (
          <BlogModal
            ref={ref}
            blog={activeBlog}
            onClose={() => setActiveBlog(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};
