import { useState } from "react";

import { LogIn, Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, NavLink } from "react-router";

import { cn } from "../libs/util";
import { Button } from "./ui/button";
import { Nirvana } from "./ui/logo";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/posts" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

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
    <header className="sticky top-0 z-50 w-full  bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-12 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center mb-1">
              <Nirvana />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <ul className="flex space-x-6 items-center">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={navItemVariants}
                  >
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "text-foreground/70 hover:text-foreground transition-colors font-inter text-sm tracking-wider",
                          isActive && "text-foreground font-semibold",
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={buttonVariants}
            >
              <Link to="/login" className="font-inter flex items-center">
                <Button>Login</Button>
              </Link>
            </motion.div>
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={buttonVariants}
            >
              <Link to="/register" className="font-inter flex items-center">
                <Button variant={"ghost"}>Register</Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden cursor-pointer"
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
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 text-center"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.2 },
              }}
            >
              <motion.ul
                className="flex flex-col space-y-4 mb-6 items-center"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={{
                      hidden: { x: -20, opacity: 0 },
                      visible: {
                        x: 0,
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
                          "text-foreground/70 hover:text-foreground transition-colors font-inter",
                          isActive && "text-foreground font-semibold",
                        )
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                className="flex flex-col space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                      },
                    },
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center font-inter "
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className={"w-full"}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                      },
                    },
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center font-inter"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant={"ghost"} className={"w-full"}>
                      <User className="mr-2 h-4 w-4" />
                      Register
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
