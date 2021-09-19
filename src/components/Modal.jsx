import { useState } from "react";
import "../css/Modal.css";

function Modal({ buttonLabel, children }) {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="">
      <button className="button-reset-styles" onClick={openModal}>
        {buttonLabel}
      </button>
      {showModal && (
        <div className="modal-bg">
          <div className="modal">
            {children}
            <button onClick={closeModal} className="modal-close">
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
