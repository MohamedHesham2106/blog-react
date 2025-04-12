import React, { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { LogOut, User } from "lucide-react";

import { useAuth } from "../hooks/use-auth";
import { Button } from "./ui/button";

export const UserButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Button onClick={toggleMenu} size="icon" className="rounded-full">
        <User className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-3 mt-2 p-2 rounded-sm shadow-lg bg-accent z-50"
          >
            <Button
              onClick={logout}
              size="sm"
              className="text-foreground font-poppins rounded-sm"
            >
              <LogOut className="mr-1 h-4 w-4 mt-0.5" />
              Sign out
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
