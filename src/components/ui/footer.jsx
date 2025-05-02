import React from "react";

import { Facebook, Github, Globe, Linkedin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/20 pb-8">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold font-playfair">Mohamed Hesham</h2>
            <p className="text-sm opacity-75 mt-2">
              Thoughts, stories and ideas
            </p>
          </div>

          <div className="flex space-x-4 md:space-x-6">
            <a
              href="https://www.linkedin.com/in/mohamed-hesham-ramadan/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.github.com/MohamedHesham2106"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://mohamedhesham-swd.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
              aria-label="Portfolio Website"
            >
              <Globe className="w-5 h-5 hidden sm:block" />
              <span className="font-playfair sm:hidden">MH</span>
            </a>
          </div>
        </div>

        {/* Content Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
          <div className="space-y-3 text-center sm:text-left">
            <h3 className="font-semibold uppercase tracking-wider text-sm after:content-[''] after:block after:w-12 after:h-0.5 after:bg-white/30 after:mt-2 after:mx-auto sm:after:mx-0">
              About
            </h3>
            <p className="text-sm opacity-75 leading-relaxed">
              Personal blog featuring tech insights, creative writing, and
              professional experiences across different disciplines.
            </p>
          </div>

          <div className="space-y-3 text-center sm:text-left">
            <h3 className="font-semibold uppercase tracking-wider text-sm after:content-[''] after:block after:w-12 after:h-0.5 after:bg-white/30 after:mt-2 after:mx-auto sm:after:mx-0">
              Categories
            </h3>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="text-xs px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer">
                Technology
              </span>
              <span className="text-xs px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer">
                Design
              </span>
              <span className="text-xs px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer">
                Development
              </span>
              <span className="text-xs px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer">
                Writing
              </span>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-6 border-t border-white/20 flex justify-center text-sm">
          <p>© {currentYear} Mohamed Hesham. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
