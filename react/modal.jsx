import { useState } from 'react';

import ModalDialog from './ModalDialog';

export default function App() {
  const [title, setTitle] = useState('Modal Dialog');
  const [show, setShow] = useState(false);

  return (
    <div>
    <button onClick={() => setShow(!show)}>show Dialog</button>
      <ModalDialog title={title} show={show} closeModal={setShow}>
        One morning, when Gregor Samsa woke from troubled
        dreams, he found himself transformed in his bed into
        a horrible vermin. He lay on his armour-like back,
        and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches
        into stiff sections.
      </ModalDialog>
    </div>
  );
}

import { useState, useId, useEffect, useRef } from "react";

export default function ModalDialog({ children, title, show, closeModal }) {
  if (!show) return null;
  const overlayRef = useRef(null);
  const titleId = useId();
  const contentId = useId();

  useEffect(() => {
    if (!show) return;

    const handleKey = (e) => {
      if (e.key == "Escape") {
        closeModal(false);
      }
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) closeModal(false);
  };

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className="modal"
        aria-describedby={contentId}
        aria-labelledby={titleId}
        aria-modal="true"
        role="dialog"
      >
        <h1>{title}</h1>
        {children}
        <button onClick={() => closeModal(false)}>close</button>
      </div>
    </div>
  );
}


  /*
  body {
  font-family: sans-serif;
}

.modal-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  align-items: center;
    top: 0;
    bottom: 0;

  display: flex;
  justify-content: center;
  padding: 20px;
}

.modal {
  background-color: white;
  display: flex;
  flex-direction: column;
    align-items: center;
padding: 20px;

}
*/
  