import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import '../css/Mypage.css';
import React, { useContext } from "react";

import AuthContext from "../AuthStore/Member-auth-context";

export default function MypageScreen({ navigation }) {

  const authCtx = useContext(AuthContext);
  const nickname = authCtx.userObj.memberNickname;
  let isLogin = authCtx.isLoggedIn;
  const memberId = authCtx.userObj.memberId;

  const handleCouponClick = () => {
    if (!localStorage.getItem('token')) {
      navigation.navigate('Login'); // 토큰이 없을 경우 로그인 페이지로 이동
    } else {
      navigation.navigate('Coupon', { item: memberId });
    }
  };

  const handleLikeClick = () => {
    if (!localStorage.getItem('token')) {
      navigation.navigate('Login'); // 토큰이 없을 경우 로그인 페이지로 이동
    } else {
      navigation.navigate('Like', { item: memberId });
    }
  };

  const handleOrderListClick = () => {
    if (!localStorage.getItem('token')) {
      navigation.navigate('Login'); // 토큰이 없을 경우 로그인 페이지로 이동
    } else {
      navigation.navigate('OrderList');
    }
  };

  const handleReviewClick = () => {
    if (!localStorage.getItem('token')) {
      navigation.navigate('Login'); // 토큰이 없을 경우 로그인 페이지로 이동
    } else {
      navigation.navigate('Review', { item: memberId });
    }
  };
  
  return (
    <div className="mypage-body">
      <div>
        {isLogin ? (
          <>
            <div onClick={() => navigation.navigate('MyInfo')} className="mypage-nickname">
              <div>{nickname}님</div>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </>
        ) : (
          <>
            <div onClick={() => navigation.navigate('Login')} className="mypage-login">
              <div>로그인해주세요</div>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </>
        )}
      </div>
      <div className="mypage-function-div">
        <div>
          💳
          <div onClick={() => handleCouponClick()}>쿠폰함</div>
        </div>
        <div>
          ❤️
          <div onClick={() =>handleLikeClick() }>찜</div>
        </div>
        <div>
          📋
          <div onClick={() => handleOrderListClick() }>주문내역</div>
        </div>
        <div>
          💬
          <div onClick={() => handleReviewClick() }>리뷰관리</div>
        </div>
      </div>
      <div className="mypage-bottom-div">
        <div className="mypage-bottom-item">
          <div>공지사항</div>
          <div>‣</div>
        </div>
        <div className="mypage-bottom-item">
          <div>이벤트</div>
          <div>‣</div>
        </div>
        <div className="mypage-bottom-item">
          <div>고객센터</div>
          <div>‣</div>
        </div>
        <div className="mypage-bottom-item">
          <div>환경설정</div>
          <div>‣</div>
        </div>
        <div className="mypage-bottom-item">
          <div>약관 및 정책</div>
          <div>‣</div>
        </div>
        <div className="mypage-bottom-item">
          <div>현재 버전 0.0.1</div>
        </div>
      </div>   
    </div>
  );
}