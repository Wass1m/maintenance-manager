import React from "react";

const Modal = ({ children, endModal }) => {
  return (
    <div onClick={endModal} className="modal">
      {children}
    </div>
  );
};

export default Modal;
