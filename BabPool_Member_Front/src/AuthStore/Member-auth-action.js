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
    Cookies.set('refreshToken', refreshToken, {expires: 7});
}

export const retrieveStoredToken = () => {
    let storedToken = localStorage.getItem('token');
    
    return {
        token: storedToken
    }
}

export const signupActionHandler = (memberId, memberPassword, memberPhone, memberEmail, memberName, memberNickname) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/member/memberSignup`
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
    const URL = `${process.env.REACT_APP_API_ROOT}/auth/MemberMe`
    const actoken = createTokenHeader(token)
    const response = GET(URL, { ...actoken.headers, 'Content-Type': 'application/json'});
    return response;
};

export const changeNicknameActionHandler = (memberId, memberNickname, token) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/auth/ChangeMemberNickname`;
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

export const naverLoginActionHandler = (code) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/auth/naver?code=${code}`
    
    const response = GET(URL, {})
    return response;
}

export const kakaoLoginActionHandler = (code) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/auth/kakao?code=${code}`

    const response = GET(URL, {})
    return response;
}

export const changePhoneNumActionHandler = (memberId, memberPhone, token) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/auth/ChangeMemberPhone`;
    const changeObj = { memberId, memberPhone };
    const actoken = createTokenHeader(token);

    const response = POST(URL, changeObj, actoken.headers);
    return response;
}

export const ResetMemberPasswordActionHandler = (memberId, memberEmail) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/member/resetMemberPw`
    const resetData = {memberId, memberEmail}

    const response = POST(URL, resetData, {})
    return response;
}

export const plusSocialMemberInfoActionHandler = (memberNickname, memberPhone, token) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/auth/plusInfo`;
    const postData = { memberNickname, memberPhone };
    const actoken = createTokenHeader(token);

    const response = POST(URL, postData, actoken.headers);
    return response;

}