import { forwardRef, type ButtonHTMLAttributes } from "react";

export const Control = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function Control({ className = "btn btn-ghost", type = "button", ...props }, ref) {
    return <button ref={ref} type={type} className={className} {...props} />;
  },
);
