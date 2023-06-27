import axios from 'axios';
import { useState, useContext } from 'react';
import { Modal, Form, Button, ModalTitle } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AuthContext from "../../AuthStore/Owner-auth-context";

const RepresentativeMenuModal = (props) => {
    const { restaurantId } = useParams();
    const [ representativeMenu, setRepresentativeMenu ] = props.representativeMenuState;
    const [checkedMenuIds, setCheckedMenuIds] = useState([]);
    const { showModal, handleCloseModal } = props;
    const authCtx = useContext(AuthContext);
    const accessToken = authCtx.token;
    const token = localStorage.getItem("token")

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}/representative`, {
          checkedMenuIds : checkedMenuIds
        }, {
          headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
          handleCloseModal();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleCheckboxChange = (event) => {
      const { value, checked } = event.target;
      const updatedMenu = representativeMenu.map((menu) =>
        menu.menuId === Number(value) ? { ...menu } : menu
      );
      setRepresentativeMenu(updatedMenu);
    
      if (checked) {
        setCheckedMenuIds([...checkedMenuIds, Number(value)]);
        console.log(checkedMenuIds);
      } else {
        setCheckedMenuIds(checkedMenuIds.filter((id) => id !== Number(value)));
      }
    };
    
    

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <ModalTitle>대표 메뉴 설정</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {representativeMenu
                    .filter((menu) => menu.menuRepresentative === 0)
                    .map((menu) => (
                        <Form.Check
                            key={menu.menuId}
                            type='checkbox'
                            name='representativeMenu'
                            id={`menu-${menu.menuId}`}
                            value={menu.menuId}
                            label={menu.menuName}
                            checked={checkedMenuIds.includes(menu.menuId)}
                            onChange={handleCheckboxChange}
                        />
                    ))}
                  <Button type="submit">저장</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default RepresentativeMenuModal;