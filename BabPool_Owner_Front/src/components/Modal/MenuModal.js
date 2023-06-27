import { useState, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import AuthContext from "../../AuthStore/Owner-auth-context";


const MenuModal = (props) => {
    const { sortedGroup, showModal, handleCloseModal, newMenu, setNewMenu, handleSubmit, handleImageChange, handleInputChange } = props;
    const { seletedMenu, setSeletedMenu } = useState("");

    const handleCustomInputChange = (event) => {
      const { name, value } = event.target;
      if (name === "menuGroup" && value === "self") {
        setNewMenu({ ...newMenu, [name]: value, customMenuGroup: "" });
      } else {
        setNewMenu({ ...newMenu, [name]: value });
      }
      if (name === "customMenuGroup" && !value) {
        setNewMenu({ ...newMenu, menuGroup: "" });
      }
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>메뉴 추가</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>

            <Form.Group controlId='menuGroup'>
                <Form.Label>그룹 선택</Form.Label>
                <Form.Control as="select" name="menuGroup" value={newMenu.menuGroup} onChange={handleCustomInputChange} required>
                  <option value="">선택하세요</option>
                  {Object.entries(sortedGroup).map(([group]) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                  <option value='self'>직접 입력</option>
                </Form.Control>
                {newMenu.menuGroup === 'self' && (
                  <Form.Control
                    type="text"
                    name="customMenuGroup"
                    value={newMenu.customMenuGroup}
                    onChange={handleCustomInputChange}
                    placeholder="그룹명을 입력하세요"
                    required
                  />
                )}
              </Form.Group>
              <Form.Group controlId="menuName">
                <Form.Label>메뉴 이름</Form.Label>
                <Form.Control type="text" name="menuName" placeholder="메뉴 이름" value={newMenu.menuName || ''} onChange={handleInputChange} required />
              </Form.Group>
{/* 
              <Form.Group controlId="menuCategory">
                <Form.Label>카테고리</Form.Label>
                <Form.Control as="select" name="menuCategory" value={newMenu.menuCategory} onChange={handleInputChange} required>
                  <option value="">선택하세요</option>
                  <option value="한식">한식</option>
                  <option value="중식">중식</option>
                  <option value="일식">일식</option>
                  <option value="양식">양식</option>
                </Form.Control>
              </Form.Group> */}

              <Form.Group controlId="menuPrice">
                <Form.Label>가격</Form.Label>
                <Form.Control type="number" name="menuPrice" placeholder="가격" value={newMenu.menuPrice || ''} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="menu">
                <Form.Label>메뉴 설명</Form.Label>
                <Form.Control as="textarea" name="menuContent" placeholder="메뉴 설명" value={newMenu.menuContent || ''} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group controlId="menuPhoto">
                <Form.Label>이미지 업로드</Form.Label>
                <Form.Control type="file" name="menuPhoto" onChange={handleImageChange} />
              </Form.Group>
              <Modal.Footer>
                <Button onClick={handleCloseModal}>닫기</Button>
                <Button onSubmit={handleSubmit} type="submit">추가</Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
    )
}

export default MenuModal;