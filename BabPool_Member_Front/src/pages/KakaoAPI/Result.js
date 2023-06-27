import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Button } from 'react-native';
import axios from "axios";
import Context from '../../AuthStore/Member-auth-context';

const Result = ({ navigation }) => {
    const [payment, setPayment] = useState();
    const payment2 = JSON.parse(sessionStorage.getItem('payment'));
    const cart = JSON.parse(localStorage.getItem('recentCart'));
    const order = JSON.parse(sessionStorage.getItem("newOrder"));
    const ctx = useContext(Context);
    const [check, setCheck] = useState(true);
    const token = localStorage.getItem("token");
    const [data, setData] = useState();

    function nowToday() {
        let today = new Date();
        let year = today.getFullYear(); // 년도
        let month = (today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1);  // 월
        let date = (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());  // 날짜

        let hours = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours());
        let minutes = (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
        let seconds = (today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds());
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;

    }
    const orders = {
        memberId: ctx.userObj.memberId,
    };
    const detail = {
        restaurantId: cart[0].restaurantId,
        orderDetailsPrice: order.price,
        orderDetailsComment: order.requestOwner,
        orderDetailsRiderComment: order.requestRider,
        orderDetailsTip: order.tip,
        orderDetailsAddress: order.address,
        orderDetailsTID: sessionStorage.getItem('tid'),
        orderDetailsOID: payment2.partner_order_id,
        orderDetailsStatus: "new",
        orderDetailsDate: nowToday(),
        orderDetailsCoupon: order.coupon,
        orderDetailsPoint: order.point,
        orderDetailsExtrareQuireMent: order.request.slice(0, 2).join('@'),
    };
    const RestaurantNewOrderDto = {
        ordersDto: orders,
        orderDetailsDto: detail,
        couponId: order.couponId,
        orderMenuRequestDtoList: [],
    };

    console.log(detail);
    for (let i = 0; i < cart[0].orderMenuRequestDtoList.length; i++) {
        const orderMenuRequestDto = {
            orderMenuPrice: cart[0].orderMenuRequestDtoList[i].orderMenuPrice,
            orderMenuCount: cart[0].orderMenuRequestDtoList[i].orderMenuCount,
            menuId: cart[0].orderMenuRequestDtoList[i].menuId,
            orderMenuSubDtoList: [],
        };

        for (let j = 0; j < cart[0].orderMenuRequestDtoList[i].orderMenuSubDtoList.length; j++) {
            const orderMenuSubDto = {
                orderMenuSubName: cart[0].orderMenuRequestDtoList[i].orderMenuSubDtoList[j].orderMenuSubName,
                orderMenuSubPrice: cart[0].orderMenuRequestDtoList[i].orderMenuSubDtoList[j].orderMenuSubPrice,
                menuOptionId: cart[0].orderMenuRequestDtoList[i].orderMenuSubDtoList[j].menuOptionId,
            };

            orderMenuRequestDto.orderMenuSubDtoList.push(orderMenuSubDto);
        }

        RestaurantNewOrderDto.orderMenuRequestDtoList.push(orderMenuRequestDto);
    }
    console.log(RestaurantNewOrderDto);
    const kakaoApproveRequest = {
        pg_token: window.location.search.split('=')[1],
        tid: sessionStorage.getItem('tid'),
        partner_order_id: payment2.partner_order_id,
        partner_user_id: payment2.partner_user_id,
        total_amount: payment2.total_amount
    }
    useEffect(() => {
        if (check) {
            const fetchInfo = async () => {
                try {
                    const response = await axios.post(
                        `${process.env.REACT_APP_API_ROOT}/api/v1/payment/member/success`,
                        kakaoApproveRequest, {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                    );
                    setPayment(response.data);
                    setCheck(false);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchInfo();
        }
        else {
            const pay = async () => {
                try {
                    const response = await axios.post(
                        `${process.env.REACT_APP_API_ROOT}/api/v1/order/newOrder`,
                        RestaurantNewOrderDto, {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                    )
                    setData(response);
                } catch (error) {
                    console.error(error);
                }
            };
            pay();
        }
    }, [check]);
    const memberId = ctx.userObj.memberId
    const restaurantId = cart[0].restaurantId
    const [informations, setInformations] = useState([]);
    useEffect(() => {
        const fetchinfor = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ROOT}/api/v1/member/restaurant/information?restaurantId=${restaurantId}&&memberId=${memberId}`);
            setInformations(response.data.data);

        };
        fetchinfor();
    }, [memberId, restaurantId]);

    const [modalOpen, setModalOpen] = useState(true);

    const closeModal = () => {
        setModalOpen(false);
        setTimeout(() => {
            sessionStorage.removeItem('newOrder');
            sessionStorage.removeItem('payment');
            localStorage.removeItem('recentCart');
            window.location.href = `${process.env.REACT_APP_HOME_URL}`;
        }, 500);
    };
    const couponDiscount = order.coupon != null ? Number(order.coupon) : 0;
    const pointDiscount = order.point != null ? Number(order.point) : 0;
    const total = (Number(order.tip) + Number(order.price)) - (couponDiscount !== 0 ? couponDiscount : 0) - (pointDiscount !== 0 ? pointDiscount : 0);
    return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100vh' }}>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '85%', maxHeight: '100%', height: '100vh' }}>
                <div className='receipt-top'>영수증</div>
                <div className='receipt-restaurantname'>{informations.restaurantName}</div>
                <div className='receipt-date-string'>주문날짜시간</div>
                <div className='receipt-date-day'>{RestaurantNewOrderDto.orderDetailsDto.orderDetailsDate}</div>
                {cart && cart[0].orderMenuRequestDtoList &&
                    cart[0].orderMenuRequestDtoList.map((menu) => (
                        <div key={menu.orderMenuId}>
                            <div className='receipt-menu'>
                                <div>{menu.name}</div>
                                <div>
                                    {Number(menu.orderMenuPrice) +
                                        menu.orderMenuSubDtoList.reduce((total, subMenu) => total + Number(subMenu.orderMenuSubPrice), 0)}
                                    원
                                </div>
                            </div>
                            <div className='receipt-option'>
                                {menu.orderMenuSubDtoList.map((subMenu) => (
                                    <div key={subMenu.menuOptionId}>
                                        <div>{subMenu.orderMenuSubName}({subMenu.orderMenuSubPrice}원)　</div>
                                    </div>
                                ))}
                            </div>
                            <div className='receipt-amount'>수량 : {menu.orderMenuCount}</div>
                        </div>
                    ))}
                <div className='receipt-pay'>
                    <div className='recept-pay-items'>
                        <div>주문금액</div>
                        <div>{order.price}원</div>
                    </div>
                    <div className='recept-pay-items'>
                        <div>배달팁</div>
                        <div>{order.tip}원</div>
                    </div>
                    <div className='recept-pay-items'>
                        <div>쿠폰 할인금액</div>
                        {order.coupon != null ? <div>{order.coupon}원</div> : <div>0 원</div>}
                    </div>
                    <div className='recept-pay-items'>
                        <div>포인트 할인금액</div>
                        {order.point != null ? <div>{order.point}원</div> : <div> P</div>}
                    </div>
                    <div className='recept-pay-total'>
                        <div>총 결제금액</div>
                        <div>

                            {total}원
                        </div>
                    </div>
                </div>
                <div className='receipt-request'>
                    <div className='receipt-request-items'>
                        <div>* 배달주소</div>
                        <div>{order.address}</div>
                    </div>
                    {order.request && order.request.length > 0 && (
                        <div className='receipt-request-items'>
                            <div>* 선택 요청사항</div>
                            {order.request.map((item, i) => (
                                <div key={i}>{item}</div>
                            ))}
                        </div>
                    )}
                    {order.requestOwner && (
                        <div className='receipt-request-items'>
                            <div>* 사장님께</div>
                            <div>{order.requestOwner}</div>
                        </div>)}
                    {order.requestRider && (
                        <div className='receipt-request-items'>
                            <div>* 라이더님께</div>
                            <div>{order.requestRider}</div>
                        </div>)}
                </div>
                <div className='order-status'></div>
                <Button onPress={closeModal} title="닫기" />
            </View>
        </View>
    );
}

export default Result;