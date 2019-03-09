import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../auth'
import expect from 'expect'

import '../../../utils/mock-localstorage';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('auth actions', () => {
  it('login', () => {
    const expectedActions = [
      {
        type: 'LOGIN_SUCCESS',
        account: { name: 'MOCK NAME' },
      },
      {
        payload: {
          args: [
            '/dashboard',
          ],
          method: 'push',
        },
        type: '@@router/CALL_HISTORY_METHOD'
      }
    ];

    const store = mockStore({});
    store.dispatch(actions.login({name: 'MOCK NAME'}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('logout', () => {
    const expectedActions = [
      {
        type: 'LOGOUT_SUCCESS',
      },
      {
        payload: {
          args: [
            '/login',
          ],
          method: 'push',
        },
        type: '@@router/CALL_HISTORY_METHOD'
      }
    ];

    const store = mockStore({});
    store.dispatch(actions.logout());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('resetAccount', () => {
    const expectedActions = [
      {
        type: 'ACCOUNT_FETCH_SUCCESS',
        account: { name: 'MOCK NAME' },
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.resetAccount({ name: 'MOCK NAME' }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

