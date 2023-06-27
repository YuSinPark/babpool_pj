import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from "react";
import { Text, View, Modal, Button } from 'react-native';
import '../../css/Order.css';
import { useState } from 'react';
import axios from "axios";

import empty from "../../img/Empty.png";

export default function Order({ navigation }) {

    const route = useRoute();
    const menuData = route.params.menuData;
    const restaurantId = route.params.restaurantId;
    const informations = route.params.informations;

    const [isChecked, setIsChecked] = useState(false);
    const [menuOption, setMenuOption] = useState([]);
    // 장바구니 테스트 영역

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [recentCart, setRecentCart] = useState([]);
    const [priceSum, setPriceSum] = useState(0);
    const [pressedButtons, setPressedButtons] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [checkedOptions, setCheckedOptions] = useState([]);


    const pricesum = (id, name, price) => {
        setPressedButtons((prevButtons) => {
            const button = { id, name, price };
            const buttonIndex = prevButtons.findIndex((btn) => btn.id === id);

            if (buttonIndex > -1) {
                // Button is already checked, remove it
                const updatedButtons = [...prevButtons];
                updatedButtons.splice(buttonIndex, 1);
                return updatedButtons;
            } else {
                // Button is newly checked, add it
                return [...prevButtons, button];
            }
        });
    };

    useEffect(() => {
        // Calculate price sum based on pressedButtons
        const totalPriceSum = pressedButtons.reduce((sum, button) => sum + Number(button.price), 0);
        setPriceSum(Number(totalPriceSum) + Number(menuData.menuPrice));
    }, [pressedButtons]);

    // 장바구니 테스트 영역

    useEffect(() => {
        navigation.setOptions({
            title: menuData.menuName
        });
        const fetchmenuoption = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ROOT}/api/v1/member/menuOption/options?menuId=${menuData.menuId}`);
                setMenuOption(response.data.data);
                setPriceSum(menuData.menuPrice);
            } catch (error) {
                console.error(error);
            }
        };
        fetchmenuoption();
    }, [navigation, menuData]);

    const handleCheck = (item) => {
        setIsChecked(!isChecked);

    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
    const kapay = () => {
        navigation.navigate('KakaoPay');
    }


    const addRecentCart = async (price) => {
        const orderMenu = {
            name: menuData.menuName,
            menuId: menuData.menuId,
            orderMenuPrice: menuData.menuPrice,
            orderMenuCount: quantity,
            price: price,
            totalprice: price * quantity,
            orderMenuSubDtoList: pressedButtons.map((button) => ({
                menuOptionId: button.id,
                orderMenuSubName: button.name,
                orderMenuSubPrice: button.price,
            })),
        };

        const recentCartList = JSON.parse(localStorage.getItem("recentCart")) || [];

        let foundIndex = -1;

        for (let i = 0; i < recentCartList.length; i++) {
            if (recentCartList[i].restaurantId !== restaurantId) {
                openModal();
                console.log("다른 가게입니다.");
                return; // 다른 레스토랑 아이디일 경우 함수를 종료합니다.
            } else {
                // 같은 레스토랑 아이디인 경우 추가 작업을 수행합니다.
                foundIndex = i;
                break;
            }
        }

        if (foundIndex !== -1) {
            const existingMenuIndex = recentCartList[foundIndex].orderMenuRequestDtoList.findIndex(
                (menu) => menu.menuId === orderMenu.menuId
            );

            if (existingMenuIndex !== -1) {
                // 이미 있는 메뉴인 경우 옵션까지 동일한지 체크합니다.
                const existingMenu = recentCartList[foundIndex].orderMenuRequestDtoList[existingMenuIndex];
                const existingOptions = existingMenu.orderMenuSubDtoList;

                if (optionsAreEqual(existingOptions, orderMenu.orderMenuSubDtoList)) {
                    // 옵션까지 동일한 경우 수량을 증가시킵니다.
                    existingMenu.orderMenuCount += orderMenu.orderMenuCount;
                    existingMenu.totalprice += orderMenu.totalprice;
                } else {
                    // 옵션이 다른 경우 새로운 메뉴로 추가합니다.
                    recentCartList[foundIndex].orderMenuRequestDtoList.push(orderMenu);
                }
            } else {
                // 새로운 메뉴인 경우 추가합니다.
                recentCartList[foundIndex].orderMenuRequestDtoList.push(orderMenu);
            }
        } else {
            const cartInfo = {
                restaurantId: restaurantId,
                orderMenuRequestDtoList: [orderMenu],
            };
            recentCartList.push(cartInfo);
        }

        await AsyncStorage.setItem("recentCart", JSON.stringify(recentCartList));
        setRecentCart(recentCartList);
        navigation.goBack();
    };

    // 장바구니 테스트 영역
    useEffect(() => {

        const recentCartList = JSON.parse(localStorage.getItem("recentCart"));
        if (recentCartList) {
            setRecentCart(recentCartList);
        }
    }, []);

    // 옵션들이 동일한지 체크하는 함수
    const optionsAreEqual = (options1, options2) => {
        if (options1.length !== options2.length) {
            return false;
        }

        for (let i = 0; i < options1.length; i++) {
            const option1 = options1[i];
            const option2 = options2[i];

            if (
                option1.menuOptionId !== option2.menuOptionId ||
                option1.orderMenuSubName !== option2.orderMenuSubName ||
                option1.orderMenuSubPrice !== option2.orderMenuSubPrice
            ) {
                return false;
            }
        }

        return true;
    };


    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const getNewCart = () => {
        setIsModalVisible(false);
        localStorage.removeItem("recentCart");
        addRecentCart(priceSum * quantity);

    }

    // 장바구니 테스트 영역
    const groupedOptions = {};
    menuOption.forEach(option => {
        if (!groupedOptions[option.menuOptionCategory]) {
            groupedOptions[option.menuOptionCategory] = [];
        }
        groupedOptions[option.menuOptionCategory].push(option);
    });

    return (
        <View>
            <Text>
                <table className='order-body'>
                    <tbody>
                        {menuData.menuPhoto != null ? (<img className='order-menu-photo' src={menuData.menuPhoto} width="100%" height="50%" alt="" />) : (<img className='order-menu-photo' src={empty} width="100%" height="50%" alt="" />)}
                        <div className='order-menu-name'>{menuData.menuName}</div>
                        <div className='order-menu-content'>{menuData.menuContent}</div>
                        <hr></hr>
                        {/* <div className='order-option-category'>{menuOption.menuOptionCategory}</div>
                        <div>
                            {menuOption.map((option, id) => (
                                <div className='order-checkbox-container' key={id}>
                                    <div className='order-checkbox-div'>
                                        <input onClick={() => pricesum(option.menuOptionId, option.menuOptionName, option.menuOptionPrice)} id={`ch${id + 1}`} type="checkbox" checked={isChecked} onChange={handleCheck} />
                                        <label htmlFor={`ch${id + 1}`}>{option.menuOptionName}</label>
                                    </div>
                                    <div>({option.menuOptionPrice}원)</div>
                                </div>
                            ))}
                        </div> */}
                        {/* <div>
                            {Object.entries(groupedOptions).map(([category, options]) => (
                                <div key={category} >
                                    <div className='order-option-category'>{category}</div>
                                    <div>
                                        {options.map((option, id) => (
                                            <div className='order-checkbox-container' key={id}>
                                                <div className='order-checkbox-div'>
                                                    <input onClick={() => pricesum(option.menuOptionId, option.menuOptionName, option.menuOptionPrice)} id={`ch${id + 1}`} type="checkbox" checked={isChecked} onChange={handleCheck} />
                                                    <label htmlFor={`ch${id + 1}`}>{option.menuOptionName}</label>
                                                </div>
                                                <div>({option.menuOptionPrice}원)</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div> */}
                        <div>
                            {Object.entries(groupedOptions).map(([category, options]) => (
                                <div key={category}>
                                    <div className='order-option-category'>{category}</div>
                                    <div>
                                        {options.map((option, index) => (
                                            <div className='order-checkbox-container' key={option.menuOptionId}>
                                                <div className='order-checkbox-div'>
                                                    <input
                                                        onClick={() => pricesum(option.menuOptionId, option.menuOptionName, option.menuOptionPrice)}
                                                        id={`ch${option.menuOptionId}`}
                                                        type="checkbox"
                                                        checked={isChecked[index]}
                                                        onChange={(event) => handleCheck(event, index)}
                                                    />
                                                    <label htmlFor={`ch${option.menuOptionId}`}>{option.menuOptionName}</label>
                                                </div>
                                                <div>({option.menuOptionPrice}원)</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </tbody>
            

                    <div className='cart-item'>
                        <div>
                        <div>메뉴 : {menuData.menuName} : {menuData.menuPrice}원</div>
                 
                            <div>선택된 옵션</div>
                            <ul>
                           
                                {pressedButtons.map((button, index) => (
                                    <li key={index}>{button.name} : {button.price}원</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='order-change-amount'>
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>

                    <div className='order-cart'>
                        <div className='left-div'>
                            <div>배달최소주문금액</div>
                            <div>{informations.restaurantMinPrice}</div>
                        </div>
                        <div className='right-div'>
                            <div onClick={() => addRecentCart(priceSum)} className='priceSum'>
                                {priceSum * quantity}원 담기
                            </div>
                        </div>

                    </div>
                </table>
            </Text>
            <Modal visible={isModalVisible} animationType="fade" transparent>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>같은 가게의 메뉴만 담을 수 있습니다.</Text>
                        <view style={{ display: 'flex', justifyContent: 'center', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal}>취소</div>
                            <div className="order-alert" onClick={getNewCart}>담기</div>
                        </view>
                    </View>
                </View>
            </Modal>
        </View>
    )
};