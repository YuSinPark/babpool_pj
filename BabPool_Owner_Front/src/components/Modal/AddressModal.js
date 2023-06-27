import React, { useState } from 'react';

const AddressModal = ({ onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default AddressModal;