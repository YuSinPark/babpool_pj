import { Modal, Form, Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import styled from 'styled-components';
import { useContext } from "react";
import AuthContext from "../../AuthStore/Owner-auth-context";
import { useParams } from 'react-router-dom';

const AlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 2;
`;

const ModifyMenuModal = (props) => {
    const {sortedGroup, showModal, handleCloseModal, selectedMenu, setSelectedMenu, handleInputChange, handleSubmit } = props;
    const authCtx = useContext(AuthContext);
    const accessToken = authCtx.token;
    const {restaurantId} = useParams();
    const token = localStorage.getItem("token")

    const handleCustomInputChange = (event) => {
      const { name, value } = event.target;
      if (name === "menuGroup" && value === "self") {
        setSelectedMenu({ ...selectedMenu, [name]: value, customMenuGroup: "" });
      } else {
        setSelectedMenu({ ...selectedMenu, [name]: value });
      }
      if (name === "customMenuGroup" && !value) {
        setSelectedMenu({ ...selectedMenu, menuGroup: "" });
      }
    };

    
    const handleDeleteMenu = (event, selectedMenu) => {
      event.preventDefault();
      handleCloseModal(true);
      
      confirmAlert({
        title: '메뉴 삭제',
        message: '메뉴를 삭제하시겠습니까?',
        buttons: [
          {
            label: '예',
            onClick: () => {
              axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}/deleteMenu`, {
                menuId: selectedMenu.menuId
              }, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              .then((response) => {
              })
              .catch((error) => {
                alert(error.response.data.msg)
              })
            }
          },
          {
            label: '아니오',
          }
        ]
      });
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>메뉴 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='menuGroup'>
                <Form.Label>그룹 선택</Form.Label>
                <Form.Control as="select" name="menuGroup" value={selectedMenu.menuGroup} onChange={handleCustomInputChange} required>
                  <option value="">선택하세요</option>
                  {Object.entries(sortedGroup).map(([group]) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                  <option value='self'>직접 입력</option>
                </Form.Control>
                {selectedMenu.menuGroup === 'self' && (
                  <Form.Control
                    type="text"
                    name="customMenuGroup"
                    value={selectedMenu.customMenuGroup}
                    onChange={handleCustomInputChange}
                    placeholder="그룹명을 입력하세요"
                    required
                  />
                )}
              </Form.Group>
              <Form.Group controlId="menuName">
                <Form.Label>메뉴 이름</Form.Label>
                <Form.Control type="text"
                name="menuName"
                placeholder="메뉴 이름"
                value={selectedMenu.menuName || ''}
                onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="menuPrice">
                <Form.Label>가격</Form.Label>
                <Form.Control type="number" name="menuPrice" placeholder="가격" value={selectedMenu.menuPrice || ''} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="menuContent">
                <Form.Label>메뉴 설명</Form.Label>
                <Form.Control as="textarea" name="menuContent" placeholder="메뉴 설명" value={selectedMenu.menuContent || ''} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group controlId="menuStatus">
                <Form.Label>판매 여부</Form.Label>
                <Form.Control as="select" name="menuStatus" value={selectedMenu.menuStatus} onChange={handleInputChange} required>
                  <option value="">선택하세요</option>
                  <option value="Y">판매</option>
                  <option value="N">품절</option>
                  <option value="H">메뉴 숨기기</option>
                </Form.Control>
              </Form.Group>
              <Modal.Footer>
                <div className="d-flex justify-content-between w-100">
                  <Button onSubmit={handleSubmit} type="submit">수정</Button>
                  <div className="ml-auto">
                    <Button onClick={(event) => handleDeleteMenu(event, selectedMenu)} variant='danger'>삭제</Button>
                  </div>
                </div>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
    )
}
       
export default ModifyMenuModal;