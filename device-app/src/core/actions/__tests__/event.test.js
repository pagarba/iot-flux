import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../event'
import moxios from 'moxios';
import expect from 'expect'

import '../../../utils/mock-localstorage';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('event actions', () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('createEvent', () => {
    moxios.stubRequest('/http/channels/1/messages', {
      status: 200,
      response: 'EVENT CREATED SUCCESSFULLY',
    });

    const expectedActions = [
      { type: 'CREATE_EVENT_REQUEST' },
      {
        type: 'CREATE_EVENT_SUCCESS',
        payload: 'EVENT CREATED SUCCESSFULLY',
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.createEvent(1, 'device-12345', { message: 'MOCK EVENT' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('getEvents', () => {
    moxios.stubRequest('/http/channels/1/messages?limit=100', {
      status: 200,
      response: [
        { message: 'MOCK EVENT 1' },
        { message: 'MOCK EVENT 2' },
      ],
    });

    const expectedActions = [
      { type: 'GET_EVENTS_REQUEST' },
      {
        type: 'GET_EVENTS_SUCCESS',
        payload: [
          { message: 'MOCK EVENT 1' },
          { message: 'MOCK EVENT 2' },
        ],
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.createEvent(1, 'device-12345')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
});

