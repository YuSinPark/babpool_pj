import React, { useRef, useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Modal, View, Text } from 'react-native';
import AuthContext from '../AuthStore/Member-auth-context';
import * as authAction from "../AuthStore/Member-auth-action"
import '../css/Login.css'

import naver from '../img/naver.png'
import kakao from '../img/kakao.png'
import axios from 'axios';
import FindMemberIdScreen from './FindMemberId';
import ResetPasswordScreen from './ResetPassword';
import SignupScreen from './Signup';


export default function LoginScreen({ navigation }) {

  const authCtx = useContext(AuthContext);
  const memberIdInputRef = useRef(null);
  const memberPasswordInputRef = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const memberId = memberIdInputRef.current.value;
    const memberPassword = memberPasswordInputRef.current.value;

    const postData = {
      memberId, memberPassword
    }

    axios.post(`${process.env.REACT_APP_API_ROOT}/login`, postData, {})
      .then((result) => {
        if (result.data.accessToken !== null) {
          const loginData = result.data

          authAction.loginTokenHandler(
            loginData.accessToken,
            loginData.refreshToken
          )

        authCtx.token = loginData.accessToken;
        window.location.href="/App"
      }
    })
    .catch((error) => {
      if(error.response.data === '아이디 혹은 비밀번호를 확인해주세요') {
        openModal();
      } else if(error.response.data.message === '탈퇴한 회원입니다.') {
        openModal2();
      }
    })
  }

  const openModal = () => {
    setIsModalVisible(true);
  }
  const closeModal = () => {
    setIsModalVisible(false);
  }

  const openModal2 = () => {
    setIsModalVisible2(true);
  }
  const closeModal2 = () => {
    setIsModalVisible2(false);
  }

  const naversocialLoginhandler = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=vgatqz1AO2ZtM1W5lTMe&redirect_uri=${process.env.REACT_APP_HOME_URL}/login/oauth2/code/naver&response_type=code`
  }

  const kakaosocialLoginhandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=ec43de0821f2a14e8a07f88d1521ddb1&redirect_uri=${process.env.REACT_APP_HOME_URL}/login/oauth2/code/kakao&response_type=code`
  }

  return (
    <div className='login-body'>

      {/* <img className='logo' src = {logo} alt='' width={80}></img> */}
      <div className='login-text'>로그인</div>
      <form onSubmit={submitHandler} action=''>
        <div className='int-area'>
          <input type='text' id='memberId' required ref={memberIdInputRef} />
          <div className='label-id' htmlFor='memberId'>아이디</div>
        </div>
        <div className='int-area'>
          <input type='password' id='memberPassword' required ref={memberPasswordInputRef} />
          <div className='label-id' htmlFor='memberPassword'>비밀번호</div>
        </div>
        <div className='btn-area'>
          <button type='submit'>start</button>
          <div className="login-box">
            <img src={naver} className='social-button' id="naver-connect" onClick={naversocialLoginhandler} width="30%">
            </img>
            <img src={kakao} className='social-button' id="kakao-connect" onClick={kakaosocialLoginhandler} width="33%">
            </img>
          </div>
        </div>
      </form>
      <div className='findMember-div'>
        <div className='findMember'>
          <div onClick={() => navigation.navigate('FindMemberId')}>아이디 찾기</div>
          <div onClick={() => navigation.navigate('ResetPassword')}>비밀번호 찾기</div>
        </div>
      </div>
      <div className='checkMember'>
        <div onClick={() => navigation.navigate('Signup')}>혹시 회원이 아니신가요?</div>
      </div>
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
            <Text style={{ textAlign: 'center', paddingBottom: 15 }}>아이디 혹은 비밀번호를 확인해주세요</Text>
            <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
              <div className="order-alert" onClick={closeModal}>닫기</div>
            </view>
          </View>
        </View>
      </Modal>
      <Modal visible={isModalVisible2} animationType="fade" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
            <Text style={{ textAlign: 'center', paddingBottom: 15 }}>탈퇴한 회원입니다. 다시 로그인해주세요</Text>
            <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
              <div className="order-alert" onClick={closeModal2}>닫기</div>
            </view>
          </View>
        </View>
      </Modal>
    </div>
  )
}

const Stack = createStackNavigator();

function LoginNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="FindMemberId"
        component={FindMemberIdScreen}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
      />      
    </Stack.Navigator>
  );
}