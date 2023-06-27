import axios from 'axios';
import Cookies from "js-cookie";
import { logoutActionHandler } from './Owner-auth-action';

const fetchAuth = async (fetchData) => {
  const { method, url, data, header } = fetchData;

  try {
    const response =
      (method === 'get' && (await axios.get(url, { headers: header }))) ||
      (method === 'post' && (await axios.post(url, data, { headers: header }))) ||
      (method === 'put' && (await axios.put(url, data, { headers: header }))) ||
      (method === 'delete' && (await axios.delete(url, { headers: header })));

      if(response.data.reason === '토큰이 유효하지 않습니다.'){
        const refreshToken = Cookies.get('refreshToken');
        if(refreshToken) {
          console.log(refreshToken)
          const headers = { 'Authorizationrefresh' : 'Bearer ' + refreshToken}
          await axios.post(`${process.env.REACT_APP_API_ROOT}/auth/reissue`, {}, { headers })
          .then(response => {
            localStorage.setItem('token', response.data.accessToken);
            Cookies.set('refreshToken', response.data.refreshToken, { expires: 7 });
            window.location.reload('/')
          }).catch (err => {
            console.error(err)
          })
        }
      }

      return response
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response.data === '아이디 혹은 비밀번호를 확인해주세요' ) {
        alert(`${err.response.data}`);
        return null;
      } 
      if (err.response.data.message === '탈퇴한 회원입니다.') {
        alert('탈퇴한 회원입니다. 다시 로그인해주세요')
        window.location.reload('/')
      }
      if (err.response.data.msg === '해당 사용자는 권한이 없습니다') {
        alert('사장님 아이디를 새로 만들어주세요!')
        logoutActionHandler();
        window.location.reload('/')
      }
    }

    console.log(err);
    return null;
  }
};

const GET = (url, header) => {
  const response = fetchAuth({ method: 'get', url, header });
  return response;
};

const POST = (url, data, header) => {
  const response = fetchAuth({ method: 'post', url, data, header });
  return response;
};

const PUT = async (url, data, header) => {
  const response = fetchAuth({ method: 'put', url, data, header });
  return response;
};

const DELETE = async (url, header) => {
  const response = fetchAuth({ method: 'delete', url, header });
  return response;
};

export { GET, POST, PUT, DELETE };