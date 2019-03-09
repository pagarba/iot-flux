import axios from 'axios';

import constants from '../types';


export const createEvent = (channelId, deviceKey, data) => dispatch => {
  delete axios.defaults.headers.common.authorization;
  const instance = axios.create({
    headers: {
      'Authorization': deviceKey,
      'Content-Type': 'application/senml+json'
    }
  });

  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.CREATE_EVENT_REQUEST,
    });

    instance.post(`/http/channels/${channelId}/messages`, data)
      .then(res => {
        dispatch({
          type: constants.CREATE_EVENT_SUCCESS,
          payload: res.data
        });

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.CREATE_EVENT_FAILURE,
          payload: error.data
        })

        reject();
      });

    axios.defaults.headers.common.authorization = localStorage.token;
  });
}

export const getEvents = (channelId, deviceKey) => dispatch => {
  delete axios.defaults.headers.common.authorization;

  const instance = axios.create({
    headers: {
      'Authorization': deviceKey,
    }
  });

  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.GET_EVENTS_REQUEST,
    });

    instance.get(`/reader/channels/${channelId}/messages?limit=100`)
      .then(res => {
        dispatch({
          type: constants.GET_EVENTS_SUCCESS,
          payload: res.data
        })
        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.GET_EVENTS_FAILURE,
          payload: error.data
        })
        reject();
      });

    axios.defaults.headers.common.authorization = localStorage.token;
  });
}

export const emptyEvents = () => dispatch => {
  dispatch({
    type: constants.GET_EVENTS_SUCCESS,
    payload: { messages: [] }
  });
};