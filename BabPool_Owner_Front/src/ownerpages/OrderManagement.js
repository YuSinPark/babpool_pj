import React, { useEffect, useState } from 'react'
import OrderNavbar from '../components/NavBar/OrderNavBarElements'
import ParentContainerWrapper from '../components/Main/ParentContainerWrapper'
import SideBarElements from '../components/Sidebar/SideBarElements'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import OrderModal from '../components/Modal/OrderModal'
import { isEqual } from 'lodash'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const ContentContainerRow = styled.div`
  background-color: #ffffff;
  margin-top: 2.5rem;
  /* margin: 10px; */
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
`;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const { restaurantId } = useParams();
  const token = localStorage.getItem("token");
  const status = "new";
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [responseStatus, setResponseStatus] = useState("🔴");
  const closeModal = () => {
    setOpenModalIndex(null);
  }

  useEffect(() => {
    let isMounted = true;

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

        if (response.status === 200) {
          setResponseStatus("🟢")
        } else {
          setResponseStatus("🔴")
        }
        const data = response.data.data;

        const newOrders = data.map(orderData => {
          const orderDetailsResponseDto = orderData.orderDetailsResponseDto;
          const orderMenuResponseDtoList = orderData.orderMenuResponseDtoList;

          return {
            orderDetailsResponseDto: orderDetailsResponseDto,
            orderMenuResponseDtoList: orderMenuResponseDtoList
          };
        });


        const isOrdersChanged = !isEqual(orders, newOrders);

        if (isMounted && isOrdersChanged) {
          setOrders(newOrders);
        }

      } catch (error) {
        setResponseStatus("🔴");
      }
    };

    const intervalId = setInterval(fetchOrders, 10000);

    fetchOrders();

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);


  function handleAcceptOrder(ordersId, orderDetailsPT) {
    console.log(ordersId);
    axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantId}/changeStatus`, {
      ordersId: ordersId,
      orderDetailsStatus: "cooking",
      orderDetailsPT: orderDetailsPT
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        window.location.reload();
        console.log('주문 접수 완료');
      })
      .catch(error => {
        console.error('주문 접수 오류:', error);
      });
  }
  const handleRefund = (order) => {
    const tid = order.orderDetailsResponseDto.orderDetailsTID;
    const amount = (Number(order.orderDetailsResponseDto.orderDetailsPrice) + Number(order.orderDetailsResponseDto.orderDetailsTip)) - (order.orderDetailsResponseDto.orderDetailsCoupon != null && (Number(order.orderDetailsResponseDto.orderDetailsCoupon)));
    const ordersId = order.orderDetailsResponseDto.ordersId;
    axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/payment/owner/cancel?tid=${tid}&amount=${amount}&ordersId=${ordersId}`,
      { headers: { Authorization: `Bearer ${token}` } })
  }
  function handleCancelOrder(order) {
    confirmAlert({
      title: '주문 취소',
      message: '주문을 취소하시겠습니까?',
      buttons: [
        {
          label: '예',
          onClick: () => {
            axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantId}/changeStatus`, {
              ordersId: order.orderDetailsResponseDto.ordersId,
              orderDetailsStatus: "cancel"
            }, {
              headers: { Authorization: `Bearer ${token}` }
            })
              .then(() => {
                handleRefund(order);
                window.location.reload();
              })
              .catch((error) => {
                console.log("오류 발생");
              })
          }
        },
        {
          label: '아니오',
        }
      ]
    });
  }



  return (
    <div>
      <div className='side-bar'>
        <SideBarElements />
      </div>
      <ParentContainerWrapper>
        {openModalIndex !== null && (
          <OrderModal
            orderId={orders[openModalIndex].orderDetailsResponseDto.ordersId}
            handleAcceptOrder={handleAcceptOrder}
            closeModal={closeModal}
          />
        )}
        <div className="order-nav-bar">
          <OrderNavbar />
        </div>
        <div style={{ marginTop: '10px' }}>
          주문 상태 : {responseStatus}
        </div>
        {orders.length === 0 ? (
          <ContentContainerRow style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            신규 주문이 없습니다.
          </ContentContainerRow>
        ) : (
          orders.map((order, index) => (
            <ContentContainerRow key={index}>
              <div style={{ flexBasis: '20%', display: 'flex', alignItems: 'center', fontWeight: 'bold', alignContent: 'center' }}>
                <h1>{order.orderDetailsResponseDto.orderDetailsDate.substring(11, 16)}</h1>
              </div>
              <div style={{ flexBasis: '60%' }}>
                <div style={{ display: 'flex' }}>
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
                      {menu.menuName} <span style={{ color: 'gray', marginLeft: '15px' }}>{menu.orderMenuCount}개</span>
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
              <div style={{ gap: '20px' }}>
                <Button
                  style={{ marginBottom: '10px' }}
                  onClick={() => setOpenModalIndex(index)}
                >
                  접수하기
                </Button>
                <br />
                <Button
                  className='btn btn-danger'
                  style={{ marginBottom: '10px' }}
                  onClick={() => handleCancelOrder(order)}
                >
                  취소하기
                </Button>
              </div>
            </ContentContainerRow>
          ))
        )}
      </ParentContainerWrapper>
    </div>
  );
}

export default OrderManagement