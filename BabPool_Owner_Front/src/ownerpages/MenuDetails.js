import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SideBarElements from "../components/Sidebar/SideBarElements";
import "../css/MenuDetails.css";
import MenuModal from "../components/Modal/MenuModal";
import ModifyMenuModal from "../components/Modal/ModifyMenuModal";
import MenuNavbar from "../components/NavBar/MenuNavBarElements";
import { Button } from "react-bootstrap";
import ParentContainerWrapper from "../components/Main/ParentContainerWrapper";
import AuthContext from "../AuthStore/Owner-auth-context";
import { PencilSquare } from 'react-bootstrap-icons';


const MenuDetails = () => {
  const { restaurantId } = useParams();
  // 받아오는 메뉴리스트
  const [menuList, setMenuList] = useState([]);
  // 메뉴 추가시 나오는 newMenu
  const [newMenu, setNewMenu] = useState([]);
  // 메뉴 수정시 나오는 modifyMenu
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [file, setFile] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState([]);
  const authCtx = useContext(AuthContext);
  const accessToken = authCtx.token;
  const token = localStorage.getItem("token")

  const sortedGroup = menuList.reduce((acc, cur) => {
    const group = cur.menuGroup;
    if (!acc[group]) {
      acc[group] = { group, items: [] };
    }
    acc[group].items.push(cur);
    return acc;
  }, {});

  
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
      .catch((error) => {
        setErrorMessage(error.response.data.msg);
        alert(error.response.data.msg)
        window.location.href = "/";
      });
    }, [token]);
    


    const handleGroupClick = (group) => {
      if (expandedGroups.includes(group)) {
        setExpandedGroups(expandedGroups.filter((g) => g !== group));
      } else {
        setExpandedGroups([...expandedGroups, group]);
      }
    };

    const handleShowModifyModal = (item) => {
      setSelectedMenu(item);
      setShowModifyModal(true);
    };
    
    const handleAddMenuClick = () => {
      setShowModal(true);
    };
    
    const handleCloseModal = () => {
      setShowModal(false);
    }
    
    const handleCloseModifyModal = () => {
      setShowModifyModal(false);
      setSelectedMenu(null);
    }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      const imgIncode = reader.result
      const img = imgIncode.split(',')[1]
      setNewMenu({ ...newMenu, menuPhoto: img})
    }
    if (!selectedFile) {
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    setFile(selectedFile);
  }; 

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateNewMenu(newMenu)) {
      alert("입력하지 않은 칸이 있습니다.")
      return
    }

    const menuData = {
      restaurantId: restaurantId,
      ...newMenu,
      menuGroup: newMenu.menuGroup === "self" ? newMenu.customMenuGroup : newMenu.menuGroup,
      customMenuGroup: undefined
    };

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}`, menuData, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      alert("메뉴가 추가됐습니다.");
      handleCloseModal();
      // window.location.reload();
    }).catch((error) => {
      alert('메뉴 추가에 실패했습니다.');
    });
  }

  const handleModifySubmit = (event) => {
    event.preventDefault();

    if (!validateNewMenu(selectedMenu)) {
      alert("입력하지 않은 칸이 있습니다.")
      return
    }

    const modifyMenuData = {
      ...selectedMenu,
      menuGroup: selectedMenu.menuGroup === "self" ? selectedMenu.customMenuGroup : selectedMenu.menuGroup,
      customMenuGroup: undefined
    };

    axios.patch(`${process.env.REACT_APP_API_ROOT}/api/v1/menu/${restaurantId}`, modifyMenuData, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      alert("메뉴가 수정됐습니다.");
      handleCloseModifyModal();
      window.location.reload();
    }).catch((error) => {
      alert('메뉴 수정에 실패했습니다.');
    });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value,
    }));   
  };

  const handleModifyInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value,
    }));
  };


  const validateNewMenu = (menu) => {
    if (!menu.menuName) {
      return false;
    }
    
    if (isNaN(menu.menuPrice)) {
      return false;
    }
    
    return true;
  };



  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      <ModifyMenuModal
        sortedGroup={sortedGroup}
        showModal={showModifyModal}
        handleCloseModal={handleCloseModifyModal}
        selectedMenu={selectedMenu || { menuName: '', menuImage: '', menuPrice: 0 }}
        setSelectedMenu={setSelectedMenu}
        handleInputChange={handleModifyInputChange}
        handleSubmit={handleModifySubmit}
      />
      <MenuModal 
        sortedGroup={sortedGroup}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        newMenu={newMenu}
        setNewMenu={setNewMenu}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />
      <div className="side-bar">
        <SideBarElements />
      </div>      
      <ParentContainerWrapper>
        <div className="menu-details-nav-bar">
          <MenuNavbar restaurantId={restaurantId} menuList={menuList} />
        </div>
        <div className="menu-details-header-wrapper">
          <div className="menu-details-header">
            <Button className="add-menu-btn" onClick={handleAddMenuClick}>
              메뉴그룹 추가하기
            </Button>
          </div>
        </div>
        <div className="parent-container" style={{ height: 'auto'}}>
          {Object.values(sortedGroup).map(({ group, items }) => (
            <div className="card mb-3 border-light"
                 key={group}
                 style={{marginBottom: '15px'}}>
              <div
                className="card-header d-flex justify-content-center align-items-center"
                style={{paddingTop: '10px'}}
                onClick={() => handleGroupClick(group)}
              >
                <h2 className="mb-0">{group}</h2>
              </div>
              {expandedGroups.includes(group) && (
                <ul className="list-group list-group-flush" style={{ display: 'inline-block'}}>
                  {items.map((item) => (
                    <li className="list-group-item"
                      key={item.menuId}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                      <img
                        src={item.menuPhoto !=="null" ? item.menuPhoto : process.env.PUBLIC_URL + '/images/owner.jpg'}
                        width="70" height="70" />
                        <div style={{marginLeft: '15px'}}>
                          <h4>{item.menuName}</h4>
                          <div className="menu-explain" style={{fontSize: "20px"}}>{item.menuPrice}원</div>
                          <div>{item.menuContent}</div>
                        </div>
                      </div>
                      <PencilSquare size={20}
                      style={{marginLeft: '20px', marginRight: '5px'}}
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
  );
}
export default MenuDetails;