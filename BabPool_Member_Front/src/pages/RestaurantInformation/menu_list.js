import '../../css/Menu.css';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from "axios";
import { useEffect, useState } from "react";

import empty from "../../img/Empty.png";

const Menu = ({ menuData, navigation, restaurantId, informations }) => {
    if (menuData.menuStatus === "Y") {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Order', { menuData, restaurantId, informations })}
            >
                <Text>
                    <td className='menu-item2'>
                        <MenuPrint menuData={menuData} />
                        <div className='menu-item-price'>{menuData.menuPrice}원</div>
                    </td>
                </Text>
            </TouchableOpacity>
        );
    }
    else if (menuData.menuStatus === "N") {
        return (
            <Text>
                <td className='menu-item2'>
                    <MenuPrint menuData={menuData} />
                    <div className='menu-item-price'>품절</div>
                </td>
            </Text>
        )
    }
};
const Menu2 = ({ menuData, navigation, restaurantId, informations }) => {
    if (menuData.menuRepresentative === 1 && menuData.menuStatus === "Y") {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Order', { menuData, restaurantId, informations })}
            >
                <Text>
                    <td className='menu-item3'>
                        <MenuPrint menuData={menuData} />
                        <div className='menu-item-price'>{menuData.menuPrice}원</div>
                    </td>
                </Text>
            </TouchableOpacity>
        );
    }
    else if (menuData.menuRepresentative === 1 && menuData.menuStatus === "N") {
        return (
            <Text>
                <td className='menu-item3'>
                    <MenuPrint menuData={menuData} />
                    <div className='menu-item-price'>품절</div>
                </td>
            </Text>
        );
    }
};
const MenuList = ({ restaurantId, navigation, informations }) => {
    const [menus, setMenus] = useState([]);
    const [openGroups, setOpenGroups] = useState({});
    const [showOrigin, setShowOrigin] = useState(false);
    const toggleOrigin = () => {
        setShowOrigin(!showOrigin);
    };
    useEffect(() => {
        const fetchmenus = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ROOT}/api/v1/member/menu/all?restaurantId=${restaurantId}`);
                setMenus(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchmenus();
        setOpenGroups(menuGroups => {
            return Object.keys(menuGroups).reduce((acc, curr) => {
                acc[curr] = true;
                return acc;
            }, {});
        });
    }, [restaurantId]);
    const toggleGroup = (group) => {
        setOpenGroups(prevState => ({
            ...prevState,
            [group]: !prevState[group]
        }));
    };

    const menuGroups = menus.reduce((acc, curr) => {
        const groupName = curr.menuGroup;
        if (groupName in acc) {
            acc[groupName].push(curr);
        } else {
            acc[groupName] = [curr];
        }
        return acc;
    }, {});
    const sortedGroups = Object.entries(menuGroups).sort();
    return (
        <View>
            <Text>
                <div id="menu-list">
                    <div id="menu-item-representative">
                        <table>
                            <div id="menu-item-representative2">인기 메뉴</div>
                            <tbody className='menu-representative'>
                                {menus.map((menu, id) => (
                                    <Menu2 key={id} menuData={menu} navigation={navigation} restaurantId={restaurantId} informations={informations} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        {sortedGroups.map(([group, items]) => (
                            <div key={group}>
                                <h2 id="menu-groupname1" onClick={() => toggleGroup(group)}>
                                    {group}
                                </h2>
                                {!openGroups[group] && (
                                    <table>
                                        <tbody>
                                            {items.map((menu, id) => (
                                                <Menu key={id} menuData={menu} navigation={navigation} restaurantId={restaurantId} informations={informations} />
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="origin">
                        <button id="origin-btn" onClick={toggleOrigin}>
                            원산지<br />{showOrigin ? "∧" : "∨"}
                        </button>
                        <div
                            id="originInfo"
                            style={{ display: showOrigin ? "block" : "none" }}
                        >
                            {informations.restaurantOrigin}
                        </div>
                    </div>
                </div>
            </Text>
        </View>
    );
};

function MenuPrint(Data) {
    return (
        <div className='menu-item-div'> {/*여기가 가게 출력(!중요!클릭이벤트로 네비게이션)*/}
            {Data.menuData.menuPhoto != null && Data.menuData.menuPhoto != "null" ? (<img src={Data.menuData.menuPhoto} alt="" width="60" height="60" />) : (<img src={empty} alt="" width="60" height="60" />)}
            <div className='menu-item-text'>
                <div className='menu-item-text2'>
                    <div className='menu-item-text-name'>{Data.menuData.menuName}</div>
                </div>
                <div className='menu-item-text2'>
                    <div>{Data.menuData.menuContent}</div>
                </div>
            </div>
        </div>
    )
}
export default MenuList;