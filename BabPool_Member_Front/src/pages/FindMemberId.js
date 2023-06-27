import React, { useRef, useState } from 'react';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login'
import ResetPassword from './ResetPassword';
import '../../src/css/find.css'
import logo from '../img/logo.png'

export default function FindMemberIdScreen({navigation}) {

    const memberPhoneInputRef = useRef(null);
    const memberEmailInputRef = useRef(null);
    const [memberIds, setMemberIds] = useState([]);
    
    const submitHandler = (event) => {
        event.preventDefault();

        const postData = {
            memberEmail: memberEmailInputRef.current.value,
            memberPhone: memberPhoneInputRef.current.value
        }

        axios.post(`${process.env.REACT_APP_API_ROOT}/member/findMyId`, postData)
            .then(response => {
                const memberId = response.data.data
                setMemberIds(memberId)
            })
            .catch(error => {
                if(error.response.data.msg === '아이디가 없습니다'){
                    alert("아이디가 존재하지 않습니다, 회원가입을 진행해주세요!")
                    window.location.href = "/OwnerSignup";
                }
            })
    }

    return (
        <section className='findId'>
            <form onSubmit={submitHandler} action=''>
                <div className='findid-title'>
                    <div>아이디를 잊으셨나요?</div>
                    <div>전화번호와 이메일을 입력해주세요.</div>
                </div>
               <div className='findid-contents'>

               <div className='findid-contents-item'>
                    <label htmlFor='memberEmail'><img src={logo} width={20} />이메일 : </label>
                    <input placeholder='예) bab@babpool.com' type='email' id='memberEmail' required ref={memberEmailInputRef}/>
                </div> 
                <div className='findid-contents-item'>
                    <label htmlFor='memberPhone'><img src={logo} width={20} />전화번호 : </label>                    
                    <input  placeholder='예) 01012341234' type='tel' id='memberPhone' required ref={memberPhoneInputRef}/>
                </div>                
                <div>
                {memberIds.length > 0 ? (
                    <div>
                        <h2>회원님의 아이디</h2>
                        <ul>
                            {memberIds.map((id, index) => (
                                <li key={index}>{id}</li>
                            ))}
                        </ul>
                        <div className='goToLogin'>
                            <div onClick={() => navigation.navigate("Login")}>로그인 페이지로 이동 </div>
                        </div>
                        <div className='goToLogin'>
                            <div onClick={() => navigation.navigate("ResetPassword")}>임시 비밀번호 발급 </div>
                        </div>
                    </div>
                ) : 
                    <div className='findid-contents-btn'>
                        <button type='submit'>아이디 찾기</button>
                    </div>   
                }
                </div>
               </div>
            </form>
        </section>
    )
}