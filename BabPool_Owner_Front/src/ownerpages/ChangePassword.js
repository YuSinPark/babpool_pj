import React, { useContext, useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../AuthStore/Owner-auth-context';

const ChangePassword = () => {
    let navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    const exPasswordInputRef = useRef(null);
    const newPasswordInputRef = useRef(null);
    const newPasswordAgainInputRef = useRef(null);
    
    const { isSuccess } = authCtx;

    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredExPassword = exPasswordInputRef.current.value;
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredNewPasswordAgain = newPasswordAgainInputRef.current.value;

        if(enteredNewPassword !== enteredNewPasswordAgain){
            alert("패스워드가 일치하지 않습니다.")
            return;
        }

        authCtx.changePassword(enteredExPassword, enteredNewPassword);
    }
    
    const checkPasswordMatch = () => {
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredNewPasswordAgain = newPasswordAgainInputRef.current.value;
        setIsPasswordMatch(enteredNewPassword === enteredNewPasswordAgain);
    }

    useEffect (() => {
        if(isSuccess) {
            alert("다시 로그인 해주세요")
            authCtx.logout();
            navigate("/OwnerLogin", {replace: true})
        }
    }, [isSuccess])

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor='ex-password'>기존 비밀번호</label>
                <input type='password' id='ex-password' required ref={exPasswordInputRef} />
            </div>
            <div>
                <label htmlFor='new-password'>새로운 비밀번호</label>
                <input type='password' id='new-password' required ref={newPasswordInputRef} />
            </div>
            <div>
                <label htmlFor='new-passwordAgain'>비밀번호 재확인</label>
                <input type='password' id='new-passwordAgain' required ref={newPasswordAgainInputRef} onBlur={checkPasswordMatch} />
                {!isPasswordMatch && <p>비밀번호가 일치하지 않습니다</p>}
            </div>
            <div>
                <button type='submit'>비밀번호 변경</button>
            </div>
        </form>
    )
}

export default ChangePassword;