import React, { useState, useEffect, useRef } from "react";
import { useClickOutside } from "./useClickOutside";

const Modal = ({ title, content, onClose }) => {
  const ref = useClickOutside(onClose);
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  return (
    <div className="modal-container">
      <div className="modal-dialog" ref={ref}>
        <div className="modal-title">{title}</div>
        <div className="modal-content">{content}</div>
        <button onClick={onClose}>cancel</button>
      </div>
    </div>
  );
};

const ModalWrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open && (
        <Modal
          titl={"my modal"}
          content={<p>This is my modal</p>}
          onClose={() => setOpen(false)}
        />
      )}
      <button onClick={() => setOpen((prev) => !prev)}>Open Modal</button>
    </div>
  );
};

export default ModalWrapper;
