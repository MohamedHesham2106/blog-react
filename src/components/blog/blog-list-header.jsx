export const BlogListHeader = ({ page, limit, total, header }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
    <h2 className="text-5xl font-bold text-foreground font-playfair">
      {header}
    </h2>
    <div className="text-muted-foreground text-xs bg-secondary p-2 rounded-sm">
      Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of{" "}
      {total} blogs
    </div>
  </div>
);
