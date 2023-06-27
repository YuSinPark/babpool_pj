import React, { useState, useContext, useRef } from "react";
import AuthContext from "../AuthStore/Member-auth-context";
import * as authAction from "../AuthStore/Member-auth-action"
import { createStackNavigator } from "@react-navigation/stack";
import { Modal, View, Text } from 'react-native';
import MyInfo from "./MyInfo";
import '../../src/css/change.css';
import logo from '../img/logo.png';
import axios from "axios";

export default function ChangePasswordScreen({ navigation }) {
    const authCtx = useContext(AuthContext);
    const exPasswordInputRef = useRef(null);
    const newPasswordInputRef = useRef(null);
    const newPasswordAgainInputRef = useRef(null);

    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);


    const submitHandler = (event) => {
        event.preventDefault();
        
        const token = localStorage.getItem('token')
        const enteredExPassword = exPasswordInputRef.current.value;
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredNewPasswordAgain = newPasswordAgainInputRef.current.value;

        if (enteredNewPassword !== enteredNewPasswordAgain) {
            openModal1()
            return;
        }

        const data = authAction.changePasswordActionHandler(enteredExPassword, enteredNewPassword, token);
        data.then((result) => {
            if(result.data.success) {
                openModal2();
            }
        })
    }

    const checkPasswordMatch = () => {
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredNewPasswordAgain = newPasswordAgainInputRef.current.value;
        setIsPasswordMatch(enteredNewPassword === enteredNewPasswordAgain);
    }

    const openModal1 = () => {
        setIsModalVisible1(true);
    }
    const closeModal1 = () => {
        setIsModalVisible1(false);
    }

    const openModal2 = () => {
        setIsModalVisible2(true);
    }
    const closeModal2 = () => {
        navigation.navigate("Mypage")
        authCtx.logout();
        setIsModalVisible2(false);
    }

    return (
        <section className="change-body">
            <form onSubmit={submitHandler}>
                <div className="change-title">
                    비밀번호 변경하기
                </div>
                <div className="change-contents">
                    <div className="change-contents-item">
                        <label htmlFor='ex-password'>현재 비밀번호</label>
                        <input placeholder='현재 비밀번호 입력' type='password' id='ex-password' required ref={exPasswordInputRef} />
                    </div>
                    <div className="change-contents-item">
                        <label htmlFor='new-password'><img src={logo} width={20} /> 새로운 비밀번호 : </label>
                        <input placeholder='새로운 비밀번호'type='password' id='new-password' required ref={newPasswordInputRef} />
                    </div>
                    <div className="change-contents-item">
                        <label htmlFor='new-passwordAgain'><img src={logo} width={20} /> 비밀번호 재확인 :</label>
                        <input placeholder='새로운 비밀번호 확인'type='password' id='new-passwordAgain' required ref={newPasswordAgainInputRef} onBlur={checkPasswordMatch} />
                        {!isPasswordMatch && <p>비밀번호가 일치하지 않습니다</p>}
                    </div>
                    <div className="change-contents-btn">
                        <button type='submit'>비밀번호 변경</button>
                    </div>
                </div>
                
            </form>
            <Modal visible={isModalVisible1} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>패스워드가 일치하지 않습니다!</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal1}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>
            <Modal visible={isModalVisible2} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>비밀번호가 변경되었습니다. 다시 로그인 해주세요! </Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal2}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal> 
        </section>
    )
}