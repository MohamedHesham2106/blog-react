import { useEffect, useRef, useState, useTransition } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useAuth } from "../../hooks/use-auth";
import { blogSchema } from "../../libs/schemas";
import { updateBlog } from "../../services/blog.service";
import { Preview } from "../preview";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/text-area";
import { useUploadThing } from "../uploadthing";

const placeholderImg =
  "https://images.unsplash.com/photo-1656267097068-3b2998427f61?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const BlogEditForm = ({ blog }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(blog?.imgURL || null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef(null);
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      title: blog?.title || "",
      description: blog?.description || "",
    },
  });

  useEffect(() => {
    reset({
      title: blog?.title || "",
      description: blog?.description || "",
    });
    setImagePreview(blog?.imgURL || null);
  }, [blog, reset]);

  const { mutate } = useMutation({
    mutationFn: (data) => updateBlog({ id: blog.id, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Failed to update blog");
    },
  });

  const handleFileClear = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const onSubmit = async (formData) => {
    try {
      let imageUrl = blog.imgURL;

      if (selectedFile) {
        const uploadResult = await startUpload([selectedFile]);
        if (uploadResult && uploadResult[0]) {
          imageUrl = uploadResult[0].ufsUrl;
        }
      }

      const updatedData = {
        title: formData.title,
        description: formData.description,
        imgURL: imageUrl,
        authorId: userId,
      };

      startTransition(() => mutate(updatedData));
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="flex items-center justify-center py-8 overflow-auto h-dvh relative">
      <div
        className="top-0 w-full absolute min-h-1/2 -z-50 object-cover inset-shadow-background inset-shadow before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-background before:via-30% before:to-80%"
        style={{
          backgroundImage: `url(${imagePreview || placeholderImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50 -z-10" />

      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="border border-border px-6 py-4 space-y-4 rounded-lg bg-background">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-playfair font-bold">Edit Blog</h1>
                <Preview
                  current={getValues}
                  poster={imagePreview || placeholderImg}
                />
              </div>
              <p className="text-sm text-muted-foreground font-poppins">
                Update your thoughts with the world.
              </p>
            </div>

            <form
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col space-y-3 font-poppins">
                <Label htmlFor="title">Headline</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Update your blog headline"
                />
                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-3 font-poppins">
                <Label htmlFor="description">Blog Content</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="What do you want to change?"
                  className="h-24 resize-none"
                />
                {errors.description && (
                  <p className="text-xs text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-3 font-poppins">
                <Label>Blog Poster</Label>
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt=""
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      onClick={handleFileClear}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <X />
                    </Button>
                  </div>
                ) : (
                  /* Custom File Input */
                  <div className="rounded-md border outline-dashed outline-1 outline-muted p-3 text-center cursor-pointer">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="w-10 h-10" />
                      <span className="mt-1 text-sm font-medium">
                        Select an image to upload
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Will be uploaded when you publish
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="font-poppins"
                disabled={isPending || isUploading}
              >
                {isPending || isUploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  );
};
