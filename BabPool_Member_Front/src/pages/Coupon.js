import '../css/Coupon.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function CouponScreen({ navigation }) {
  const [coupons, setCoupons] = useState([]);
  const route = useRoute();
  const { item } = route.params;
  const token = localStorage.token;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/api/v1/coupon?memberId=${item}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setCoupons(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [item]);


  return (
    <div className='coupon-body'>
      {coupons.length > 0 ? (
        <div className='coupon-number'>
          <div>내가 보유한 쿠폰 {coupons.length}</div>
        </div>
      ) : (
        <div className='coupon-number'>
          <div>보유한 쿠폰이 없습니다.</div>
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
                <div onClick={() => navigation.navigate('Restaurant', { restaurantId: coupon.restaurantId })}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>


              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
