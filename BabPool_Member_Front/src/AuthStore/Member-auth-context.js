import React, { useState } from "react";
import * as authAction from "./Member-auth-action";

const AuthContext = React.createContext({
    token:'',
    userObj: { memberId: '', memberPhone: '', memberEmail: '', memberJoinDate: '', memberName: '', memberNickname: '', memberPoint: '', memberSocialType: ''},
    isLoggedIn:false,
    isSuccess:false,
    isGetSuccess:false,
    login: (memberId,memberPassword) => {},
    logout: () => {},
    getUser: () => {},
    naverLogin: (code) => {},
    kakaoLogin: (code) => {},
});

export const AuthContextProvider = (props) => {

    const tokenData = authAction.retrieveStoredToken();
    
    let initialToken;
    if(tokenData) {
        initialToken = tokenData.token
    }

    const [token, setToken] = useState(initialToken);
    const [userObj, setUserObj] = useState ({
        memberId: '',
        memberPhone: '',
        memberEmail: '',
        memberJoinDate: '',
        memberName: '',
        memberNickname: '',
        memberPoint: '',
        memberRole: '',
        memberSocialType: ''
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [isGetSuccess, setIsGetSuccess] = useState(false);

    const userIsLoggedIn = !!token;
    
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
                console.log(result);
            }
        })
       
    };

    const logoutHandler = () => {
        setToken('');
        const member = userObj.memberId
        authAction.logoutActionHandler(member);
        if(token) {
            window.location.replace("/")
        }
    };

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

    const naverLoginHandler = (code) => {
        setIsSuccess(false);
        const data = authAction.naverLoginActionHandler(code);
        data.then((result) => {
            if(result !== null){
                const loginData = result.data.data;

                authAction.loginTokenHandler(
                    loginData.accessToken,
                    loginData.refreshToken
                )

                setToken(loginData.accessToken);
                setIsSuccess(true);
            }
        })
    }

    
    const kakaoLoginHandler = (code) => {
        setIsSuccess(false);
        const data = authAction.kakaoLoginActionHandler(code);
        data.then((result) => {
            if(result !== null){
                const loginData = result.data.data;

                authAction.loginTokenHandler(
                    loginData.accessToken,
                    loginData.refreshToken
                )

                setToken(loginData.accessToken);
                setIsSuccess(true);
            }
        })
    }

    const contextValue = {
        token,
        userObj,
        isLoggedIn: userIsLoggedIn,
        isSuccess,
        isGetSuccess,
        login: loginHandler,
        logout: logoutHandler,
        getUser: getUserHandler,
        naverLogin: naverLoginHandler,
        kakaoLogin: kakaoLoginHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;