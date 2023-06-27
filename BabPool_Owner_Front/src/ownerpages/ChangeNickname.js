import React, {useContext, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthStore/Owner-auth-context";

const ChangeNickname = () => {
    let navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    const memberNicknameInputRef = useRef(null);
    const { isSuccess } = authCtx;

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

    const submitHandler = (event) =>{
        event.preventDefault();

        const enteredMemberNickname = memberNicknameInputRef.current.value;

        authCtx.changeNickname(authCtx.userObj.memberId, enteredMemberNickname);
    }

    useEffect(() => {
        if(isSuccess) {
            alert("변경되었습니다")
            navigate("/", {replace: true});
        }
    }, [isSuccess, navigate])

    return (
        <form onSubmit={submitHandler}>
            <div>
                현재 닉네임은 "{authCtx.userObj.memberNickname}" 입니다.
            </div>
            <br />
            <div>
                <label htmlFor='memberNickname'>새로운 닉네임</label>
                <input type='text' id='memberNickname' required ref={memberNicknameInputRef}/>
                <button type='button' onClick={CheckMemberNickname} style={{ marginLeft: '10px'}}>중복확인</button>
            </div>
            <br />
            <div>
                <button type='submit'>닉네임 바꾸기</button>
            </div>
        </form>
    )
}

export default ChangeNickname;