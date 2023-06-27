import React, { useState } from 'react';
import { Button, Modal, ModalTitle } from 'react-bootstrap';

const OrderModal = ({ orderId, handleAcceptOrder, closeModal }) => {
  const [orderDetailsPT, setOrderDetailsPT] = useState(10);
  const handleConfirm = () => {
    handleAcceptOrder(orderId, orderDetailsPT);
    closeModal();
  };

  const handleDurationChange = (event) => {
    const selectedDuration = parseInt(event.target.value);
    setOrderDetailsPT(selectedDuration);
  }

  return (
    <Modal show={true} onHide={closeModal} centered>
      <ModalTitle>
        <div>신규주문</div>
      </ModalTitle>
      <Modal.Body>
        <div>소요시간</div>
        <div>
            <select onChange={handleDurationChange}>
                <option value={10}>10분</option>
                <option value={15}>15분</option>
                <option value={20}>20분</option>
                <option value={25}>25분</option>
                <option value={30}>30분</option>
                <option value={35}>35분</option>
                <option value={40}>40분</option>
                <option value={45}>45분</option>
                <option value={50}>50분</option>
                <option value={55}>55분</option>
                <option value={60}>60분</option>
            </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleConfirm}>확인</Button>
        <Button onClick={closeModal}>취소</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal