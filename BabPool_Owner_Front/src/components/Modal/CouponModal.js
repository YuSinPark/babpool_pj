import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert';

function CouponModal(props) {
    const token = localStorage.getItem("token")
    const {showModal, handleCloseModal, selectedMemberId, restaurantId, restaurantName} = props;
    const [coupon, setCoupon] = useState({
        memberId : selectedMemberId,
        couponName : `${restaurantName} 단골 쿠폰`,
        couponContent : '',
        couponPrice : '',
        couponMinOrderPrice : '',
        couponExpire : '',
        restaurantId : restaurantId
    });

    const handleIssuedCoupon = () => {
        handleCloseModal();
        confirmAlert({
          title: '쿠폰 발행',
          message: '단골쿠폰을 발급하시겠습니까?',
          buttons: [
            {
              label: '예',
              onClick: () => {
                axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/review/owner/${restaurantId}/newCoupon`,
                    coupon
                 ,{
                  headers: {Authorization: `Bearer ${token}`}
                })
                .then(response => {
                  window.location.reload();
                })
                .catch(error => {
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
    <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
            <Modal.Title>단골 쿠폰</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
            <label>쿠폰 이름:</label>
            <input type="text" value={`${restaurantName} 단골 쿠폰`} readOnly onChange={(e) => setCoupon({ ...coupon, couponName: e.target.value })} />
        </div>
        <div>
            <label>쿠폰 가격:</label>
            <input type="text" value={coupon.couponPrice} onChange={(e) => setCoupon({ ...coupon, couponPrice: e.target.value })} />
        </div>
        <div>
            <label>유효 기간:</label>
            <select value={coupon.couponExpire} onChange={(e) => setCoupon({ ...coupon, couponExpire: e.target.value })}>
                <option value="기간을 선택해주세요">유효기간 선택</option>
                <option value="7">7일</option>
                <option value="14">14일</option>
                <option value="30">30일</option>
            </select>
        </div>
        <div>
            <label>쿠폰 내용:</label>
            <textarea value={coupon.couponContent} onChange={(e) => setCoupon({ ...coupon, couponContent: e.target.value })} />
        </div>
        <div>
            <label>쿠폰 사용 최소 금액:</label>
            <input type="text" value={coupon.couponMinOrderPrice} onChange={(e) => setCoupon({ ...coupon, couponMinOrderPrice: e.target.value })} />
        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleCloseModal}>닫기</Button>
            <Button onClick={handleIssuedCoupon}>발행</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CouponModal