import axios from 'axios';
import { useState, useContext } from 'react';
import { Modal, Form, Button, ModalTitle, ModalFooter } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const ModifyMenuOptionModal = (props) => {
    const { restaurantId } = useParams();
    const { showModal, handleCloseModal, sortedGroup, menuList, selectedMenuOption, setSelectedMenuOption, handleInputChange } = props;
    const token = localStorage.getItem("token")

    const handleCustomInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "menuGroup" && value === "self") {
          setSelectedMenuOption({ ...selectedMenuOption, [name]: value, customMenuOptionCategory: "" });
        } else {
          setSelectedMenuOption({ ...selectedMenuOption, [name]: value });
        }
        if (name === "customMenuOptionCategory" && !value) {
          setSelectedMenuOption({ ...selectedMenuOption, menuOptionCategory: "" });
        }
      };

    const handleModifySubmit = (event) => {
        event.preventDefault();

        const modifyMenuOptionData = {
            ...selectedMenuOption,
            menuOptionCategory: selectedMenuOption.menuOptionCategory === "self" ? selectedMenuOption.customMenuOptionCategory : selectedMenuOption.menuOptionCategory,
        };

        console.log(modifyMenuOptionData);

        axios.patch(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}/menuOption`,
            modifyMenuOptionData
        , {
          headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
          handleCloseModal();
        //   window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleMenuOptionChange = (event) => {
        const { name, value } = event.target;
        if (name === "selectedMenuOptionCategory" && value === "self") {
            setSelectedMenuOption((prevMenuOption) => ({
            ...prevMenuOption,
            [name]: value,
            customMenuOptionCategory: "",
          }));
        } else {
            setSelectedMenuOption((prevMenuOption) => ({ ...prevMenuOption, [name]: value }));
        }
        if (name === "customMenuOptionCategory" && !value) {
            setSelectedMenuOption((prevMenuOption) => ({ ...prevMenuOption, selectedMenuOptionCategory: "" }));
        }
    };

    const handleModifyInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedMenuOption((prevSelectedMenuOption) => ({
          ...prevSelectedMenuOption,
          [name]: value,
        }));
      };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <ModalTitle>메뉴 옵션 수정하기</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleModifySubmit}>
                <Form.Group controlId='menuOptionCategory'>
                    <Form.Label>그룹 선택</Form.Label>
                    <Form.Control as="select" name="menuOptionCategory" value={selectedMenuOption.menuOptionCategory} onChange={handleMenuOptionChange} required>
                        <option value="">선택하세요</option>
                        {Object.entries(sortedGroup).map(([group]) => (
                            <option key={group} value={group}>
                            {group}
                            </option>
                        ))}
                        <option value='self'>직접 입력</option>
                    </Form.Control>
                    {selectedMenuOption.menuOptionCategory === 'self' && (
                        <Form.Control
                            type="text"
                            name="customMenuOptionCategory"
                            value={selectedMenuOption.customMenuOptionCategory}
                            onChange={handleCustomInputChange}
                            placeholder="그룹명을 입력하세요"
                            required
                        />
                    )}
                </Form.Group>
                <Form.Group controlId="menuOptionName">
                    <Form.Label>메뉴 옵션 이름</Form.Label>
                    <Form.Control
                    type="text"
                    name='menuOptionName'
                    value={selectedMenuOption.menuOptionName || ''}
                    onChange={handleModifyInputChange}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="menuOptionPrice">
                    <Form.Label>가격</Form.Label>
                    <Form.Control
                    type="number"
                    name='menuOptionPrice'
                    step="0.01"
                    value={selectedMenuOption.menuOptionPrice || ''}
                    onChange={handleModifyInputChange} 
                    required
                    />
                </Form.Group>
                <Form.Group controlId="menuOptionsMenuId">
    <Form.Label>메뉴 옵션을 추가할 메뉴</Form.Label>
    {menuList &&
        menuList.map((menu) => (
            <Form.Check
                key={menu.menuId}
                type="checkbox"
                id={menu.menuId}
                label={menu.menuName}
                checked={Array.isArray(selectedMenuOption.menuId) && selectedMenuOption.menuId.includes(menu.menuId)}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    setSelectedMenuOption((prevSelectedMenuOption) => {
                        if (isChecked) {
                            return {
                                ...prevSelectedMenuOption,
                                menuId: [...prevSelectedMenuOption.menuId, menu.menuId]
                            };
                        } else {
                            return {
                                ...prevSelectedMenuOption,
                                menuId: prevSelectedMenuOption.menuId.filter((id) => id !== menu.menuId)
                            };
                        }
                    });
                }}
            />
        ))}
</Form.Group>

                <Button type="submit">수정하기</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModifyMenuOptionModal;