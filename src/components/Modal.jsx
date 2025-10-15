import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="cly-modal-overlay">
            <div className="cly-modal-content">
                <button className="cly-modal-close" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
