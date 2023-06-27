import React, { useEffect, useState, useContext } from "react";
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import styles from "../css/jscss";
import AuthContext from "../AuthStore/Member-auth-context";
import '../css/Bucket.css';
import emptyCart from '../img/emptyCart.png'
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';



const Bucket = ({ navigation }) => {
  const route = useRoute();
  const [recentCart, setRecentCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [informations, setInformations] = useState([]);
  const cartInformation = JSON.parse(localStorage.getItem("recentCart"));
  const cartRestaurant = cartInformation && cartInformation.length > 0 ? cartInformation[0].restaurantId : null;
  const totalPrice = cartInformation ? cartInformation.reduce((acc, item) => {
    const menuTotalPrice = item.orderMenuRequestDtoList.reduce((menuAcc, menu) => menuAcc + menu.totalprice, 0);
    return acc + menuTotalPrice;
  }, 0) : 0;

  const authCtx = useContext(AuthContext);
  const memberId = route.params.memberId ? route.params.memberId : authCtx.userObj.memberId;
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigation.navigate('Login');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOrder = () => {
     if(totalPrice < informations.restaurantMinPrice){
      setPriceModalOpen(true);
 
    }else if (token == null) {
      setIsModalOpen(true);
    } else if(token != null && totalPrice >= informations.restaurantMinPrice) {
      navigation.navigate('OrderDetail', { restaurantId: cartRestaurant, deliveryTip: informations.rdTip })
    }
  };
  const increaseQuantity = (cartIndex, menuIndex) => {
    const updatedCart = cartInformation.map((item, i) => {
      if (i === cartIndex) {
        const orderMenuList = item.orderMenuRequestDtoList.map((menu, j) => {
          if (j === menuIndex) {
            const newQuantity = menu.orderMenuCount + 1;
            return {
              ...menu,
              orderMenuCount: newQuantity,
              totalprice: menu.price * newQuantity,
            };
          }
          return menu;
        });

        return {
          ...item,
          orderMenuRequestDtoList: orderMenuList,
        };
      }
      return item;
    });

    setRecentCart(updatedCart);
    localStorage.setItem("recentCart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (cartIndex, menuIndex) => {
    const updatedCart = cartInformation.map((item, i) => {
      if (i === cartIndex) {
        const orderMenuList = item.orderMenuRequestDtoList.map((menu, j) => {
          if (j === menuIndex && menu.orderMenuCount > 1) {
            const newQuantity = menu.orderMenuCount - 1;
            return {
              ...menu,
              orderMenuCount: newQuantity,
              totalprice: menu.price * newQuantity,
            };
          }
          return menu;
        });

        return {
          ...item,
          orderMenuRequestDtoList: orderMenuList,
        };
      }
      return item;
    });

    setRecentCart(updatedCart);
    localStorage.setItem("recentCart", JSON.stringify(updatedCart));
  };

  const getRestaurantHandler = () => {
    const URL = `${process.env.REACT_APP_API_ROOT}/api/v1/member/restaurant/information?restaurantId=${cartRestaurant}&&memberId=${memberId}`
    return axios.get(URL, { headers: { Authorization: `Bearer ${token}` } });
  };

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        if (!cartRestaurant) {
          return;
        }

        const response = await getRestaurantHandler();
        setInformations(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInformation();
  }, [cartRestaurant]);

  useEffect(() => {
    const updatedCart = JSON.parse(localStorage.getItem("recentCart"));
    setRecentCart(updatedCart);
  }, []);

  useEffect(() => {
    console.log(recentCart);
  }, [recentCart]);

  const handleConfirmMore = () => {
    navigation.navigate('Restaurant', { restaurantId: cartRestaurant });
    setPriceModalOpen(false)
  };

  const handleCancelmMore = () => {
    setPriceModalOpen(false)
  };



  if (!cartInformation || cartInformation.length === 0) {
    return (
      <div className="bucket-body">
        <div className="empty-cart">
          <img src={emptyCart} alt="" width='80%' />
        </div>
      </div>
    );
  } else if (recentCart.length !== null) {
    return (
      <div className="bucket-body">
        <div className="bucket-restaurant">
          <div>
            <img src={informations.restaurantPhoto} alt="" width="30" height="30" />
          </div>
          <div>{informations.restaurantName}</div>
        </div>
        {cartInformation.map((cartItem, index) => (
          <div className="bucket-cart-item" key={`cartItem-${index}`}>
            {cartItem.orderMenuRequestDtoList.map((menu, menuIndex) => (
              <div key={`menu-${index}-${menuIndex}`}>
                <div className="bucket-top-nav">
                  <div className="bucket-cart-name">{menu.name}</div>

                  <div
                    onClick={(e) => {
                      const updatedCart = cartInformation.map((item, i) => {
                        if (i === index) {
                          const updatedMenuList = item.orderMenuRequestDtoList.filter((m, j) => j !== menuIndex);
                          if (updatedMenuList.length === 0) {
                            return null;
                          }
                          return {
                            ...item,
                            orderMenuRequestDtoList: updatedMenuList,
                          };
                        }
                        return item;
                      }).filter((item) => item !== null);
                      setRecentCart(updatedCart);
                      localStorage.setItem('recentCart', JSON.stringify(updatedCart.length > 0 ? updatedCart : []));
                    }}
                  >
                    ✕
                  </div>
                </div>
                <div className="bucket-cart-price">• 가격 : {menu.orderMenuPrice}원</div>
                {menu.orderMenuSubDtoList.map((option, id) => (
                  <div key={`option-${index}-${menuIndex}-${id}`}>
                    <div className="bucket-cart-option">• 옵션 추가 선택 : {option.orderMenuSubName} ({option.orderMenuSubPrice}원)</div>
                  </div>
                ))}
                <div className="bucket-cart-pricesum-option-div">
                  <div className="bucket-cart-priceSum">{menu.totalprice}원</div>
                  <div className="bucket-cart-option-change">
                    <button onClick={() => decreaseQuantity(index, menuIndex)}>-</button>
                    <span>{menu.orderMenuCount}</span>
                    <button onClick={() => increaseQuantity(index, menuIndex)}>+</button>
                  </div>
                </div>


              </div>
            ))}
          </div>
        ))}



        <div className="bucket-bottom-div">
          <TouchableOpacity onPress={handleConfirmMore}>
            <Text style={{ fontSize: 'large', fontWeight: '700' }}>+ 더 담으러 가기</Text>
          </TouchableOpacity>
          <div className="bucket-check-cart">
            <hr></hr>
            <div>
              <div>총 주문금액</div>
              <div>{totalPrice}원</div>
            </div>
            <div>
              <div>배달팁</div>
              <div>{informations.rdTip}원</div>
            </div>
            <hr></hr>
            <div>
              <div>결제예정금액</div>
              <div>{Number(totalPrice) + Number(informations.rdTip)}원</div>
            </div>
          </div>
          <div onClick={() => handleOrder()} className='bucket-cart'>
            <div>{cartInformation[0].orderMenuRequestDtoList.length}</div>

            <div>배달 주문하기</div>
            <div className='priceSum'>{Number(totalPrice) + Number(informations.rdTip)}원</div>
          </div>
        </div>
        <Modal visible={isModalOpen} animationType="fade" transparent>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
            <Text style={{ textAlign: 'center', paddingBottom: 15 }}>로그인이 필요한 서비스입니다.</Text>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={{ backgroundColor: '#8DC6DA', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 }} onPress={handleConfirm}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#8DC6DA', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 }} onPress={handleCancel}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={priceModalOpen} animationType="fade" transparent>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
            <Text style={{ textAlign: 'center', paddingBottom: 15 }}>{totalPrice < informations.restaurantMinPrice ? `최소주문금액은 ${informations.restaurantMinPrice}원입니다.` : '로그인이 필요한 서비스입니다.'}</Text>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={{ backgroundColor: '#8DC6DA', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 }} onPress={handleConfirmMore}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>더 담으러 가기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#8DC6DA', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 }} onPress={ handleCancelmMore }>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </div>
    );
  }
};
export default Bucket;