import { useState } from "react";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, NavLink } from "react-router";

import { cn } from "../libs/util";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/posts" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // variants
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 120,
      },
    }),
    hover: {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1.5 }}
      className="fixed top-0 z-50 w-full bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/5"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Hamburger Menu Button - Always Visible */}
          <motion.button
            className="cursor-pointer z-50"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>

          {/* Logo - Center */}
          <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className="flex items-center text-3xl font-playfair font-bold"
            >
              Nirvana
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={buttonVariants}
            >
              <Link to="/login" className="font-poppins flex items-center">
                <Button className="font-bold">Login</Button>
              </Link>
            </motion.div>
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={buttonVariants}
            >
              <Link to="/register" className="font-poppins flex items-center">
                <Button variant="ghost">Register</Button>
              </Link>
            </motion.div>
          </div>
        </div>
        {/* Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full max-w-md flex flex-col items-center justify-center space-y-16">
                <motion.ul
                  className="flex flex-col space-y-12 items-center justify-center w-full"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.15,
                      },
                    },
                  }}
                >
                  {navItems.map((item) => (
                    <motion.li
                      key={item.name}
                      className="w-full text-center"
                      variants={{
                        hidden: { y: 40, opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            type: "spring",
                            stiffness: 100,
                          },
                        },
                      }}
                    >
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          cn(
                            "text-white/90 hover:text-white transition-colors font-poppins text-2xl md:text-4xl font-normal block w-full",
                            isActive && "text-white font-medium",
                          )
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
