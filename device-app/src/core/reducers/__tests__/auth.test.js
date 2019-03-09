import reducer from '../auth'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'LOGIN_SUCCESS',
        account: { name: 'MOCK_NAME' },
      })
    ).toEqual({
      account: { name: 'MOCK_NAME' },
    })
  });

  it('should handle ACCOUNT_FETCH_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'ACCOUNT_FETCH_SUCCESS',
        account: { name: 'MOCK_NAME' },
      })
    ).toEqual({
      account: { name: 'MOCK_NAME' },
    })
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'LOGOUT_SUCCESS',
      })
    ).toEqual({
      account: null
    })
  });
});