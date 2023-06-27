import React, { useEffect, useState, useContext } from 'react'
import SideBarElements from '../components/Sidebar/SideBarElements';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PencilSquare } from 'react-bootstrap-icons';
import MenuStatusModal from '../components/Modal/MenuStatusModal';
import "../css/AnnounceBarWrapper.css";
import ParentContainerWrapper from '../components/Main/ParentContainerWrapper';
import AuthContext from "../AuthStore/Owner-auth-context";

const MenuContainer = styled.div`
margin-top: 5rem;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
background-color: #ffffff;
padding: 1rem;
border-radius: 20px;
box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
`;

const ControlMenuContainer = styled.div`
  height: 200px;
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;

  @media screen and (max-width: 768px) {
    height: 150px;
    padding: 10px;
    flex-direction: column;
    font-size: xx-small;
  }
`;

const AnnounceBarWrapper = styled.div`
  border-radius: 10px;
  display: flex;
  background-color: rgb(184, 184, 184);
  height: 5rem;
  font-size: 1.5rem;
  align-items: center;
  color: white;
`;

const SoldOutHide = () => {
    const [menuList, setMenuList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const {restaurantId} = useParams();
    const [selectedMenuId, setSelectedMenuId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const authCtx = useContext(AuthContext);
    const token = localStorage.getItem("token")

    const handleShowStatusModal = (menuId) => {
        setSelectedMenuId(menuId);
        setShowModal(true);
    }
    
    const handleCloseModal = () => {
        setSelectedMenuId("");
        setShowModal(false);
    }

    useEffect(() => {
        if (token === null) {
            return;
        }
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}/soldOutHide`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            setMenuList(response.data.data);
        })
        .catch((error) => {
            setErrorMessage(error.response.data.msg);
            alert(error.response.data.msg)
            window.location.href = "/";
        });
    }, [token]);


  return (
      <div>
        <MenuStatusModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          selectedMenuId={selectedMenuId}
        />
        <div className="side-bar">
            <SideBarElements />
        </div>
        <ParentContainerWrapper>
            <div className='Announce-Bar'>
                <div className='AnnounceBarWrapper' style={{ fontWeight: 'bold'}}>품절 메뉴 및 숨김메뉴 관리</div>
            </div>
            <MenuContainer>
                품절메뉴
                {Array.isArray(menuList) && menuList
                    .filter((menu) => menu.menuStatus === 'N')
                    .map((menu) => (
                        <ControlMenuContainer key={menu.menuId}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img src={menu.menuPhoto} alt='' width="70" height="70" />
                                <div style={{margin : '30px', padding: '10px'}}>
                                    <p>메뉴명 : {menu.menuName}</p>
                                    <p>메뉴 그룹 : {menu.menuGroup}</p>
                                    <p>메뉴 가격 : {menu.menuPrice}</p>
                                    <p>메뉴 설명 : {menu.menuContent}</p>
                                </div>
                            </div>
                            <PencilSquare size={20}
                                style={{marginLeft: 'auto', marginRight: '10px'}}
                                onClick={(event) => handleShowStatusModal(menu.menuId)}
                            />
                        </ControlMenuContainer>
                    ))
                }
            </MenuContainer>
            <MenuContainer>
                숨김메뉴
                {Array.isArray(menuList) && menuList
                    .filter((menu) => menu.menuStatus === 'H')
                    .map((menu) => (
                        <ControlMenuContainer key={menu.menuId}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img src={menu.menuPhoto} alt='' width="70" height="70" />
                                <div style={{margin : '30px', padding: '10px'}}>
                                    <p>메뉴명 : {menu.menuName}</p>
                                    <p>메뉴 그룹 : {menu.menuGroup}</p>
                                    <p>메뉴 가격 : {menu.menuPrice}</p>
                                    <p>메뉴 설명 : {menu.menuContent}</p>
                                </div>
                            </div>
                            <PencilSquare size={20}
                                style={{marginLeft: 'auto', marginRight: '10px'}}
                                onClick={(event) => handleShowStatusModal(menu.menuId)}
                            />
                        </ControlMenuContainer>
                    ))
                }
            </MenuContainer>
        </ParentContainerWrapper>
    </div>
  )
}

export default SoldOutHide;