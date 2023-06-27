import React, { useContext, useState } from "react";
import AuthContext from "../AuthStore/Member-auth-context";
import { Modal, View, Text } from 'react-native';
import '../../src/css/Myinfo.css';
import CouponScreen from "./Coupon";
import { createStackNavigator } from "@react-navigation/stack";


export default function MyInfoScreen({ navigation }) {

    const authCtx = useContext(AuthContext);
    const date = new Date(Date.parse(authCtx.userObj.memberJoinDate))
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const toggleLogouthandler = () => {
        authCtx.logout();
    }

    const toggleWithdrawalhandler = async () => {
        const memberId = authCtx.userObj.memberId;
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/member/Withdrawal?memberId=${memberId}`);
        const data = await response.json();

        if (data.data) {
            openModal1();
        } else {
            openModal2();
        }
    }

    const openModal1 = () => {
        setIsModalVisible1(true);
    }
    const closeModal1 = () => {
        authCtx.logout();
        navigation.navigate("App")
        setIsModalVisible1(false);
    }

    const openModal2 = () => {
        setIsModalVisible2(true);
    }
    const closeModal2 = () => {
        setIsModalVisible2(false);
    }

    return (
        <section>
            <div className="myinfo-body">
                <div className="myinfo-hello">
                    <div>밥풀과 함께한 지 {Math.floor((new Date() - date) / (1000 * 60 * 60 * 24)) + 1}일 :) </div>
                    <div>{authCtx.userObj.memberName}님 안녕하세요!</div>
                </div>
                <div className="myinfo-top-div">회원정보</div>
                <div className="myinfo-content">
                    <div className="myinfo-name">
                        <div>
                            이름
                        </div>
                        <div>
                            {authCtx.userObj.memberName}
                        </div>
                    </div>
                    <div className="myinfo-nickname">
                        <div className="nickname-text">
                            <div>
                                나의 닉네임 
                            </div>
                            <div>
                                {authCtx.userObj.memberNickname}
                            </div>
                        </div>
                        <button className = "myinfo-btn" onClick={() => navigation.navigate('ChangeNickname')}>
                            닉네임 변경하기
                        </button>
                    
                    </div>

                    
                    <div className="myinfo-id">
                        <div>
                            아이디
                        </div>
                        <div>
                            {authCtx.userObj.memberId}
                        </div>
                    </div>

                    <div className="myinfo-phone">
                        <div className="phone-text">
                                <div>
                                    전화번호
                                </div>
                                <div>
                                    {authCtx.userObj.memberPhone}
                                </div>
                        </div>
                    
                        <button className = "myinfo-btn" onClick={() => navigation.navigate('ChangePhoneNum')}>
                            전화번호 변경하기
                        </button>
                    </div>
    
                    <div className="myinfo-email">
                        <div>
                            이메일
                        </div>
                        <div>
                            {authCtx.userObj.memberEmail}
                        </div>
                    </div>
                    <div className="myinfo-date">
                        <div>
                            가입 날짜
                        </div>
                        <div>
                            {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
                        </div>
                    </div>
                    <div className="myinfo-point">
                        <div>
                            포인트
                        </div>
                        <div>
                            {authCtx.userObj.memberPoint} P
                        </div>
                    </div>
                    <div className="myinfo-route">
                        <div>
                            가입경로
                        </div>
                        <div>
                            {authCtx.userObj.memberSocialType}
                        </div>
                    </div>
                    <br />
                    <button className = "myinfo-btn" onClick={() => navigation.navigate('ChangePassword')}>
                        비밀번호 변경
                    </button>
                    
                   
                    {authCtx.userObj.memberSocialType !== 'NAVER' && authCtx.userObj.memberSocialType !== 'KAKAO' && (
                        <button className = "myinfo-btn-out" onClick={toggleWithdrawalhandler} style={{ float: 'right' }}>
                            회원탈퇴
                        </button>                    
                    )}
                     <button className = "myinfo-btn" onClick={toggleLogouthandler} style={{ float: 'right' }}>
                        로그아웃
                    </button>
                </div>
             
            </div>
            <Modal visible={isModalVisible1} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>회원 탈퇴에 성공하였습니다.</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal1}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>
            <Modal visible={isModalVisible2} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>회원 탈퇴에 실패하였습니다.</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal2}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal> 
        </section>    
    )
}
