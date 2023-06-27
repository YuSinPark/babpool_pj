import axios from "axios";
import Cookies from "js-cookie";

const fetchAuth = async(fetchData) => {
    const { method, url, data, header } = fetchData;

    try {
        const response = 
            (method === 'get' && (await axios.get(url, {headers: header }))) ||
            (method === 'post' && (await axios.post(url, data, {headers: header }))) ||
            (method === 'put' && (await axios.put(url, data, { headers: header }))) ||
            (method === 'delete' && (await axios.delete(url, { headers: header })));

            if(response.data.reason === '토큰이 유효하지 않습니다.'){
                const refreshToken = Cookies.get('refreshToken');
                if(refreshToken) {
                  console.log(refreshToken)
                  const headers = { 'Authorizationrefresh' : 'Bearer ' + refreshToken}
                  await axios.post('/auth/reissue', {}, { headers })
                  .then(response => {
                    localStorage.setItem('token', response.data.accessToken);
                    Cookies.set('refreshToken', response.data.refreshToken, { expires: 7 });
                    window.location.reload('/')
                  }).catch (err => {
                    console.error(err)
                  })
                }
            }
              
            return response;
    } catch (err) {
        console.log(err);
        return null;
    }   
}

const GET = (url, header) => {
    const response = fetchAuth({ method: 'get', url, header });
    return response;
}

const POST = (url, data, header) => {
    const response = fetchAuth({ method: 'post', url, data, header });
    return response;
}

const PUT = async (url, data, header) => {
    const response = fetchAuth({ method: 'put', url, data, header });
    return response;
}

const DELETE = async (url, header) => {
    const response = fetchAuth({ method: 'delete', url, header });
    return response;
}

export { GET, POST, PUT, DELETE };