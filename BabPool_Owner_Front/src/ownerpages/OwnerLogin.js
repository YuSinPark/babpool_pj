import React, { useState, useRef, useContext, useEffect } from 'react';
import AuthContext from '../AuthStore/Owner-auth-context';
import "../css/OwnerLogin.css";
import { requestPermission } from "../firebase-messaging-sw";
import axios from 'axios';

const OwnerLogin = () => {
    
    const authCtx = useContext(AuthContext);
    const memberIdInputRef = useRef(null);
    const memberPasswordInputRef = useRef(null);
    const { isSuccess } = authCtx;

    const [isLoading, setIsLoading] = useState(false);
    const [firebaseToken, setFirebaseToken] = useState(null);

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredMemberId = memberIdInputRef.current.value;
        const enteredMemberPassword = memberPasswordInputRef.current.value;

        setIsLoading(true);
        authCtx.login(enteredMemberId, enteredMemberPassword);
        setIsLoading(false);
    }

    useEffect(() => {
        if (isSuccess) {
          const updateFirebaseToken = async () => {
            const fireToken = await requestPermission();
      
            axios.post(
              `${process.env.REACT_APP_API_ROOT}/member/updateFirebaseToken`,
              {
                FBToken: fireToken,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
              .then(() => {
                // Firebase 토큰 업데이트 후에 새로고침
                window.location.replace("/");
              })
              .catch((error) => {
                console.error('Firebase 토큰 업데이트 오류:', error);
              });
          };
      
          updateFirebaseToken();
        }
      }, [isSuccess]);
    

    return (
        <section className='login-form'>
            <form onSubmit={submitHandler} action=''>
                <h1>사장님 로그인</h1>
                <div className='int-area'>
                    <input type='text' id='memberId' required ref={memberIdInputRef} />
                    <label htmlFor='memberId'>아이디</label>
                </div>
                <div className='int-area'>
                    <input type='password' id='memberPassword' required ref={memberPasswordInputRef} />
                    <label htmlFor='memberPassword'>비밀번호</label>
                </div>
                <div className='btn-area'>
                    <button type='submit'>로그인</button>
                </div>
                <div className='checkMember'>
                    <div onClick={() => {window.location.href = '/FindMemberId';}}>아이디 찾기</div>
                    <div onClick={() => {window.location.href = '/ResetPassword';}}>비밀번호 찾기</div>
                </div>
                <hr />
                <div className='btn-rrr'>    
                    <button onClick={() => {window.location.href = '/OwnerSignup';}}>
                        회원가입
                    </button>
                </div>
                
            </form>
        </section>

    )
}

export default OwnerLogin;