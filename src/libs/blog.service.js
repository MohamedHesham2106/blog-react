import axiosInstance from "./axios";

export async function createBlog({ title, description, imgURL, authorId }) {
  try {
    // Validate required fields
    if (!title || !description || !authorId || !imgURL) {
      throw new Error("Title, description, Image and authorId are required");
    }

    const response = await axiosInstance.post("/blog", {
      title,
      description,
      imgURL,
      authorId,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to create blog");
  }
}

export async function getAllBlogs({ page = 1, limit = 10 }) {
  try {
    const { data } = await axiosInstance.get("/blog", {
      params: { page, limit },
    });
    return { blogs: data.data, meta: data.meta };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to retrieve blogs",
    );
  }
}
