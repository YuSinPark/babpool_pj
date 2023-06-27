import '../css/OrderDetail.css';
import CanuseCouponScreen from './CanuseCoupon';
import { View, TouchableOpacity, Text } from 'react-native';
import React, { useContext, useState, useEffect, useCallback } from "react";
import AuthContext from "../AuthStore/Member-auth-context";
import { useRoute } from '@react-navigation/native';
import Context from "../AuthStore/Member-auth-context";
import axios from 'axios';
import uuid from 'react-uuid';


const OrderDetail = ({ navigation }) => {
  const route = useRoute();
  const couponId = route.params?.selectedCouponId;
  const couponPrice = route.params?.selectedCouponPrice;

  const authCtx = useContext(AuthContext);
  const [address, setAddresses] = useState([]);
  const [isChecked, setIsChecked] = useState([false]);
  const [coupons, setCoupons] = useState([]);
  const [newOrder, setNewOrder] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectedCouponPrice, setSelectedCouponPrice] = useState(null);
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [inputPoint, setInputPoint] = useState(0);
  const [usePoint, setUsePoint] = useState(0);
  const [showPointModal, setPointModal] = useState(false);
  const ctx = useContext(Context);
  const mem = ctx.userObj.memberId;
  const cartInformation = JSON.parse(localStorage.getItem("recentCart"));
  const price = cartInformation ? cartInformation.reduce((acc, item) => {
    const menuList = item.orderMenuRequestDtoList || [];
    const totalPrice = menuList.reduce((subtotal, menu) => subtotal + menu.totalprice, 0);
    return acc + totalPrice;
  }, 0) : 0;

  const deliveryTip = route.params.deliveryTip;
  const totalPrice = Number(price) + Number(deliveryTip);
  const memberId = authCtx.userObj.memberId;
  const memberPhone = authCtx.userObj.memberPhone;
  const restaurantId = route.params.restaurantId;
  const token = localStorage.getItem("token");
  const firstmenuname = cartInformation.length > 0 ? cartInformation[0].orderMenuRequestDtoList[0].name : '';
  const menuamount = cartInformation.reduce((total, cartItem) => total + cartItem.orderMenuRequestDtoList.length, 0);
  const amountForPay = `${firstmenuname} 외 ${menuamount - 1}개`
  const total = couponPrice ? totalPrice - couponPrice - usePoint : totalPrice - usePoint;


  const [checkedItems, setCheckedItems] = useState([]);
  const [ownerRequest, setOwnerRequest] = useState('');
  const [riderRequest, setRiderRequest] = useState('');


  const handleCheckboxChange = (value) => {
    if (checkedItems.includes(value)) {
      // 이미 배열에 있는 값인 경우, 해당 값을 배열에서 제거합니다.
      setCheckedItems((prevItems) => prevItems.filter(item => item !== value));
    } else {
      // 배열에 없는 값인 경우, 해당 값을 배열에 추가합니다.
      setCheckedItems((prevItems) => [...prevItems, value]);
    }
  };

  useEffect(() => {
  }, [checkedItems]);


  const checkpoint = () => {
    const parsedInputPoint = parseInt(inputPoint);

    if (parsedInputPoint > authCtx.userObj.memberPoint) {
      setPointModal(true);
    } else if (isNaN(parsedInputPoint)) {
      setPointModal(true);
    } else {
      setUsePoint(parsedInputPoint);
    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/coupon/canuse?memberId=${memberId}&restaurantId=${restaurantId}&price=${price}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setCoupons(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [memberId]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/api/v1/address/choose`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          memberId: memberId
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.data.length === 0) {
        setAddresses("주소설정하기 >");
      } else {
        setAddresses(result.data[0].address);
      }
    } catch (error) {
      console.error(error);
    }
  }, [memberId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  const handleAddressModalClose = () => {
    setShowAddressModal(false);
  };

  const handleAddressModalOpen = () => {
    setShowAddressModal(true);
  };

  const handleAddressClick = () => {
    if (!address) {
      handleAddressModalOpen(); // 주소 값이 없으면 모달을 표시합니다.
    }
  };



  const handlePointModalClose = () => {
    setPointModal(false);
  };

  const handlePointsModalOpen = () => {
    setPointModal(true);
  };


  useEffect(() => {
    console.log(authCtx);
    authCtx.getUser();
    fetchData();
  }, []);
  const [kakaoReadyRequest, setKakaoReadyRequest] = useState({
    partner_order_id: uuid(),
    partner_user_id: mem,
    total_amount: totalPrice,
    item_name: amountForPay,
    // item_name:"치즈피자",
    quantity: menuamount,
  });
  const payhandle = (point) => {
    if (!address || address === "주소설정하기 >") {
      setShowAddressModal(true);
      return;
    }

    if (inputPoint > authCtx.userObj.memberPoint) {
      setPointModal(true);
      return;
    }

    const orderData = {
      address: address,
      phone: memberPhone,
      request: checkedItems,
      requestOwner: ownerRequest,
      requestRider: riderRequest,
      coupon: couponPrice,
      couponId: couponId,
      point: inputPoint,
      price: price,
      tip: deliveryTip,
      total: total,
    };

    const total2 = Number(totalPrice) - (couponPrice != null && Number(couponPrice)) - (inputPoint != null && Number(inputPoint));
    const updatedKakaoReadyRequest = {
      ...kakaoReadyRequest,
      total_amount: total2,
    };
    setKakaoReadyRequest(updatedKakaoReadyRequest);
    sessionStorage.setItem("newOrder", JSON.stringify(orderData));
    navigation.navigate("KakaoPay", {
      kakaoReadyRequest: updatedKakaoReadyRequest,
    });
  };

  const AddressModal = ({ onClose }) => {
    return (
      <div className="address-modal">
        <div className="address-modal-content">
          <p>주소 등록이 필요한 서비스입니다.</p>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    );
  };

  const PointModal = ({ onClose }) => {
    return (
      <div className="address-modal">
        <div className="address-modal-content">
          <p>입력한 포인트 값이 잘못되었습니다</p>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    );
  };




  return (

    <div className="order-detail-body">

      <div>
        <form>
          {address ? (
            <div
              onClick={() =>
                navigation.navigate("Mylocation", { memberId: memberId })
              }
              className="order-detail-address"
            >
              {address}
            </div>
          ) : (
            <div onClick={handleAddressModalOpen} className="order-detail-address">
              위치정보없음
            </div>
          )}
          {showAddressModal && <AddressModal onClose={handleAddressModalClose} />}
          <div className='order-detail-phone'>
            <div>{memberPhone}</div>
          </div>
          <div className='order-detail-request'>
            <div className='order-detail-request-title'>요청사항</div>
            <div className='order-detail-request-btn'>
              <div>
                <input type="checkbox" value="item1" onChange={() => handleCheckboxChange("일회용 수저, 포크 안 주셔도 돼요!")} />
                일회용 수저, 포크 안 주셔도 돼요!
              </div>
              <div>
                <input type="checkbox" value="item2" onChange={() => handleCheckboxChange("김치 등 무료 반찬은 안 주셔도 돼요!")} />
                김치 등 무료 반찬은 안 주셔도 돼요!
              </div>
            </div>
            <div>환경을 생각하는 당신의 선택은 밥풀을 통해 취약계층에게 소정의 금액으로 기부됩니다 :)</div>
            <div className='order-detail-request-to'>
              <div className='order-detail-request-to'>가게 사장님께</div>
              <input
                className='order-detail-request-text'
                type='text'
                placeholder='예) 견과류 빼주세요, 덜 맵게 해주세요'
                value={ownerRequest}
                onChange={(e) => setOwnerRequest(e.target.value)}
              />
              <div>라이더님께</div>
              <input
                className='order-detail-request-text'
                type='text'
                placeholder='예) 문 앞에 두고 벨 눌러주세요'
                value={riderRequest}
                onChange={(e) => setRiderRequest(e.target.value)}
              />
            </div>
          </div>
          <div className='order-detail-bottom'>
            {/* <div onClick={() => navigation.navigate('CanuseCoupon', { memberId: memberId, restaurantId: 2, price: price })} className='order-detail-coupon'>
              <div>할인쿠폰</div>
              <div>{coupons.length}개 보유</div>
            </div> */}

            <div
              onClick={() =>
                navigation.navigate('CanuseCoupon', {
                  memberId: memberId,
                  restaurantId: restaurantId,
                  price: price,
                  deliveryTip: deliveryTip,
                  selectedCouponPrice: selectedCouponPrice, // selectedCouponPrice를 전달합니다
                  setSelectedCouponPrice: setSelectedCouponPrice, // setSelectedCouponPrice 함수를 전달합니다
                  setSelectedCouponId: setSelectedCouponId
                })
              }
              className='order-detail-coupon'
            >
              <div>할인쿠폰</div>
              <div>{coupons && coupons.length > 0 ? `${coupons.length}개` : "0개"}</div>
            </div>
            <hr></hr>
            <div className='order-detail-point'>
              <div>밥풀포인트</div>
              {authCtx.userObj.memberPoint ? <div>{authCtx.userObj.memberPoint} P</div> : <div>0 P</div>}

            </div>
            <div className='order-detail-point-2'>
              <input type='text' placeholder={authCtx.userObj.memberPoint} value={inputPoint}
                onChange={(e) => setInputPoint(e.target.value)}></input>
              <div onClick={checkpoint} >적용</div>
            </div>
            {showPointModal && <PointModal onClose={handlePointModalClose} />}
            <hr></hr>
            <div className='order-detail-price-title'>결제 금액</div>
            <div className='order-detail-price'>
              <div>주문금액</div>
              <div>{price}원</div>
            </div>
            <div className='order-detail-tip'>
              <div>배달팁</div>
              <div>{deliveryTip}원</div>
            </div>
            <div className='order-detail-tip'>
              <div>쿠폰 할인</div>
              {couponPrice ? <div>-{couponPrice} 원</div> : <div>0 원</div>}
            </div>
            <div className='order-detail-tip'>
              <div>포인트 적용</div>
              {usePoint ? <div>{usePoint} P</div> : <div>0 P</div>}
            </div>


            <hr></hr>
            <div className='order-detail-priceSum'>
              <div>총 결제금액</div>
              <div>{total}원</div>
            </div>

            <div onClick={() => payhandle(1, 1)} className='order-detail-pay-btn'>
              {total}원 결제하기
            </div>
            <div className='order-detail-check'>위 내용을 확인하였으며 결제에 동의합니다.</div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default OrderDetail;
