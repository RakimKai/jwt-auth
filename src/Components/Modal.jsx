import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

const Modal = ({ children, open, onClose }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black/50 z-50" />
      <div className="fixed text-xl p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg shadow-sm bg-white ">
        {children}
        <div className="flex justify-center mt-5">
          <Button text="Close" handleSubmit={onClose} />
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
