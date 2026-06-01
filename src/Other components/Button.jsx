import React from "react";

function Button({
  content,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-gradient-to-b from-purple-600 to-purple-500 dark:from-[#5208A7] dark:to-[#6E15AF] hover:from-purple-700 hover:to-purple-600 hover:dark:from-[#601297] hover:dark:to-[#3A0955]  text-white",

    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-zinc-700 dark:hover:bg-zinc-900 dark:text-white",
  };

  return (
   <div>
     <button
      className={`w-full shadow-xl/20 hover:shadow-xl transition px-3 py-2 text-md rounded-xl ${variants[variant]} ${className}`}
      {...props}
    >
      {content}
    </button>
   </div>

  );
}

export default Button;
