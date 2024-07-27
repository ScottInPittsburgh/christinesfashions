import React from 'react'


// Styles for the modal (inline for simplicity, you can use CSS classes)
const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        textAlign: 'center',
    },
};

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.container}>
                <p>This site uses audio.</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default Modal