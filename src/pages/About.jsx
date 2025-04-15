import { Fragment } from "react";

import { motion } from "framer-motion";

import { Navbar } from "../components/navbar";
import { Paragraph } from "../components/ui/paragraph";

export default function About() {
  const images = [
    "https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];

  return (
    <Fragment>
      <Navbar />
      <div className={`max-w-4xl w-full mx-auto py-20 px-4 md:px-10`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 my-10">
          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{
                opacity: 0,
                y: -50,
                rotate: 0,
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: index % 2 === 0 ? 3 : -3,
              }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <img
                src={image}
                width={200}
                height={400}
                alt="about"
                className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
              />
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl font-poppins">
          <Paragraph className="mt-4">
            Hi, My Name is{" "}
            <a
              href="https://www.linkedin.com/in/mohamed-hesham-ramadan/"
              target="_blank"
              className="font-bold text-primary"
            >
              Mohamed Hesham
            </a>{" "}
            a passionate frontend developer specializing in modern web
            technologies. My work focuses on creating intuitive,
            high-performance interfaces that users love. With a strong
            foundation in both design and development, I bridge the gap between
            visual appeal and technical functionality.
          </Paragraph>

          <Paragraph className="mt-4">
            My technical toolkit includes React, Next.js, and TypeScript for
            building robust applications, combined with Tailwind CSS for
            efficient styling. I'm particularly interested in creating type-safe
            applications and optimizing performance to deliver seamless user
            experiences.
          </Paragraph>

          <Paragraph className="mt-4">
            I thrive in collaborative environments where I can contribute to
            meaningful projects. My experience includes developing responsive
            web applications, implementing real-time features, and leading
            development teams to deliver comprehensive solutions. I approach
            every project with attention to detail and a commitment to clean,
            maintainable code.
          </Paragraph>

          <Paragraph className="mt-4">
            Beyond coding, I'm passionate about continuous learning and staying
            updated with industry trends. I believe in the power of technology
            to solve problems and create engaging digital experiences. Whether
            working on personal projects or team collaborations, I aim to build
            solutions that are both technically sound and visually compelling.
          </Paragraph>

          <Paragraph className="mt-4">
            When I'm not developing applications, you can find me exploring new
            technologies, contributing to open-source projects, or sharing
            knowledge with the developer community. I'm always excited to take
            on new challenges that push my skills further and allow me to create
            impactful digital products.
          </Paragraph>
        </div>
      </div>
    </Fragment>
  );
}
