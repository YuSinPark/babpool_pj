import React, { useState, useCallback } from "react";
import * as authAction from "./Owner-auth-action";

const AuthContext = React.createContext({
    token:'',
    userObj: { memberId: '', memberPhone: '', memberEmail: '', memberName: '', memberNickname: ''},
    isLoggedIn:false,
    isSuccess:false,
    isGetSuccess:false,
    signup:(memberId,memberPassword,memberPhone,memberEmail,memberName,memberNickname) => {},
    login: (memberId,memberPassword) => {},
    logout: () => {},
    getUser: () => {},
    changeNickname: (memberNickname) => {},
    changePassword: (exPassword, newPassword) => {},
    resetPw: (memberId, memberEmail) => {}
});

export const AuthContextProvider = (props) => {

    const tokenData = localStorage.getItem('token')

    const [token, setToken] = useState(tokenData);
    const [userObj, setUserObj] = useState ({
        memberId: '',
        memberPhone: '',
        memberEmail: '',
        memberJoinDate: '',
        memberName: '',
        memberNickname: ''
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [isGetSuccess, setIsGetSuccess] = useState(false);

    const userIsLoggedIn = !!token;

    const signupHandler = (memberId,memberPassword,memberPhone,memberEmail,memberName,memberNickname) => {
        setIsSuccess(false);
        const response = authAction.signupActionHandler(memberId,memberPassword,memberPhone,memberEmail,memberName,memberNickname);
        
        response.then((result) => {
            if(result !== null) {
                setIsSuccess(true);
            }
        });
    }

    const loginHandler = (memberId,memberPassword) => {
        setIsSuccess(false);

        const data = authAction.loginActionHandler(memberId,memberPassword);
        data.then((result) => {
            if(result !== null){
                const loginData = result.data

                authAction.loginTokenHandler(
                    loginData.accessToken,
                    loginData.refreshToken
                )

                setToken(loginData.accessToken);
                setIsSuccess(true);
            }
        })
    };

    const logoutHandler = useCallback(() => {
        setToken('');
        const member = userObj.memberId
        authAction.logoutActionHandler(member);
        window.location.replace("/");
    }, [userObj]);

    const getUserHandler = () => {
        setIsGetSuccess(false);
        const data = authAction.getUserActionHandler(token);
        data.then((result) => {
            if(result !== null) {
                const userData = result.data.data;
                setUserObj(userData);
                setIsGetSuccess(true);
            }
        })
    };

    const changeNicknameHandler = (memberId, memberNickname) =>{
        setIsSuccess(false);

        const data = authAction.changeNicknameActionHandler(memberId, memberNickname, token);
        data.then((result) => {
            if(result !== null) {
                const userData = result.data.data;
                setUserObj(userData);
                setIsSuccess(true);
            }
        })
    }

    const changePasswordHandler = (exPassword, newPassword) => {
        setIsSuccess(false);

        const data = authAction.changePasswordActionHandler(exPassword, newPassword, token);
        data.then((result) => {
            if(result !== null) {
                setIsSuccess(true);
                logoutHandler();
            }
        })
    };

    const resetMemberPasswordHandler = (memberId, memberEmail) => {
        setIsSuccess(false);

        const data = authAction.ResetMemberPasswordActionHandler(memberId, memberEmail)
        data.then((result) => {
            console.log(result.data.success);
            if(result.data.success) {
                alert("임시비밀번호로 변경되었습니다! 꼭 로그인 후 비밀번호를 변경해주세요")
                window.location.href = "/OwnerLogin"
            } else {
                alert("여기까지 어떻게 들어오셨죠? 회원가입 페이지로 보내드릴게요")
                window.location.href = "/OwnerLogin"
            }
        })
    }


    const contextValue = {
        token,
        userObj,
        isLoggedIn: userIsLoggedIn,
        isSuccess,
        isGetSuccess,
        signup: signupHandler,
        login: loginHandler,
        logout: logoutHandler,
        getUser: getUserHandler,
        changeNickname: changeNicknameHandler,
        changePassword: changePasswordHandler,
        resetPw: resetMemberPasswordHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;