import axios from 'axios';
import { useState, useContext } from 'react';
import { Modal, Form, Button, ModalTitle, ModalFooter } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const MenuOptionModal = (props) => {
    const { restaurantId } = useParams();
    const { showModal, handleCloseModal, sortedGroup, menuList } = props;
    const [ menuOption, setMenuOption ] = useState({
        menuId: []
    });
    const token = localStorage.getItem("token")

    const handleSubmit = (event) => {
        event.preventDefault();

        const menuOptionData = {
            ...menuOption,
            menuOptionCategory: menuOption.menuOptionCategory === "self" ? menuOption.customMenuOptionCategory : menuOption.menuOptionCategory,
            customMenuOptionCategory: undefined
        };

        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}/menuOption`,
            menuOptionData
        , {
          headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
          alert("메뉴가 추가됐습니다.")
          handleCloseModal();
          window.location.reload();
          
        })
        .catch((error) => {
          alert("메뉴 추가에 실패했습니다.")
          console.log(error);
        });
    };

    const handleMenuOptionChange = (event) => {
        const { name, value } = event.target;
        if (name === "menuOptionCategory" && value === "self") {
          setMenuOption((prevMenuOption) => ({
            ...prevMenuOption,
            [name]: value,
            customMenuOptionCategory: "",
          }));
        } else {
          setMenuOption((prevMenuOption) => ({ ...prevMenuOption, [name]: value }));
        }
        if (name === "customMenuOptionCategory" && !value) {
          setMenuOption((prevMenuOption) => ({ ...prevMenuOption, menuOptionCategory: "" }));
        }
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <ModalTitle>메뉴 옵션 추가하기</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group controlId='menuOptionCategory'>
                    <Form.Label>그룹 선택</Form.Label>
                    <Form.Control as="select" name="menuOptionCategory" value={menuOption.menuOptionCategory} onChange={handleMenuOptionChange} required>
                        <option value="">선택하세요</option>
                        {Object.entries(sortedGroup).map(([group]) => (
                            <option key={group} value={group}>
                            {group}
                            </option>
                        ))}
                        <option value='self'>직접 입력</option>
                    </Form.Control>
                    {menuOption.menuOptionCategory === 'self' && (
                        <Form.Control
                            type="text"
                            name="customMenuOptionCategory"
                            value={menuOption.customMenuOptionCategory}
                            onChange={handleMenuOptionChange}
                            placeholder="그룹명을 입력하세요"
                            required
                        />
                    )}
                </Form.Group>
                <Form.Group controlId="menuOptionName">
                    <Form.Label>메뉴 옵션 이름</Form.Label>
                    <Form.Control
                    type="text"
                    value={menuOption.menuOptionName || ''}
                    onChange={(e) => setMenuOption({ ...menuOption, menuOptionName: e.target.value })}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="menuOptionPrice">
                    <Form.Label>가격</Form.Label>
                    <Form.Control
                    type="number"
                    step="0.01"
                    value={menuOption.menuOptionPrice || ''}
                    onChange={(e) => setMenuOption({ ...menuOption, menuOptionPrice: e.target.value })}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="menuOptionMenuId">
                <Form.Label>메뉴 옵션을 추가할 메뉴</Form.Label>
                {menuList &&
                    menuList.map((menu) => (
                    <Form.Check
                        key={menu.menuId}
                        type="checkbox"
                        id={menu.menuId}
                        label={menu.menuName}
                        checked={menuOption.menuId.includes(menu.menuId)}
                        onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                            setMenuOption({
                            ...menuOption,
                            menuId: [...menuOption.menuId, menu.menuId]
                            });
                        } else {
                            setMenuOption({
                            ...menuOption,
                            menuId: menuOption.menuId.filter((id) => id !== menu.menuId)
                            });
                        }
                        }}
                    />
                    ))}
                </Form.Group>
                <Button type="submit">추가</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default MenuOptionModal;