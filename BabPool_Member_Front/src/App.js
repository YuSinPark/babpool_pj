// import * as React from 'react';
import AuthContext from "./AuthStore/Member-auth-context";
import KakaoPay from './pages/KakaoAPI/KakaoPay';
import MapContainer from "./pages/KakaoAPI/MapContainer";
import Result from './pages/KakaoAPI/Result';
import Restaurant from './pages/Restaurant/restaurant';
import RestaurantOrder from "./pages/Restaurant/restaurantOrder";
import Informations from "./pages/RestaurantInformation/informations";
import MenuList from "./pages/RestaurantInformation/menu_list";
import Order from './pages/RestaurantInformation/order';
import ReviewList from "./pages/RestaurantInformation/review_list";
import Bucket from './pages/Bucket';
import CanuseCoupon from './pages/CanuseCoupon';
import ChangeNickname from './pages/ChangeNickname';
import ChangePassword from './pages/ChangePassword';
import ChangePhoneNum from './pages/ChangePhoneNum';
import Coupon from './pages/Coupon';
import Currentlocation from './pages/Currentlocation';
import FindMemberId from './pages/FindMemberId';
import Like from './pages/Like';
import Login from "./pages/Login";
import MyInfo from './pages/MyInfo';
import Mylocation from './pages/mylocation';
import Mypage from './pages/Mypage';
import OrderDetail from './pages/OrderDetail';
import OrderList from './pages/OrderList';
import PlusInfo from './pages/PlusInfo';
import ResetPassword from './pages/ResetPassword';
import Review from './pages/Review';
import Roulette from './pages/Roulette';
import Search from './pages/Search';
import SearchLocation from './pages/SearchLocation';
import SearchResult from './pages/SearchResult';
import Signup from './pages/Signup';
import Store from './pages/Store';
import WriteReview from './pages/WriteReview';
import './css/App.css';
import './css/Location.css';

import * as authAction from "./AuthStore/Member-auth-action"
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, Modal, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHome, faCartShopping, faReceipt, faUser, faMapMarkerAlt, faBell } from "@fortawesome/free-solid-svg-icons";
import { useIsFocused } from '@react-navigation/native';
import MypageNavigation from './pages/Mypage'

import png1 from './img/img1.png';
import png2 from './img/img2.png';
import png3 from './img/img3.png';
import png4 from './img/img4.png';
import png5 from './img/img5.png';
import png6 from './img/img6.png';
import png7 from './img/img7.png';
import png8 from './img/img8.png';
import png9 from './img/img9.png';
import png10 from './img/img10.png';
import png11 from './img/img11.png';
import png12 from './img/img12.png';
import png13 from './img/img13.png';
import png14 from './img/img14.png';
import png15 from './img/img15.png';
import png16 from './img/img16.png';
import png17 from './img/img17.png';
import png18 from './img/img18.png';
import png19 from './img/img19.png';
import png20 from './img/img20.png';
import logo from './img/logo.png';
import CouponScreen from "./pages/Coupon";
import OrderListScreen from "./pages/OrderList";
import WriteReviewScreen from "./pages/WriteReview";

function AppScreen({ navigation }) {
  const isFocused = useIsFocused();

  const [showSplash, setShowSplash] = useState(true);
  const [address, setAddress] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [hasAddress, setHasAddress] = useState(false);


  const route = useRoute();
  const item = route?.params?.item;
  if (window.location.pathname == "/result" && sessionStorage.getItem("tid")) {
    navigation.navigate('Result', { item: "1" });
  }
  const authCtx = useContext(AuthContext);
  const [memberId, setMemberId] = useState('');
  let isLogin = authCtx.isLoggedIn;
  let isGet = authCtx.isGetSuccess;
  const isSplashShown = sessionStorage.getItem("showSplash");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);
  const callback = useCallback((str) => {
    setMemberId(str);
  }, []);

  useEffect(() => {
    if (isLogin && isFocused) {
      authCtx.getUser();
    }
  }, [isLogin, isFocused]);

  useEffect(() => {
    if (isGet) {
      callback(authCtx.userObj.memberId);
      if (authCtx.userObj.memberNickname === "닉네임을 정해주세요!") {
        openModal();
      } else if (authCtx.userObj.memberPhone === "전화번호를 입력해주세요!") {
        openModal3();
      } else if (authCtx.userObj.memberRole === 'OWNER') {
        openModal2();
      }
    }
  }, [isGet, callback, authCtx.userObj.memberId]);

  const openModal = () => {
    setIsModalVisible(true);
  }
  const closeModal = () => {
    navigation.navigate("PlusInfo")
    setIsModalVisible(false);
  }

  const openModal2 = () => {
    setIsModalVisible2(true);
  }
  const closeModal2 = () => {
    authAction.logoutActionHandler(authCtx.userObj.memberId)
    navigation.navigate("Login")
    setIsModalVisible2(false);
  }

  const openModal3 = () => {
    setIsModalVisible3(true);
  }
  const closeModal3 = () => {
    navigation.navigate("ChangePhoneNum")
    setIsModalVisible3(false);
  }


  useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get("code")
    const path = url.pathname;
    const parts = path.split("/");
    const lastPart = parts[parts.length - 1];

    if (code) {
      if (lastPart === "naver") {
        authCtx.naverLogin(code)
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (lastPart === "kakao") {
        authCtx.kakaoLogin(code)
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

  }, [authCtx])

  const handleOrderListClick = () => {
    if (!localStorage.getItem('token')) {
      navigation.navigate('Login'); // 토큰이 없을 경우 로그인 페이지로 이동
    } else {
      navigation.navigate('OrderList');
    }
  };
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT}/api/v1/address/choose`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          memberId: authCtx.userObj.memberId
        })
      });

      if (!response.ok) {
        throw new Error('Fetch failed');
      }
      const result = await response.json();

      if (!result?.data?.length) {
        setHasAddress(false);
        setAddress(null);
        setLatitude(null);
        setLongitude(null);
        return;
      }
      setHasAddress(true);
      setAddress(result.data[0].address);
      setLatitude(result.data[0].addressLatitude);
      setLongitude(result.data[0].addressLongitude);
    } catch (error) {
      console.error(error);
    }
  }, [setHasAddress, memberId, setAddress, setLatitude, setLongitude, authCtx.userObj.memberId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, authCtx]);

  useEffect(() => {
    fetchData();
  }, [isGet]);


  useEffect(() => {

    if (isSplashShown === null || showSplash === false) {
      setTimeout(() => {
        setShowSplash(false);
      }, 2000);
      sessionStorage.setItem("showSplash", "true");
    } else {
      // setShowSplash(false);
      setShowSplash(false);
    }
  }, []);

  return (
    <>
      {showSplash ? (
        <View>
          <div className="splash-body">
            <div className="splash-title">b a b p o o l</div>
            <img src={logo} alt="" width="100" height="80" />
          </div>
        </View>
      ) : (

        <View>
          <div className="App">
            <header className="body">
              <div className="navbar">
                <div className="choose-location" onClick={() => navigation.navigate('Mylocation', { memberId: memberId, memberSetLocation: item || address })}>
                  <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {address || '위치정보없음'}</div>
                </div>

                <button id="navbar-back"><FontAwesomeIcon icon={faBell} /></button>

              </div>
              <div className="navbar-2">
                <div className='deliveryType'>
                  <div id="delivery-btn">배달</div>
                  <div id="packaging-btn">포장</div>
                </div>
                <div onClick={() => navigation.navigate('Search', { latitude, longitude })}><FontAwesomeIcon icon={faSearch} /></div>
              </div>
              <span style={{ background: "black", padding: "0.5px 100%" }}></span>
              <div className="menu">
                <div className="menu-column">

                  <div onClick={() => navigation.navigate('Store', { item: '1인분', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png1} width="25px" />
                    <p><small>1인분</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '찜탕찌개', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png3} width="25px" />
                    <p><small>찜/탕/찌개</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '족발보쌈', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png2} width="25px" />
                    <p><small>족발/보쌈</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '돈까스일식', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png4} width="25px" />
                    <p><small>돈까스/일식</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '피자', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png5} width="25px" />
                    <p><small>피자</small></p>
                  </div>
                </div>
                <div className="menu-column">
                  <div onClick={() => navigation.navigate('Store', { item: '야식', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png7} width="25px" />
                    <p><small>야식</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '양식', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png8} width="25px" />
                    <p><small>양식</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '고기구이', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png6} width="25px" />
                    <p><small>고기/구이</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '치킨', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png9} width="25px" />
                    <p><small>치킨</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '중식', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png10} width="25px" />
                    <p><small>중식</small></p>
                  </div>
                </div>
                <div className="menu-column">

                  <div onClick={() => navigation.navigate('Store', { item: '도시락', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png13} width="25px" />
                    <p><small>도시락</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '백반죽국수', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png12} width="25px" />
                    <p><small>백반/죽/국수</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '분식', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png14} width="25px" />
                    <p><small>분식</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '카페디저트', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png15} width="25px" />
                    <p><small>카페/디저트</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '아시안', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png11} width="25px" />
                    <p><small>아시안</small></p>
                  </div>
                </div>
                <div className="menu-column">
                  <div onClick={() => navigation.navigate('Store', { item: '패스트푸드', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png16} width="25px" />
                    <p><small>패스트푸드</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '반찬', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png18} width="25px" />
                    <p><small>반찬</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '채식샐러드', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png17} width="25px" />
                    <p><small>채식/샐러드</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '편의점', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png19} width="25px" />
                    <p><small>편의점</small></p>
                  </div>
                  <div onClick={() => navigation.navigate('Store', { item: '맛집랭킹', latitude, longitude })} className="menu-item">
                    <img alt=" " src={png20} width="25px" />
                    <p><small>맛집랭킹</small></p>
                  </div>
                </div>
              </div>
              <span style={{ background: "black", padding: "0.1px 100%" }}></span>

              <div className="roulette">

                <button onClick={() => navigation.navigate('Roulette')} >
                  이 메뉴 어때요?
                </button>
              </div>

              <div className='bottom-nav'>
                <div>
                  <FontAwesomeIcon icon={faHome} />
                  <div className='bottom-nav-text'>HOME</div>
                </div>
                <div onClick={() => navigation.navigate('Search', { item: '1인분', latitude, longitude })} type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                  <div className='bottom-nav-text'>밥풀검색</div>
                </div>
                <div onClick={() => navigation.navigate('Bucket', { memberId: memberId })} className="bucket">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <div className='bottom-nav-text'>밥풀카트</div>
                </div>
                <div onClick={handleOrderListClick} className="mypage">
                  <FontAwesomeIcon icon={faReceipt} />
                  <div className='bottom-nav-text'>주문내역</div>
                </div>
                <div onClick={() => navigation.navigate('Mypage')} className="mypage">
                  <FontAwesomeIcon icon={faUser} />
                  <div className='bottom-nav-text'>My밥풀</div>
                </div>
              </div>
            </header>
          </div>
          <Modal visible={isModalVisible} animationType="fade" transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                <Text style={{ textAlign: 'center', paddingBottom: 15 }}>추가 정보를 입력해주세요!</Text>
                <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                  <div className="order-alert" onClick={closeModal}>닫기</div>
                </view>
              </View>
            </View>
          </Modal>
          <Modal visible={isModalVisible2} animationType="fade" transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                <Text style={{ textAlign: 'center', paddingBottom: 15 }}>사장님이셨군요! 회원으로 로그인 부탁드립니다</Text>
                <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                  <div className="order-alert" onClick={closeModal2}>닫기</div>
                </view>
              </View>
            </View>
          </Modal>
          <Modal visible={isModalVisible3} animationType="fade" transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                <Text style={{ textAlign: 'center', paddingBottom: 15 }}>추가 정보를 입력해주세요!</Text>
                <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                  <div className="order-alert" onClick={closeModal3}>닫기</div>
                </view>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
}

const AppStack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <AppStack.Navigator >
        <AppStack.Screen options={{ headerShown: false, title: "BabPool" }} name="App" component={AppScreen} />
        <AppStack.Screen name="Mylocation" component={Mylocation} options={{ title: "내 위치 설정하기" }} />
        <AppStack.Screen name="Currentlocation" component={Currentlocation} options={{ title: "지도에서 위치 확인" }} />
        <AppStack.Screen name="SearchLocation" component={SearchLocation} options={{ title: "지도에서 위치 확인" }} />
        <AppStack.Screen name="Search" component={Search} options={{ title: "밥풀검색" }} />
        <AppStack.Screen name="SearchResult" component={SearchResult} options={{ title: "검색결과" }} />
        <AppStack.Screen name="Store" component={Store} options={{ title: "가게정보" }} />
        <AppStack.Screen name="Roulette" component={Roulette} options={{ title: '이 메뉴 어때요?' }} />
        <AppStack.Screen name="Bucket" component={Bucket} options={{ title: '밥풀카트' }} />
        <AppStack.Screen name="Mypage" component={Mypage} options={{ title: 'My밥풀' }} />
        <AppStack.Screen name="OrderDetail" component={OrderDetail} options={{ title: '주문하기' }} />
        <AppStack.Screen name="Coupon" component={Coupon} options={{ title: 'My쿠폰' }} />
        <AppStack.Screen name="CanuseCoupon" component={CanuseCoupon} options={{ title: '쿠폰적용' }} />
        <AppStack.Screen name="OrderList" component={OrderList} options={{ title: '주문내역' }} />
        <AppStack.Screen name="Restaurant" component={Restaurant} options={{ title: "가게" }} />
        <AppStack.Screen name="Result" component={Result} options={{ title: "주문확인", headerShown: false }} />
        <AppStack.Screen name="Order" component={Order} options={{ title: "주문" }} />
        <AppStack.Screen name="KakaoPay" component={KakaoPay} options={{ title: "결제" }} />
        <AppStack.Screen name="Login" component={Login} options={{ title: "로그인" }} />
        <AppStack.Screen name="Signup" component={Signup} options={{ title: "회원가입" }} />
        <AppStack.Screen name="MyInfo" component={MyInfo} options={{ title: "My밥풀" }} />
        <AppStack.Screen name="WriteReview" component={WriteReviewScreen} options={{ title: "리뷰작성" }} />
        <AppStack.Screen name="ChangeNickname" component={ChangeNickname} options={{ title: "닉네임바꾸기" }} />
        <AppStack.Screen name="ChangePhoneNum" component={ChangePhoneNum} options={{ title: "전화번호바꾸기" }} />
        <AppStack.Screen name="Review" component={Review} options={{ title: "My리뷰" }} />
        <AppStack.Screen name="ResetPassword" component={ResetPassword} options={{ title: "임시비밀번호" }} />
        <AppStack.Screen name="Like" component={Like} options={{ title: "My찜" }} />
        <AppStack.Screen name="FindMemberId" component={FindMemberId} options={{ title: "아이디찾기" }} />
        <AppStack.Screen name="ChangePassword" component={ChangePassword} options={{ title: "비밀번호바꾸기" }} />
        <AppStack.Screen name="ReviewList" component={ReviewList} options={{ title: "가게리뷰" }} />
        <AppStack.Screen name="MenuList" component={MenuList} options={{ title: "메뉴" }} />
        <AppStack.Screen name="Informations" component={Informations} options={{ title: "가게정보" }} />
        <AppStack.Screen name="RestaurantOrder" component={RestaurantOrder} options={{ title: "배달정보" }} />
        <AppStack.Screen name="MapContainer" component={MapContainer} options={{ title: "지도" }} />
        <AppStack.Screen name="PlusInfo" component={PlusInfo} options={{ title: "추가정보입력" }} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigation;