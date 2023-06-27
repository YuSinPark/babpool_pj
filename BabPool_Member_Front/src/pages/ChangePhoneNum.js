import React, { useState, useContext, useRef } from "react";
import AuthContext from "../AuthStore/Member-auth-context";
import * as authAction from "../AuthStore/Member-auth-action"
import { Modal, View, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import MyInfo from "./MyInfo";
import logo from '../img/logo.png';
import '../../src/css/change.css';


export default function ChangePhoneNumScreen({ navigation }) {

    const authCtx = useContext(AuthContext);
    const memberPhoneInputRef = useRef(null);
    const memberId = authCtx.userObj.memberId;

    const [isModalVisible, setIsModalVisible] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredMemberPhone = memberPhoneInputRef.current.value;
        const token = localStorage.getItem('token')

        const data = authAction.changePhoneNumActionHandler(memberId, enteredMemberPhone, token)
        data.then((result) => {
            if(result.data.success){
                authCtx.getUser();
                openModal();
            }
        })
    }

    const openModal = () => {
        setIsModalVisible(true);
    }
    const closeModal = () => {
        navigation.navigate("App")
        setIsModalVisible(false);
    } 

    return (
        <section>
            <form className = 'change-body'onSubmit={submitHandler}>
                <div className="change-title">
                    <div>
                        {memberId} 님의 현재 연락처는
                    
                    </div>
                    <div>
                        {authCtx.userObj.memberPhone} 입니다.
                    
                    </div>
                </div>
                <div className="change-contents">
                    <div className="change-contents-item">
                        <label htmlFor='PhoneNumber'><img src={logo} width={20} /> 새 연락처 : </label>
                        <input placeholder='예) 01012341234' type='tel' id='PhoneNumber' required ref={memberPhoneInputRef} />
                    </div>
                    <div className="change-contents-btn">
                        <button type='submit'>연락처 변경</button>
                    </div>
                </div>
            </form>
            <Modal visible={isModalVisible} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>전화번호가 변경되었습니다!</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal> 
        </section>    
    )
}