import { useState } from "react";

import { Eye } from "lucide-react";

import { Button } from "./ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "./ui/modal";

export const Preview = ({ current, poster }) => {
  const [preview, setPreview] = useState({
    title: "",
    description: "",
    poster: "",
  });

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full cursor-pointer"
          onClick={() =>
            setPreview((prev) => ({
              ...prev,
              ...current(),
              poster,
            }))
          }
        >
          <Eye />
        </Button>
      </ModalTrigger>

      <ModalContent className="w-full max-w-xl mx-auto max-h-[90vh] overflow-auto p-0 bg-background">
        <div className="relative w-full" style={{ height: "20vh" }}>
          <img
            src={preview.poster || poster}
            alt="Poster"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />

          <ModalHeader className="absolute bottom-0 w-full p-4 md:p-6 z-10 text-white">
            <ModalTitle className="text-xl md:text-2xl font-bold drop-shadow-md">
              {preview.title || "Untitled"}
            </ModalTitle>
          </ModalHeader>
        </div>

        <div className="p-4 md:p-6 max-h-[50vh] overflow-y-auto">
          <p className="whitespace-pre-wrap font-sans text-xs sm:text-sm break-words">
            {preview.description || "No description provided."}
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
};
