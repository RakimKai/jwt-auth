import React from "react";

const Button = ({ text, isDisabled, handleSubmit }) => {
  return (
    <button
      onClick={handleSubmit}
      disabled={isDisabled}
      className={`bg-blue-500/50 p-2 mt-1 rounded transition duration-100 cursor-pointer text-slate-900 text-xl font-semibold font-monserrat w-1/2 m-auto ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700/50"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
