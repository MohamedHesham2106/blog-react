import React, { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { LogOut, NotepadText, User, User2 } from "lucide-react";
import { Link } from "react-router";

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
      <Button variant='secondary' onClick={toggleMenu} size="icon" className="rounded-full">
        <User2 className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-3 mt-2 p-2 rounded-sm shadow-lg bg-card z-50"
          >
            <Button
              onClick={logout}
              variant="secondary"
              size="sm"
              className="flex items-center gap-1 font-semibold rounded-sm"
            >
              <LogOut className="mr-1 h-4 w-4 mt-0.5 " strokeWidth={3} />
              SignOut
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
