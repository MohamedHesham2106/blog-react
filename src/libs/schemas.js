import * as yup from "yup";

const registerSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required."),
  name: yup
    .string()
    .min(7, "Name must be at least 7 characters long.")
    .max(100, "Name must be at most 100 characters long.")
    .required("Name is required."),
  password: yup
    .string()
    .min(8, "Password must contain 8 or more characters.")
    .matches(/[a-z]/, "Password must contain at least 1 lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
    .matches(/[0-9]/, "Password must contain at least 1 number.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least 1 special character.",
    )
    .required("Password is required."),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required."),

  password: yup
    .string()
    .min(7, "Password must be at least 7 characters long.")
    .max(100, "Password cannot exceed 100 characters.")
    .required("Password is required."),
});

const blogSchema = yup
  .object({
    title: yup
      .string()
      .required("Title is required")
      .min(5, "Title must be at least 5 characters"),
    description: yup
      .string()
      .required("Blog Description is required")
      .min(20, "Description must be at least 20 characters"),
  })
  .required();

export { registerSchema, loginSchema, blogSchema };
