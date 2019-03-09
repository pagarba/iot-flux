import reducer from '../device'

describe('device reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  });

  it('should handle GET_DEVICES_REQUEST', () => {
    expect(
      reducer([], {
        type: 'GET_DEVICES_REQUEST',
      })
    ).toEqual({
      loadingDevices: true,
    })
  });

  it('should handle GET_DEVICES_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'GET_DEVICES_SUCCESS',
        payload: [{
          id: 1,
          name: 'MOCK DEVICE',
        }],
      })
    ).toEqual({
      loadingDevices: false,
      devices: [{
        id: 1,
        name: 'MOCK DEVICE',
      }]
    })
  });

  it('should handle GET_DEVICES_FAILURE', () => {
    expect(
      reducer([], {
        type: 'GET_DEVICES_FAILURE',
      })
    ).toEqual({
      loadingDevices: false,
    })
  });

  it('should handle GET_DEVICE_REQUEST', () => {
    expect(
      reducer([], {
        type: 'GET_DEVICE_REQUEST',
      })
    ).toEqual({
      loadingDevices: true,
    })
  });

  it('should handle GET_DEVICE_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'GET_DEVICE_SUCCESS',
        payload: {
          id: 1,
          name: 'MOCK DEVICE',
        }
      })
    ).toEqual({
      loadingDevices: false,
      device: {
        id: 1,
        name: 'MOCK DEVICE',
      }
    })
  });

  it('should handle GET_DEVICE_FAILURE', () => {
    expect(
      reducer([], {
        type: 'GET_DEVICE_FAILURE',
      })
    ).toEqual({
      loadingDevices: false,
    })
  });

  it('should handle CREATE_DEVICE_REQUEST', () => {
    expect(
      reducer([], {
        type: 'CREATE_DEVICE_REQUEST',
      })
    ).toEqual({
      isCreatingDevice: true,
    })
  });

  it('should handle CREATE_DEVICE_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'CREATE_DEVICE_SUCCESS',
      })
    ).toEqual({
      isCreatingDevice: false,
    })
  });

  it('should handle CREATE_DEVICE_FAILURE', () => {
    expect(
      reducer([], {
        type: 'CREATE_DEVICE_FAILURE',
      })
    ).toEqual({
      isCreatingDevice: false,
    })
  });

  it('should handle EDIT_DEVICE_REQUEST', () => {
    expect(
      reducer([], {
        type: 'EDIT_DEVICE_REQUEST',
      })
    ).toEqual({
      isEditingDevice: true,
    })
  });

  it('should handle EDIT_DEVICE_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'EDIT_DEVICE_SUCCESS',
      })
    ).toEqual({
      isEditingDevice: false,
    })
  });

  it('should handle EDIT_DEVICE_FAILURE', () => {
    expect(
      reducer([], {
        type: 'EDIT_DEVICE_FAILURE',
      })
    ).toEqual({
      isEditingDevice: false,
    })
  });
});