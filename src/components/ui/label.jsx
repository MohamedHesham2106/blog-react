import { forwardRef } from "react";

import { cva } from "class-variance-authority";

import { cn } from "../../libs/util";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-poppins",
);

export const Label = forwardRef(({ className, ...props }, ref) => {
  return (
    <label ref={ref} className={cn(labelVariants(), className)} {...props} />
  );
});
