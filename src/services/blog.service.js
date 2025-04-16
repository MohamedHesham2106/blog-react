import axiosInstance from "../libs/axios";

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
export async function deleteBlogById(id) {
  try {
    await axiosInstance.delete(`/blog/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete blog");
  }
}
export async function getBlogById(id) {
  try {
    const { data } = await axiosInstance.get(`/blog/${id}`);

    return { ...data };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to retrieve blog");
  }
}
export async function updateBlog({ id, ...rest }) {
  console.log(id);

  if (!id) {
    throw new Error("Blog ID is required for update");
  }

  if (Object.keys(rest).length === 0) {
    throw new Error("No update data provided");
  }

  try {
    const { data } = await axiosInstance.put(`/blog/${id}`, rest);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update blog");
  }
}
