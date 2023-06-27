import React, { useEffect, useState, useContext } from 'react'
import SideBarElements from '../components/Sidebar/SideBarElements';
import MenuNavbar from '../components/NavBar/MenuNavBarElements';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import RepresentativeMenuModal from '../components/Modal/RepresentativeMenuModal';
import { XSquare } from "react-bootstrap-icons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ParentContainerWrapper from '../components/Main/ParentContainerWrapper';
import AuthContext from "../AuthStore/Owner-auth-context";

const StyledButton = styled(Button)`
    margin-top: 3rem;
`

const MenuContainer = styled.div`
    margin-top: 2rem;
    background-color: #f7f7f7;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
`

const RepresentativeMenu = () => {
    const { restaurantId } = useParams();
    const [ representativeMenu, setRepresentativeMenu ] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [checkedMenuIds, setCheckedMenuIds] = useState([]);
    const authCtx = useContext(AuthContext);
    const accessToken = authCtx.token;
    const token = localStorage.getItem("token")

    const handleDeleteRepresentativeMenu = (event, menu) => {
        event.preventDefault();
        confirmAlert({
            title: '대표 메뉴 삭제',
            message: '정말 삭제하시겠습니까?',
            buttons: [
                {
                    label: '예',
                    onClick: () => {
                        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}/representative`, {
                            checkedMenuIds: [menu.menuId]
                        }, {
                            headers: {Authorization: `Bearer ${token}`}
                        })
                        window.location.reload();
                    }
                },
                {
                    label: '아니오'
                }
            ]
        });
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleAddRepresentativeMenuClick = () => {
        setShowModal(true);
    };

    useEffect(() => {
        if (token === null) {
            return;
        }
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}/representative`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            setRepresentativeMenu(response.data.data);
        })
        .catch((error) => {
            setErrorMessage(error.response.data.msg)
        });
    }, [token]);

    return (
        <div>
            <RepresentativeMenuModal
            representativeMenuState={[representativeMenu, setRepresentativeMenu]}
            showModal={showModal}
            handleCloseModal={handleCloseModal} />
            <div className="side-bar">
                <SideBarElements />
            </div>
            <ParentContainerWrapper>
                <div className="menu-details-nav-bar">
                    <MenuNavbar/>
                </div>
                <div className='add-button' style={{display : "flex", justifyContent: 'space-between'}}>
                    <StyledButton onClick={handleAddRepresentativeMenuClick}  style={{marginLeft: 'auto'}} >대표 메뉴 추가</StyledButton>
                </div>
                <div className='representativeMenu'>
                    {representativeMenu
                        .filter((menu) => menu.menuRepresentative === 1)
                        .map((menu) => (
                        <MenuContainer key={menu.menuId}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img src={menu.menuPhoto} alt="" width="70" height="70" />
                                <div style={{marginLeft: '15px'}}>
                                    <h3>{menu.menuName}</h3>
                                    <div style={{fontSize: '25px'}}>{menu.menuPrice}원 | {menu.menuContent}</div>
                                </div>
                                <Button size={30}
                                style={{marginLeft: 'auto', marginRight: '10px'}}
                                variant='danger'
                                onClick={(event) => handleDeleteRepresentativeMenu(event, menu)}
                                >
                                    삭제
                                </Button>
                            </div>
                        </MenuContainer>
                    ))}
                </div>
            </ParentContainerWrapper>
        </div>
    );
}
export default RepresentativeMenu;