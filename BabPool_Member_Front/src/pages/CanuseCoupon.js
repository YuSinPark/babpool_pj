
import '../css/Coupon.css';
import React, { useState, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Mypage from './Mypage';
import { createTokenHeader } from '../AuthStore/Member-auth-action';
export default function CanUseCouponScreen({ navigation }) {
  const [coupons, setCoupons] = useState([]);
  const route = useRoute();
  const memberId = route.params.memberId;
  const restaurantId = route.params.restaurantId;
  const price = route.params.price;
  const deliveryTip = route.params.deliveryTip;
  const token = localStorage.token;
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [selectedCouponPrice, setSelectedCouponPrice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCouponSelect = (couponId, couponPrice) => {
    setSelectedCouponId(couponId);
    setSelectedCouponPrice(couponPrice);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigation.navigate('OrderDetail', {
      selectedCouponId: selectedCouponId,
      selectedCouponPrice: selectedCouponPrice,
      price: price,
      deliveryTip: deliveryTip
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false); // 모달 창을 닫습니다.
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/api/v1/coupon/canuse?memberId=${memberId}&restaurantId=${restaurantId}&price=${price}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setCoupons(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [memberId, restaurantId, price]);

  return (
    <div className='coupon-body'>
      {coupons.length > 0 ? (
        <div className='coupon-number'>
          <div>적용 가능 쿠폰{coupons.length}</div>
        </div>
      ) : (
        <div className='coupon-number'>
          <div>적용 가능 쿠폰이 없습니다.</div>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            {coupons.map((coupon, index) => (
              <td key={index} className='coupon-item'>
                <div className='coupon-item-div'>
                  <div className='coupon-item-text'>
                    <div className='coupon-item-text2'>
                      <div className='coupon-item-text-name'>{coupon.couponPrice}원 할인</div>
                    </div>
                    <div className='coupon-item-text2'>
                      <div>{coupon.couponName}</div>
                    </div>
                    <div className='coupon-item-text2'>{coupon.couponContent}</div>
                    <div className='coupon-item-text2'>{coupon.couponMinOrderPrice}원 이상 주문시</div>
                    <div className='coupon-item-expire'>{coupon.couponExpire}까지</div>
                  </div>
                </div>
                <div onClick={() => handleCouponSelect(coupon.couponId, coupon.couponPrice)}>
                  ✔︎
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Modal visible={isModalOpen} animationType="fade" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
            <Text style={{ textAlign: 'center', paddingBottom: 15 }}>쿠폰을 적용하시겠습니까?</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity style={{ backgroundColor: '#8DC6DA', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 }} onPress={handleConfirm}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#8DC6DA', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 }} onPress={handleCancel}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </div>
  );
}

const CanUseCouponStack = createStackNavigator();

function CanUseCoupon() {
  return (
    <CanUseCouponStack.Navigator>

      <CanUseCouponStack.Screen
        name="CanUseCoupon"
        component={CanUseCouponScreen}
        options={{ headerShown: true }}
      />
      <CanUseCouponStack.Screen
        name="Mypage"
        component={Mypage}
        options={{ headerShown: false }}
      />
    </CanUseCouponStack.Navigator>
  );
} 