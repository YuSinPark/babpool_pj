import { createStackNavigator } from "@react-navigation/stack";
import Login from './Login'
import React, { useRef, useState } from 'react'
import * as authAction from "../AuthStore/Member-auth-action"
import '../../src/css/find.css'
import logo from '../img/logo.png'
import { Modal, View, Text } from 'react-native';


export default function ResetPasswordScreen ({ navigation }) {

    const memberIdInputRef = useRef(null);
    const memberEmailInputRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredMemberId = memberIdInputRef.current.value;
        const enteredMemberEmail = memberEmailInputRef.current.value;

        const data = authAction.ResetMemberPasswordActionHandler(enteredMemberId, enteredMemberEmail)
        data.then((result) => {
            if(result.data.success){
                openModal();
            }
        })
        .catch((error) => {
            openModal2();
        }) 
    }

    const openModal = () => {
        setIsModalVisible(true);
    }
    const closeModal = () => {
        navigation.navigate("Login")
        setIsModalVisible(false);
    } 
    
    const openModal2 = () => {
        setIsModalVisible2(true);
    }
    const closeModal2 = () => {
        setIsModalVisible2(false);
    } 

    return (
        <section className='findId'>
            <form onSubmit={submitHandler}>
                <div className='findid-title'>
                    <div>임시 비밀번호 발급</div>
                    <div>임시 비밀번호로 로그인 하신 후 꼭 비밀번호를 변경해주세요</div>
                </div>
                <div className='findid-contents'>
                    <div className='findid-contents-item'>
                        <label htmlFor='memberId'><img src={logo} width={20} />아이디 : </label>
                        <input placeholder='예) babpool' type='text' id='memberId' required ref={memberIdInputRef} />
                    </div>
                    <div className='findid-contents-item'>
                        <label htmlFor='memberEmail'><img src={logo} width={20} />이메일 : </label>
                        <input placeholder='예) bab@babpool.com' type='email' id='memberEmail' required ref={memberEmailInputRef} />
                    </div>
                    <div className='findid-contents-btn'>
                        <button type='submit'>임시 비밀번호 발급받기</button>
                    </div>
                </div>
            </form>
            <Modal visible={isModalVisible} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>임시비밀번호로 변경되었습니다! 꼭 로그인 후 비밀번호를 변경해주세요!</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>   
            <Modal visible={isModalVisible2} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>아이디 혹은 이메일이 존재하지 않습니다.</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal2}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>            
        </section>
    )
}

const ResetPasswordStack = createStackNavigator();

function ResetPassword() {
    return (
        <ResetPassword.navigation>
            <ResetPasswordStack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={{ headerShown: false }}
            />
            <ResetPasswordStack.Screen
                name="Login"
                component={Login}
                options={{ headerShown:false }}
            />            
        </ResetPassword.navigation>
    )
}