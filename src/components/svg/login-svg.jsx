import { motion } from "framer-motion";

export const LoginSVG = () => {
  const paths = [
    {
      d: "M15.5 11C25.6 21.824 34.9255 31.0278 45.2255 41.5698",
    },
    {
      d: "M54 3C57.5 15 58.0745 16.4993 60.5 26.5",
    },
    {
      d: "M3 53C16.5 54.5 27.5 56 34 56",
    },
  ];
  return (
    <svg
      width="63"
      height="59"
      viewBox="0 0 63 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((path, i) => (
        <motion.path
          key={i}
          d={path.d}
          stroke="white"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
};
