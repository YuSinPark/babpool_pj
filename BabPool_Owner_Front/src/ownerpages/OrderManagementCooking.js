import React, { useEffect, useState } from 'react'
import OrderNavbar from '../components/NavBar/OrderNavBarElements'
import ParentContainerWrapper from '../components/Main/ParentContainerWrapper'
import SideBarElements from '../components/Sidebar/SideBarElements'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'


const ContentContainerRow = styled.div`
  background-color: #ffffff;
  margin-top: 2.5rem;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
`;

function calculateRemainingTime(order) {
  const orderTime = order.orderDetailsResponseDto.orderDetailsDate.substring(11, 16); // 주문 시간 (시:분)
  const orderPT = order.orderDetailsResponseDto.orderDetailsPT; // 주문 처리 시간 (분)

  // 현재 시간
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // 주문 시간 (분 단위로 변환)
  const orderHours = parseInt(orderTime.split(':')[0]);
  const orderMinutes = parseInt(orderTime.split(':')[1]);
  const orderTotalMinutes = orderHours * 60 + orderMinutes;

  // 주문 처리 시간 (분 단위)
  const orderPTMinutes = parseInt(orderPT);

  // 주문까지 남은 시간 계산 (분 단위)
  const remainingTime = orderTotalMinutes + Math.abs(orderPTMinutes) - (currentHours * 60 + currentMinutes);

  if (remainingTime <= 0) {
    return <span style={{ color: 'red' }}>{Math.abs(remainingTime)} 분 초과</span>; 
  } else {
    return <span style= {{ color : 'blue' }}>{remainingTime} 분 남음</span>;
  }
}

const OrderManagementCooking = () => {
    const [orders, setOrders] = useState([]);
    const { restaurantId } = useParams();
    const token = localStorage.getItem("token");
    const status = "cooking";
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);

      return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantId}/newOrder?status=${status}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = response.data.data;

            const newOrders = data.map(orderData => {
              const orderDetailsResponseDto = orderData.orderDetailsResponseDto;
              const orderMenuResponseDtoList = orderData.orderMenuResponseDtoList;
      
              return {
                orderDetailsResponseDto: orderDetailsResponseDto,
                orderMenuResponseDtoList: orderMenuResponseDtoList
              };
            });
      
            setOrders(prevOrders => [...prevOrders, ...newOrders]);

          } catch (error) {
            console.error('주문 정보를 가져오는 중에 오류 발생', error);
          }
        };
      
        fetchOrders();
      }, []);

      function handleAcceptOrder(ordersId) {
        console.log(ordersId);
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantId}/changeStatus`, { 
          ordersId : ordersId,
          orderDetailsStatus : "cooked"
        }, {
          headers: {Authorization: `Bearer ${token}`}
        })
          .then(response => {
            window.location.reload();
          })
          .catch(error => {
            console.error('주문 접수 오류:', error);
          });
      }

    return (
        <div>
          <div className='side-bar'>
            <SideBarElements />
          </div>
          <ParentContainerWrapper>
            <div className="order-nav-bar">
              <OrderNavbar />
            </div>
            {orders.length === 0 ? (
              <ContentContainerRow style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                조리중인 주문이 없습니다.
              </ContentContainerRow>
            ) : (
              orders.map((order, index) => (
              <ContentContainerRow key={index}>
                <div style={{ flexBasis: '20%', display: 'flex', alignItems: 'center', fontWeight: 'bold', alignContent: 'center' }}>
                  <h1>{order.orderDetailsResponseDto.orderDetailsDate.substring(11, 16)}</h1>
                </div>
                <div style={{ flexBasis: '60%'}}>
                  <div style={{ display: 'flex'}}>
                    <h2>주문 번호 : {order.orderDetailsResponseDto.ordersId}</h2>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <p style={{ display: 'flex', alignItems: 'center', marginRight: '10px', fontWeight: 'bold' }}>
                      [메뉴 {order.orderDetailsResponseDto.orderDetailsCount}개]
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', marginLeft: '0px', fontWeight: 'bold' }}>
                      {order.orderDetailsResponseDto.orderDetailsPrice}원
                    </p>
                  </div>
                  {order.orderMenuResponseDtoList.map((menu, menuIndex) => (
                    <div key={menuIndex}>
                      <p style={{ fontWeight: 'bold', marginTop: '-10px' }}>
                        {menu.menuName} <span style={{color:'gray', marginLeft: '15px'}}>{menu.orderMenuCount}개</span>
                      </p>                     
                      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px' }}>
                        {menu.orderMenuSubDtoList.map((subMenu, subMenuIndex) => (
                          <p key={subMenuIndex} style={{ marginRight: '10px' }}>
                            {subMenu.orderMenuSubName}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    {order.orderDetailsResponseDto.orderDetailsAddress}
                  </div>
                  <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    사장님 요청사항 : {order.orderDetailsResponseDto.orderDetailsComment}
                  </div>
                  <div style={{ fontWeight: 'bold' }}>
                    라이더 요청사항 : {order.orderDetailsResponseDto.orderDetailsRiderComment}
                  </div>
                </div>
                <div style={{ gap: '20px'}}>
                  <Button
                  style={{ marginBottom: '10px'}}
                  onClick={() => handleAcceptOrder(order.orderDetailsResponseDto.ordersId)}
                  >
                    조리완료
                  </Button>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center'}}>
                    <div style={{fontSize: '20px',fontWeight: 'bold', justifyContent: 'center'}}>
                      {calculateRemainingTime(order, currentTime)}
                    </div>
                  </div>
                </div>
              </ContentContainerRow>
              ))
            )}
          </ParentContainerWrapper>
        </div>
      );
}

export default OrderManagementCooking