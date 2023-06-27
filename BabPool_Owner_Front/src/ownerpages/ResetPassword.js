import React, { useContext, useRef } from 'react'
import AuthContext from '../AuthStore/Owner-auth-context';

const ResetPassword = () => {

    const authCtx = useContext(AuthContext);

    const memberIdInputRef = useRef(null);
    const memberEmailInputRef = useRef(null);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredMemberId = memberIdInputRef.current.value;
        const enteredMemberEmail = memberEmailInputRef.current.value;

        authCtx.resetPw(enteredMemberId, enteredMemberEmail)
    }
    

    return (
        <section className='findId'>
            <form onSubmit={submitHandler}>
                <h1>임시 비밀번호 생성</h1>
                <h5>임시 비밀번호를 발급해드립니다</h5>
                <h6>임시 비밀번호로 로그인 하신 후 꼭 비밀번호를 변경해주세요</h6>
                <div>
                    <label htmlFor='memberId'>아이디</label>
                    <input type='text' id='memberId' required ref={memberIdInputRef}/>
                </div> 
                <div>
                    <label htmlFor='memberEmail'>이메일</label>                    
                    <input type='email' id='memberEmail' required ref={memberEmailInputRef}/>
                </div> 
                <div>
                    <button type='submit'>임시 비밀번호 발급받기</button>
                </div>
            </form>
        </section>
    )
}

export default ResetPassword;