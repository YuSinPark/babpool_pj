import React, { useRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthStore/Owner-auth-context';

import "../css/OwnerSignup.css"

const OwnerSignup = () => {

    let navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const memberIdInputRef = useRef(null);
    const memberPasswordInputRef = useRef(null);
    const memberPasswordConfirmInputRef = useRef(null);
    const memberPhoneInputRef = useRef(null);
    const memberEmailInputRef = useRef(null);
    const memberNicknameInputRef = useRef(null);
    const memberNameInputRef = useRef(null);

    const { isSuccess } = authCtx;

    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredMemberId = memberIdInputRef.current.value;
        const enteredMemberPassword = memberPasswordInputRef.current.value;
        const enteredMemberPasswordConfirm = memberPasswordConfirmInputRef.current.value;
        const enteredMemberPhone = memberPhoneInputRef.current.value;
        const enteredMemberEmail = memberEmailInputRef.current.value;
        const enteredMemberNickname = memberNicknameInputRef.current.value;
        const enteredMemberName = memberNameInputRef.current.value;

        if(enteredMemberPassword !== enteredMemberPasswordConfirm) {
            alert("비밀번호를 체크해주세요")
            return;
        }

        authCtx.signup(
            enteredMemberId,
            enteredMemberPassword,
            enteredMemberPhone,
            enteredMemberEmail,
            enteredMemberName,
            enteredMemberNickname,
        );
    }

    const checkPasswordMatch = () => {
        const enteredMemberPassword = memberPasswordInputRef.current.value;
        const enteredMemberPasswordConfirm = memberPasswordConfirmInputRef.current.value;
        setIsPasswordMatch(enteredMemberPassword === enteredMemberPasswordConfirm);
    }

    const CheckMemberId = async() => {
        const enteredMemberId = memberIdInputRef.current.value;
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/member/checkMemberId?memberId=${enteredMemberId}`);
        const data = await response.json();

        if(data.data) {
            alert("사용할 수 없는 아이디입니다.");
        } else {
            alert("사용할 수 있는 아이디입니다.")
        }
    }   
    const CheckMemberNickname = async() => {
        const enteredMemberNickname = memberNicknameInputRef.current.value;
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/member/checkMemberNickname?memberNickname=${enteredMemberNickname}`);
        const data = await response.json();

        if(data.data) {
            alert("중복된 닉네임입니다.");
        } else {
            alert("사용할 수 있는 닉네임입니다.")
        }
    }  

    useEffect(() => {
        if (isSuccess) {
            alert("회원가입을 축하드립니다. 로그인을 해주세요")
            navigate("/", {replace: true});
        }
    }, [isSuccess, navigate]);


    return (
        <section className='signup-form'>
            <form onSubmit={submitHandler} action=''>
                <h1>회원가입</h1>
                <div className='sign-area'>
                    <input type='text' id='MemberId' required ref={memberIdInputRef}/>
                    <label htmlFor='MemberId'>아이디</label>
                    <div className='btn-dup'>
                        <button type='button' onClick={CheckMemberId}>중복확인</button>
                    </div>
                </div>
                <div className='sign-area'>
                    <input type='password' id='memberPassword' required ref={memberPasswordInputRef}/>
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
                    <input type='tel' id='memberPhone' required ref={memberPhoneInputRef}/>
                    <label htmlFor='memberPhone'>전화번호</label>
                </div>
                <div className='sign-area'>
                    <input type='email' id='memberEmail' required ref={memberEmailInputRef}/>
                    <label htmlFor='memberEmail'>이메일</label>
                </div>
                <div className='sign-area'>
                    <input type='text' id='memberName' required ref={memberNameInputRef}/>
                    <label htmlFor='memberName'>이름</label>
                </div>
                <div className='sign-area'>
                    <input type='text' id='memberNickname' required ref={memberNicknameInputRef}/>
                    <label htmlFor='memberNickname'>닉네임</label>
                    <div className='btn-dup'>
                        <button type='button' onClick={CheckMemberNickname}>중복확인</button>
                    </div>
                </div>
                <div className='btn-area'>
                    <button type='submit'>가입하기</button>
                </div>
            </form>
        </section>
    )
}

export default OwnerSignup;