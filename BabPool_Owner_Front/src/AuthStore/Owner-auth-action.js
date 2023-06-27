import { GET, POST } from "./fetch-auth-action";
import Cookies from 'js-cookie';

const createTokenHeader = (token) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
};

export const loginTokenHandler = (token, refreshToken) => {
    localStorage.setItem('token', token);
    Cookies.set('refreshToken', refreshToken, { expires: 7 });
};

export const retrieveStoredToken = async () => {
    let storedToken = localStorage.getItem('token');
    return {
        token: storedToken
    };
};

export const signupActionHandler = (memberId, memberPassword, memberPhone, memberEmail, memberName, memberNickname) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/member/ownerSignup`
    const signupObject = { memberId, memberPassword, memberPhone, memberEmail, memberName, memberNickname};
    
    const response = POST(URL, signupObject, {});
    return response;
};

export const loginActionHandler = (memberId, memberPassword) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/login`;
    const loginObject = {memberId, memberPassword};

    const response = POST(URL, loginObject, {});
    return response;
};

export const logoutActionHandler = (memberId) => {
    localStorage.removeItem('token');
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    const URL = `${process.env.REACT_APP_API_ROOT}/member/removeRefreshToken?memberId=${memberId}`

    const response = GET(URL, {})
    return response;
};

export const getUserActionHandler = (token) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/auth/OwnerMe`
    const actoken = createTokenHeader(token)

    const response = GET(URL, { ...actoken.headers, 'Content-Type': 'application/json'});
    return response;
};

export const changeNicknameActionHandler = (memberId, memberNickname, token) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/auth/ChangeOwnerNickname`;
    const changeNicknameObj = {memberId, memberNickname};
    const actoken = createTokenHeader(token);

    const response = POST(URL, changeNicknameObj, actoken.headers);
    return response;
}

export const changePasswordActionHandler = (exPassword, newPassword, token) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/auth/ChangePassword`;
    const changePasswordObj = { exPassword, newPassword };
    const actoken = createTokenHeader(token)

    const response = POST(URL, changePasswordObj, actoken.headers);
    return response;
};

export const ResetMemberPasswordActionHandler = (memberId, memberEmail) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/member/resetMemberPw`
    const resetData = {memberId, memberEmail}

    const response = POST(URL, resetData, {})
    return response;
}