import React, { useRef, useContext, useEffect, useState } from 'react';
import AuthContext from '../AuthStore/Member-auth-context';
import { createStackNavigator } from '@react-navigation/stack';
import * as authAction from "../AuthStore/Member-auth-action"
import { Modal, View, Text } from 'react-native';
import Mypage from './Mypage';
import Login from './Login';
import '../css/Signup.css';
import logo from '../img/logo.png';

export default function SignupScreen({ navigation }) {

    const authCtx = useContext(AuthContext);
    const memberIdInputRef = useRef(null);
    const memberPasswordInputRef = useRef(null);
    const memberPasswordConfirmInputRef = useRef(null);
    const memberPhoneInputRef = useRef(null);
    const memberEmailInputRef = useRef(null);
    const memberNicknameInputRef = useRef(null);
    const memberNameInputRef = useRef(null);

    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [isModalVisible4, setIsModalVisible4] = useState(false);
    const [isModalVisible5, setIsModalVisible5] = useState(false);
    const [isModalVisible6, setIsModalVisible6] = useState(false);
    const [isModalVisible7, setIsModalVisible7] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredMemberId = memberIdInputRef.current.value;
        const enteredMemberPassword = memberPasswordInputRef.current.value;
        const enteredMemberPasswordConfirm = memberPasswordConfirmInputRef.current.value;
        const enteredMemberPhone = memberPhoneInputRef.current.value;
        const enteredMemberEmail = memberEmailInputRef.current.value;
        const enteredMemberNickname = memberNicknameInputRef.current.value;
        const enteredMemberName = memberNameInputRef.current.value;

        if (enteredMemberPassword !== enteredMemberPasswordConfirm) {
            openModal5();
            return;
        }

        const data = authAction.signupActionHandler(
            enteredMemberId,
            enteredMemberPassword,
            enteredMemberPhone,
            enteredMemberEmail,
            enteredMemberName,
            enteredMemberNickname
            )   
        data.then((result) => {
            if(result.data.success){
                openModal6();
            }
        }).catch((error) => {
            openModal7();
        })
    }

    const checkPasswordMatch = () => {
        const enteredMemberPassword = memberPasswordInputRef.current.value;
        const enteredMemberPasswordConfirm = memberPasswordConfirmInputRef.current.value;
        setIsPasswordMatch(enteredMemberPassword === enteredMemberPasswordConfirm);
    }

    const CheckMemberId = async () => {
        const enteredMemberId = memberIdInputRef.current.value;
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/member/checkMemberId?memberId=${enteredMemberId}`);
        const data = await response.json();

        if (data.data) {
            openModal1()
        } else {
            openModal2()
        }
    }
    const CheckMemberNickname = async () => {
        const enteredMemberNickname = memberNicknameInputRef.current.value;
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/member/checkMemberNickname?memberNickname=${enteredMemberNickname}`);
        const data = await response.json();

        if (data.data) {
            openModal3()
        } else {
            openModal4()
        }
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
        setIsModalVisible2(false);
    }

    const openModal3 = () => {
        setIsModalVisible3(true);
    }
    const closeModal3 = () => {
        setIsModalVisible3(false);
    }

    const openModal4 = () => {
        setIsModalVisible4(true);
    }
    const closeModal4 = () => {
        setIsModalVisible4(false);
    }

    const openModal5 = () => {
        setIsModalVisible5(true);
    }
    const closeModal5 = () => {
        setIsModalVisible5(false);
    }

    const openModal6 = () => {
        setIsModalVisible6(true);
    }
    const closeModal6 = () => {
        navigation.navigate("Login")
        setIsModalVisible6(false);
    }

    const openModal7 = () => {
        setIsModalVisible7(true);
    }
    const closeModal7 = () => {
        setIsModalVisible7(false);
    }

    return (
        <section className='signup-form'>
            
            <form onSubmit={submitHandler} action=''>
                <div className='signup-title'></div>
                <div className='signup-title'>회원가입</div>
                <div className='sign-area'>
                    <input type='text' id='MemberId' required ref={memberIdInputRef} />
                    <label htmlFor='MemberId'>아이디</label>
                    <div className='btn-dup'>
                        <button type='button' onClick={CheckMemberId}>중복확인</button>
                    </div>
                </div>
                <div className='sign-area'>
                    <input type='password' id='memberPassword' required ref={memberPasswordInputRef} />
                    <label htmlFor='memberPassword'>비밀번호</label>
                </div>
                <div className='sign-area'>
                    <input type='password' id='memberPasswordConfirm' required ref={memberPasswordConfirmInputRef} onBlur={checkPasswordMatch} />
                    <label htmlFor='memberPasswordConfirm'>비밀번호 확인</label>
                </div>
                <div className='check-password'>
                    {!isPasswordMatch && <p>비밀번호가 일치하지 않습니다.</p>}
                </div>
                <div className='sign-area'>
                    <input type='tel' id='memberPhone' required ref={memberPhoneInputRef} />
                    <label htmlFor='memberPhone'>전화번호</label>
                </div>
                <div className='sign-area'>
                    <input type='email' id='memberEmail' required ref={memberEmailInputRef} />
                    <label htmlFor='memberEmail'>이메일</label>
                </div>
                <div className='sign-area'>
                    <input type='text' id='memberName' required ref={memberNameInputRef} />
                    <label htmlFor='memberName'>이름</label>
                </div>
                <div className='sign-area'>
                    <input type='text' id='memberNickname' required ref={memberNicknameInputRef} />
                    <label htmlFor='memberNickname'>닉네임</label>
                    <div className='btn-dup'>
                        <button type='button' onClick={CheckMemberNickname}>중복확인</button>
                    </div>
                </div>
                <div className='btn-area'>
                    <button type='submit'>start</button>
                </div>
            </form>
            <Modal visible={isModalVisible1} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>사용할 수 없는 아이디입니다.</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal1}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>
            <Modal visible={isModalVisible2} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>사용할 수 있는 아이디입니다.</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal2}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>
            <Modal visible={isModalVisible3} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>사용할 수 없는 닉네임임입니다.</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal3}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>
            <Modal visible={isModalVisible4} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>사용할 수 있는 닉네임입니다.</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal4}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>
            <Modal visible={isModalVisible5} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>비밀번호를 체크해주세요</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal5}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>
            <Modal visible={isModalVisible6} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>회원가입이 완료되었습니다! 로그인해주세요</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal6}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>
            <Modal visible={isModalVisible7} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>중복 확인 부탁드립니다!</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal7}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>
        </section>
    )
}