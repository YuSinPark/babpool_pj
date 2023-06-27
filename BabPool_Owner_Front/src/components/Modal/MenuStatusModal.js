import React, { useState, useContext } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AuthContext from "../../AuthStore/Owner-auth-context";
import { confirmAlert } from 'react-confirm-alert';

const MenuStatusModal = (props) => {
    const { handleCloseModal, selectedMenuId, showModal } = props;
    const [selectedValue, setSelectedValue] = useState("");
    const {restaurantId} = useParams();
    const authCtx = useContext(AuthContext);
    const accessToken = authCtx.token;
    const token = localStorage.getItem("token")


    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        axios.patch(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}`, {
            menuId: selectedMenuId,
            menuStatus: selectedValue
        }, {
          headers: {Authorization: `Bearer ${token}`}
        })
          .then(response => {
            if (response) {
              handleCloseModal();
              window.location.reload();
            }
          })
          .catch(error => console.error(error));
      };
      

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>메뉴 판매여부 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="menuStatus">
                <Form.Label>판매 여부</Form.Label>
                <Form.Control as="select" name="menuStatus" value={selectedValue} onChange={handleSelectChange}>
                  <option value="">선택하세요</option>
                  <option value="Y">판매</option>
                  <option value="N">품절</option>
                  <option value="H">메뉴 숨기기</option>
                </Form.Control>
              </Form.Group>
              <Modal.Footer>
                <div className="d-flex justify-content-between w-100">
                  <Button onSubmit={handleSubmit} type="submit">수정</Button>
                </div>
              </Modal.Footer>
            </Form>
          </Modal.Body>
    </Modal>
  )
}

export default MenuStatusModal;