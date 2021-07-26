import * as axiosInstance from 'axios';


let headers =  {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Credentials': 'true',
  'X-Requested-With': 'XMLHttpRequest'
};

const axios = axiosInstance.create({
  withCredentials: true,
  baseURL: 'https://palms.shoptropicals.com/',
  headers,
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  }
});

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  try {
    if (error.response.status === 401) {
      // localStorage.clear()
      // console.warn('Unauthorized access redirect. Probably expired token. Redirecting ...')
      // window.location.href = '/'
    }   
  } catch (error) {
    console.log(error);
  }
  return Promise.reject(error);
});

export default axios;