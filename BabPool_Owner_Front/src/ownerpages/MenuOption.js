import React, { useEffect, useState } from 'react'
import SideBarElements from '../components/Sidebar/SideBarElements'
import ParentContainerWrapper from '../components/Main/ParentContainerWrapper'
import MenuNavbar from '../components/NavBar/MenuNavBarElements'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Modal } from 'react-bootstrap'
import MenuOptionModal from '../components/Modal/MenuOptionModal'
import axios from 'axios'
import { ThreeDots } from "react-bootstrap-icons";
import ModifyMenuOptionModal from '../components/Modal/ModifyMenuOptionModal'

const StyledButton = styled(Button)`
    margin-top: 3rem;
    margin-bottom: 15px;
`

const MenuOption = () => {
    const { restaurantId } = useParams();
    const token = localStorage.getItem("token")
    const [showModal, setShowModal] = useState(false);
    // 새로만드는 메뉴옵션
    const [menuOption, setMenuOption] = useState("");
    // 받아오는 메뉴옵션 리스트
    const [loadMenuOption, setLoadMenuOption] = useState([]);
    const [ menuList, setMenuList ] = useState([])
    const [expandedGroups, setExpandedGroups] = useState([]);
    // 메뉴옵션 수정시 나오는 modifyMenuOption
    const [selectedMenuOption, setSelectedMenuOption] = useState([]);
    const [showModifyModal, setShowModifyModal] = useState(false);
    
    useEffect(() => {
        if (token === null) {
            return;
        }
        axios
        .get(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            setMenuList(response.data.data);
          })
          .catch((error) => {});
        }, [token]);


    useEffect(() => {
        if (token === null) {
            return;
        }
        axios
        .get(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}/menuOption`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            setLoadMenuOption(response.data.data);
        })
        .catch((error) => {});
    }, [token]);

    const handleShowModifyModal = (item) => {
      setSelectedMenuOption(item);
      setShowModifyModal(true);
    };
    
    const handleGroupClick = (group) => {
        if (expandedGroups.includes(group)) {
          setExpandedGroups(expandedGroups.filter((g) => g !== group));
        } else {
          setExpandedGroups([...expandedGroups, group]);
        }
      };

    const sortedGroup = loadMenuOption.reduce((acc, cur) => {
        const group = cur.menuOptionCategory;
        if (!acc[group]) {
          acc[group] = { group, items: [] };
        }
        acc[group].items.push(cur);
        return acc;
      }, {});

    

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleCloseModifyModal = () => {
      setShowModifyModal(false);
      setSelectedMenuOption(null);
  }

    const handleAddMenuOptionClick = () => {
        setShowModal(true);
    };
    
    const validateNewMenu = (menuOption) => {
        if (!menuOption.menuOptionName) {
          return false;
        }
        
        if (!menuOption.menuOptionCategory) {
          return false;
        }
        
        if (isNaN(menuOption.menuOptionPrice)) {
          return false;
        }
        
        return true;
      };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!validateNewMenu(menuOption)) {
          alert("입력하지 않은 칸이 있습니다.")
          return
        }
    
        const menuData = {
          ...menuOption,
          menuOptionGroup: menuOption.menuOptionGroup === "self" ? menuOption.customMenuOptionGroup : menuOption.menuOptionGroup,
          customMenuGroup: undefined
        };
    
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}`, menuData, {
          headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
          handleCloseModal();
          window.location.reload();
        }).catch((error) => {
          alert('메뉴 추가에 실패했습니다.');
        });
      }

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMenuOption((prevMenuOption) => ({
          ...prevMenuOption,
          [name]: value,
        }));   
      };

  return (
    <div>
        <ModifyMenuOptionModal
          menuList = {menuList}
          sortedGroup={sortedGroup}
          showModal={showModifyModal}
          handleCloseModal={handleCloseModifyModal}
          selectedMenuOption={selectedMenuOption || { menuOptionName: '', menuOptionPrice: 0 }}
          setSelectedMenuOption={setSelectedMenuOption}
        />
        <MenuOptionModal
          menuList = {menuList}
          sortedGroup={sortedGroup}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <div className='side-bar'>
            <SideBarElements />
        </div>
        <ParentContainerWrapper>
            <div className='menu-details-nav-bar'>
                <MenuNavbar/>
            </div>
            <div className='add-button' style={{display : "flex", justifyContent: 'space-between'}}>
                <StyledButton onClick={handleAddMenuOptionClick}  style={{marginLeft: 'auto'}} >메뉴 옵션그룹 추가하기</StyledButton>
            </div>
            <div className="parent-container">
                {Object.values(sortedGroup).map(({ group, items }) => (
                    <div className="card" key={group} style={{ marginBottom: '15px' }}>
                        <div
                            className="card-header d-flex justify-content-center align-items-center"
                            style={{ paddingTop: '10px' }}
                            onClick={() => handleGroupClick(group)}
                        >
                        <h2 className="mb-0">{group}</h2>
                    </div>
                    {expandedGroups.includes(group) && (
                        <ul className="list-group list-group-flush">
                        {items.map((item) => (
                            <li
                            className="list-group-item"
                            key={item.menuOptionId}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                            >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginLeft: '15px' }}>
                                    <h3>{item.menuOptionName}</h3>
                                    <div className="menu-explain" style={{ fontSize: '25px' }}>
                                        {item.menuOptionPrice}원
                                    </div>
                                    <div className='menu-option-menu-name'>

                                        적용중인 메뉴 : 

                                    {item.menuId.map((id) => {
                                      const menu = menuList.find((menu) => menu.menuId === id);
                                      return menu ? (
                                        <div key={menu.menuId} style={{ display: 'inline-block', borderRadius: '50%', backgroundColor: 'transparent', padding: '5px' }}>
                                          <span>{menu.menuName}</span>
                                        </div>
                                      ) : null;
                                    })}
                                  </div>
                                </div>
                            </div>
                            <ThreeDots size={30}
                            style={{marginLeft: '15px', marginRight: '10px'}}
                            onClick={() => handleShowModifyModal(item)}
                            />
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
                ))}
            </div>
        </ParentContainerWrapper>
    </div>
  )
}

export default MenuOption