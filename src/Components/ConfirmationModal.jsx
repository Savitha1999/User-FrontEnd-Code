import React from 'react';

const ConfirmationModal = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>{message}</p>
        <div style={styles.buttons}>
          <button style={styles.yes} onClick={onConfirm}>Yes</button>
          <button style={styles.no} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 9999
  },
  modal: {
    background: '#fff', padding: '20px 30px', borderRadius: '10px', textAlign: 'center', minWidth: '300px'
  },
  buttons: {
    display: 'flex', justifyContent: 'space-around'
  },
  yes: {
    background: '#2F747F', color: '#fff', padding: '8px 20px', border: 'none', borderRadius: '5px'
  },
  no: {
    background: '#FF4500', color: '#fff', padding: '8px 20px', border: 'none', borderRadius: '5px'
  }
};

export default ConfirmationModal;
