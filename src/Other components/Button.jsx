import React from "react";

function Button({ content, className, ...props }) {
  return (
    <div>
      <button
        className={`w-full  shadow-xl/20 hover:shadow-xl transition px-3 py-2 text-md bg-gradient-to-b from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-xl transition ${className}`}
        {...props}
      >
        {content}
      </button>
    </div>
  );
}

export default Button;
