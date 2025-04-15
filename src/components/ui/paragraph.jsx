import { twMerge } from "tailwind-merge";

export const Paragraph = ({ className, children }) => {
  return (
    <p
      className={twMerge(
        "text-sm lg:text-base font-normal text-white font-poppins",
        className,
      )}
    >
      {children}
    </p>
  );
};
