import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthStore/Member-auth-context';
import Restaurant from './Restaurant/restaurant';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Modal, TouchableOpacity, Button, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import '../../src/css/OrderList.css';
import WriteReviewScreen from './WriteReview';
import { useIsFocused } from '@react-navigation/native';

function OrderListScreen({ navigation }) {

  const isFocused = useIsFocused();

  const [Orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [index, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // To control the modal visibility
  const [responseData, setResponseData] = useState(null); // To store the response data
  const route = useRoute();
  const token = localStorage.getItem("token");
  const authCtx = useContext(AuthContext);
  const memberId = authCtx.userObj.memberId;


  useEffect(() => {
    if (isFocused) {
      getOrders();
    }
  }, [isFocused]);

   
  const getOrders = () => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/api/v1/member/orderlist/all?memberId=${memberId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setOrders(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token === null) {
      return;
    }

    getOrders();

  }, [token]);

  // Function to handle opening the modal and setting the selected order ID
  const openModal = (orderId, index) => {
    setSelectedOrderId(orderId);
    setSelectedIndex(index)
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedOrderId(null);
    setModalOpen(false);
  };
  const isReviewable = (orderDate, ordersReview, orderDetailsStatus) => {
    const currentDate = new Date();
    const orderDateTime = new Date(orderDate);
    const diffInDays = Math.floor((currentDate - orderDateTime) / (1000 * 3600 * 24));

    return diffInDays < 7 && ordersReview == false && orderDetailsStatus == 'complete'
  };
  useEffect(() => {
    if (token === null || selectedOrderId === null) {
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/api/v1/member/orderlist/detail?memberId=${memberId}&ordersId=${selectedOrderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        const responseData = response.data;
        setResponseData(responseData);
      })
      .catch(error => {
        console.log(error);
      });
  }, [token, selectedOrderId, navigation]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <div className='order-body'>
        {Orders.length > 0 ? (
          <div className='order-number'>
            <div>내 주문 내역 {Orders.length}건</div>
          </div>
        ) : (
          <div className='order-number'>
            <div>첫 주문을 기다리고 있어요!</div>
          </div>
        )}
        <table className='order-table' style={{ display: 'flex', flexDirection: 'column' }}>

          <tbody>
            <tr>
              {Orders.map((order, index) => (
                <td
                  onClick={() => navigation.navigate('Restaurant', { restaurantId: order.restaurantId })}
                  key={index}
                  className='order-table-item orderlist-item'
                  style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}
                >
                  <div className='orderlist-name'>{order.restaurantName}</div>
                  <div className='orderlist-date'>{order.orderDetailsDate}</div>
                  <div className='orderlist-status'>주문상태 : {order.orderDetailsStatus}</div>
                  <div className='orderlist-total'>
                    <div>합계 : </div>
                    <div>{(Number(order.orderDetailsPrice) + Number(order.orderDetailsTip)) - Number(order.orderDetailsCoupon) - Number(order.orderDetailsPoint)}원</div>
                  </div>
                  <Button onPress={() => openModal(order.ordersId, index)} title="상세 영수증 보기" />
                  <div className='orderlist-review-btn'>
                    {isReviewable(order.orderDetailsDate, order.ordersReview, order.orderDetailsStatus) && (
                      <Button onPress={() => navigation.navigate('WriteReview', { restaurantId: order.restaurantId, restaurantName: order.restaurantName, date: order.orderDetailsDate, orderId: order.ordersId, index: index })} title="리뷰 쓰기" />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <Modal visible={modalOpen}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '100%' }}>
                <div className='receipt-top'>영수증</div>
                {Orders.length > 0 && index !== null && (
                  <>
                    <div className='receipt-restaurantname'>{Orders[index].restaurantName}</div>
                    <div className='receipt-date'>{Orders[index].orderDetailsDate}</div>
                  </>
                )}
                {responseData &&
                  responseData.data.map((menu) => (
                    <div key={menu.orderMenuId}>
                      <div className='receipt-menu'>
                        <div>{menu.menuName}</div>
                        <div>{Number(menu.orderMenuPrice) + Number(menu.orderMenuSubPrice)}원</div>
                      </div>
                      <div className='receipt-option'>
                        <div>{menu.orderMenuSubName}</div>
                        {menu.orderMenuSubPrice && <div>({menu.orderMenuSubPrice}원)</div>}
                      </div>
                      <div className='receipt-amount'>수량 : {menu.orderMenuCount}</div>
                    </div>
                  ))}
                {Orders.length > 0 && index !== null && (
                  <div className='receipt-pay'>
                    <div className='recept-pay-items'>
                      <div>주문금액</div>
                      <div>{Orders[index].orderDetailsPrice}원</div>
                    </div>
                    <div className='recept-pay-items'>
                      <div>배달팁</div>
                      <div>{Orders[index].orderDetailsTip}원</div>
                    </div>
                    <div className='recept-pay-items'>
                      <div>쿠폰 할인금액</div>
                      <div>{Orders[index]?.orderDetailsCoupon || 0}원</div>
                    </div>
                    <div className='recept-pay-items'>
                      <div>포인트 적용금액</div>
                      <div>{Orders[index]?.orderDetailsPoint || 0}P</div>
                    </div>
                    <div className='recept-pay-total'>
                      <div>총 결제금액</div>
                      <div>
                        {((Number(Orders[index].orderDetailsPrice) +
                          Number(Orders[index].orderDetailsTip)) -
                          Number(Orders[index].orderDetailsCoupon) - Number(Orders[index].orderDetailsPoint))}
                        원
                      </div>
                    </div>
                  </div>
                )}
                {Orders.length > 0 && index !== null && (
                  <div className='receipt-request'>
                    <div className='receipt-request-items'>
                      <div>* 배달주소</div>
                      <div>{Orders[index].orderDetailsAddress}</div>
                    </div>
                    <div className='receipt-request-items'>
                      <div>* 선택 요청사항</div>
                      <div>{Orders[index].orderDetailsRequest}</div>
                    </div>
                    <div className='receipt-request-items'>
                      <div>* 사장님께</div>
                      <div>{Orders[index].orderDetailsComment}</div>
                    </div>
                    <div className='receipt-request-items'>
                      <div>* 라이더님께</div>
                      <div>{Orders[index].orderDetailsRiderComment}</div>
                    </div>
                  </div>
                )}
                {Orders.length > 0 && index !== null && (
                  <div className='order-status'>{Orders[index].orderDetailsStatus}</div>
                )}
                <Button onPress={closeModal} title="닫기" />
              </View>
            </View>
          </ScrollView>
        </Modal>
      </div>
    </ScrollView>
  );
}


const Stack = createStackNavigator();

function OrderList() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="OrderList"
          component={OrderListScreen}
        />
        <Stack.Screen
          name="WriteReview"
          component={WriteReviewScreen} // 여기에 SearchResult 컴포넌트를 등록합니다.
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default OrderList;

