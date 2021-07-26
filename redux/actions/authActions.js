import Router from 'next/router';
import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import {  removeCookie } from '../../utils/cookie';

// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ email, password }, type) => {
  if (type !== 'signin' && type !== 'signup') {
    throw new Error('Wrong API call!');
  }
  return () => {
    let data = {
      username: email,
      password: password,
    };
    fetch('https://palms.shoptropicals.com/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    // axios.post('api/token/', data)
    //   .then((response) => {
    //     setCookie('token', response.data.token);
    //     Router.push('/');
    //     dispatch({type: AUTHENTICATE, payload: response.data.token});
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // throw new Error(err);
    //   });
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({type: AUTHENTICATE, payload: token});
  };
};

// removing the token
const deauthenticate = () => {
  return (dispatch) => {
    removeCookie('token');
    Router.push('/');
    dispatch({type: DEAUTHENTICATE});
  };
};


export default {
  authenticate,
  reauthenticate,
  deauthenticate,
};
