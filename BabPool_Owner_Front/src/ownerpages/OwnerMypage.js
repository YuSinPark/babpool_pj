import React, {useContext} from "react";
import AuthContext from "../AuthStore/Owner-auth-context";

const OwnerMypage = () => {

    const authCtx = useContext(AuthContext);
    const date = new Date(Date.parse(authCtx.userObj.memberJoinDate))

    const toggleWithdrawalhandler = async () => {
        const memberId = authCtx.userObj.memberId;
        const response = await fetch(`${process.env.REACT_APP_API_ROOT}/member/Withdrawal?memberId=${memberId}`);
        const data = await response.json();

        console.log(data.data)
        if (data.data) {
            alert("회원 탈퇴에 성공하였습니다.");
            window.location.replace('/');
            authCtx.logout();
        } else {
            alert("회원 탈퇴에 실패하였습니다.");
            window.location.replace('/');
        }
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {authCtx.userObj.memberId}님 안녕하세요
            </h1>
            <hr />
            <div>
                <div>
                    <div>
                        닉네임
                    </div>
                    <div>
                        {authCtx.userObj.memberNickname}
                    </div>
                </div>
                <button onClick={() => {window.location.href = '/ChangeNickname';}}>
                    닉네임 바꾸기
                </button>
                <br />
                <br />
                <div>
                    <div>
                        아이디
                    </div>
                    <div>
                        {authCtx.userObj.memberId}
                    </div>
                </div>
                <br />
                <div>
                    <div>
                        이메일
                    </div>
                    <div>
                        {authCtx.userObj.memberEmail}
                    </div>
                </div>
                <br />
                <div>
                    <div>
                        이름
                    </div>
                    <div>
                        {authCtx.userObj.memberName}
                    </div>
                </div>
                <br />
                <div>
                    <div>
                        가입 날짜
                    </div>
                    <div>
                        {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
                    </div>
                </div>
                <br />

                <button onClick={() => {window.location.href = '/ChangePassword';}}>
                    비밀번호 변경
                </button>
                <button onClick={toggleWithdrawalhandler} style={{ float: 'right' }}>
                    회원탈퇴
                </button>
            </div>
        </div>
    )
}

export default OwnerMypage;