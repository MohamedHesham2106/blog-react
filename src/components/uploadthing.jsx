import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing } = generateReactHelpers({
  url: import.meta.env.VITE_BACKEND_URL + "/uploadthing",
});

