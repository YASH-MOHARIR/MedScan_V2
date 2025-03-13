import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
       
        <div className="modal-header">
          {title && <h2>{title}</h2>}
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">{children}</div>
        
      </div>
    </div>
  );
};

export default CustomModal;
