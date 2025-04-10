import axiosInstance from "./axios";

export async function loginUtil({ email, password }) {
  try {
    if (!email || !password) {
      throw new Error("Both email and password must be provided.");
    }
    const { data } = await axiosInstance.post("/login", { email, password });

    const {
      data: { accessToken },
    } = data;
    return { token: accessToken };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function registerUtil({ email, password }) {
  try {
    if (!email || !password) {
      throw new Error("Both email and password must be provided.");
    }
    await axiosInstance.post("/signup", { email, password });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
