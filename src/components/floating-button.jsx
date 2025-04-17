import React from "react";

import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

import { useAuth } from "../hooks/use-auth";
import { Button } from "./ui/button";

export const FloatingButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;
  return (
    <Button
      onClick={() => navigate("/create")}
      size="icon"
      className="hidden md:flex fixed rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out text-white border-none w-10 h-10 md:w-12 md:h-12 bottom-6 right-6 md:bottom-8 md:right-8  items-center justify-center transform hover:scale-110 active:scale-95 z-[999]"
    >
      <Plus className="w-6 h-6 md:w-7 md:h-7" strokeWidth={4} />
    </Button>
  );
};
