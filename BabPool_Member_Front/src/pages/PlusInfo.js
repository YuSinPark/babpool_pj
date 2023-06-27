import { useContext, useState, useRef } from "react"
import AuthContext from "../AuthStore/Member-auth-context"
import * as authAction from "../AuthStore/Member-auth-action"
import { Modal, View, Text } from 'react-native';
import logo from '../img/logo.png';
import { createStackNavigator } from "@react-navigation/stack";
import MypageScreen from "./Mypage";

export default function PlusInfoScreen({ navigation }) {
   
    const authCtx = useContext(AuthContext);
    const memberNicknameInputRef = useRef(null);
    const memberPhoneInputRef = useRef(null);

    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [isModalVisible4, setIsModalVisible4] = useState(false);

    const CheckMemberNickname = async () => {
        const enteredMemberNickname = memberNicknameInputRef.current.value;
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/member/checkMemberNickname?memberNickname=${enteredMemberNickname}`);
        const data = await response.json();

        if (data.data) {
            openModal1()
        } else {
            openModal2()
        }
    }
   
    const submitHandler = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token')

        const memberNickname = memberNicknameInputRef.current.value;
        const memberPhone = memberPhoneInputRef.current.value;

        const data = authAction.plusSocialMemberInfoActionHandler(memberNickname, memberPhone, token)
        data.then((result) => {
            if (result.data.success) {
                openModal3();
            }
        }).catch((error) => {
            openModal4();
        })
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
        authCtx.getUser();
        navigation.navigate("App")
        setIsModalVisible3(false);
    }

    const openModal4 = () => {
        setIsModalVisible4(true);
    }
    const closeModal4 = () => {
        setIsModalVisible4(false);
    }

    return (
        <section className="change-body">
            <form onSubmit={submitHandler}>
                <div className="change-title">
                    추가 정보를 입력해주세요
                </div>
                <div className="change-contents">
                    <div className="change-contents-item">
                        <label htmlFor='memberNickname'><img src={logo} width={20} /> 닉네임 :</label>
                        <input placeholder='예) 밥풀조아요'type='text' id='memberNickname' required ref={memberNicknameInputRef} />

                        <button  className= 'change-check-btn' type='button' onClick={CheckMemberNickname} style={{ marginLeft: '10px' }}>중복확인</button>
                    </div>
                    <div className="change-contents-item">
                        <label htmlFor='PhoneNumber'><img src={logo} width={20} /> 전화번호 : </label>
                        <input placeholder='예) 01012341234'type='tel' id='PhoneNumber' required ref={memberPhoneInputRef} />
                    </div>
                    <div className="change-contents-btn">
                        <button type='submit'>정보 입력!</button>
                    </div>
                </div>
                
            </form>
            <Modal visible={isModalVisible1} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>중복된 닉네임입니다.</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal1}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>
            <Modal visible={isModalVisible2} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>사용할 수 있는 닉네임입니다.</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal2}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal> 
            <Modal visible={isModalVisible3} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>입력이 완료되었습니다. 감사합니다.</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal3}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>            
            <Modal visible={isModalVisible4} animationType="fade" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>닉네임 중복 체크 부탁드립니다.</Text>
                        <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                            <div className="order-alert" onClick={closeModal4}>닫기</div>
                        </view>
                    </View>
                </View>
            </Modal>
        </section>
    )
}