import axios from 'axios';
import { push } from 'react-router-redux';

import constants from '../types';
import { API_URL, TRIGX_PORT, TRIGX_SECERT } from '../../config';

export const login = (email, password) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: constants.LOGIN_REQUEST,
    });

    axios.post('/tokens', { email, password})
      .then(res => {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common.authorization = res.data.token;

        dispatch({
          type: constants.LOGIN_SUCCESS,
          token: res.data.token,
        });

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.LOGIN_FAILURE,
          error,
        });

        reject();
      });
  });
};

export const signup = (email, password) => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.CREATE_USER_REQUEST,
    });

    axios.defaults.baseURL = `${API_URL}:${TRIGX_PORT}`;

    axios.post('/trigxaccount', { email, password, secret: TRIGX_SECERT })
      .then(res => {
        dispatch({
          type: constants.CREATE_USER_SUCCESS,
          payload: res.data
        });

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.CREATE_USER_FAILURE,
          payload: error.data
        });

        reject();
      });

    axios.defaults.baseURL = API_URL;
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: constants.LOGOUT_SUCCESS
  });

  localStorage.removeItem('token');

  dispatch(push('/login'));
}

export const resetAccount = account => dispatch => {
  dispatch({
    type: constants.ACCOUNT_FETCH_SUCCESS,
    account,
  });
}