import reducer from '../channel'

describe('channel reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  });

  it('should handle GET_CHANNELS_REQUEST', () => {
    expect(
      reducer([], {
        type: 'GET_CHANNELS_REQUEST',
      })
    ).toEqual({
      loadingChannels: true,
    })
  });

  it('should handle GET_CHANNELS_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'GET_CHANNELS_SUCCESS',
        payload: [{
          id: 1,
          name: 'MOCK_CHANNEL'
        }]
      })
    ).toEqual({
      loadingChannels: false,
      channels: [{
        id: 1,
        name: 'MOCK_CHANNEL'
      }]
    })
  });

  it('should handle GET_CHANNELS_FAILURE', () => {
    expect(
      reducer([], {
        type: 'GET_CHANNELS_FAILURE',
      })
    ).toEqual({
      loadingChannels: false,
    })
  });

  it('should handle GET_CHANNEL_REQUEST', () => {
    expect(
      reducer([], {
        type: 'GET_CHANNEL_REQUEST',
      })
    ).toEqual({
      loadingChannels: true,
    })
  });

  it('should handle GET_CHANNEL_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'GET_CHANNEL_SUCCESS',
        payload: {
          id: 1,
          name: 'MOCK_CHANNEL'
        },
      })
    ).toEqual({
      loadingChannels: false,
      channel: {
        id: 1,
        name: 'MOCK_CHANNEL'
      },
    })
  });

  it('should handle GET_CHANNEL_FAILURE', () => {
    expect(
      reducer([], {
        type: 'GET_CHANNEL_FAILURE',
      })
    ).toEqual({
      loadingChannels: false,
    })
  });

  it('should handle CREATE_CHANNEL_REQUEST', () => {
    expect(
      reducer([], {
        type: 'CREATE_CHANNEL_REQUEST',
      })
    ).toEqual({
      isCreatingChannel: true,
    })
  });

  it('should handle CREATE_CHANNEL_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'CREATE_CHANNEL_SUCCESS',
      })
    ).toEqual({
      isCreatingChannel: false,
    })
  });

  it('should handle CREATE_CHANNEL_FAILURE', () => {
    expect(
      reducer([], {
        type: 'CREATE_CHANNEL_FAILURE',
      })
    ).toEqual({
      isCreatingChannel: false,
    })
  });

  it('should handle EDIT_CHANNEL_REQUEST', () => {
    expect(
      reducer([], {
        type: 'EDIT_CHANNEL_REQUEST',
      })
    ).toEqual({
      isEditingChannel: true,
    })
  });

  it('should handle EDIT_CHANNEL_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'EDIT_CHANNEL_SUCCESS',
      })
    ).toEqual({
      isEditingChannel: false,
    })
  });

  it('should handle EDIT_CHANNEL_FAILURE', () => {
    expect(
      reducer([], {
        type: 'EDIT_CHANNEL_FAILURE',
      })
    ).toEqual({
      isEditingChannel: false,
    })
  });

  it('should handle ADD_DEVICE_TO_CHANNEL_REQUEST', () => {
    expect(
      reducer([], {
        type: 'ADD_DEVICE_TO_CHANNEL_REQUEST',
      })
    ).toEqual({
      isAddingDeviceToChannel: true,
    })
  });

  it('should handle ADD_DEVICE_TO_CHANNEL_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'ADD_DEVICE_TO_CHANNEL_SUCCESS',
      })
    ).toEqual({
      isAddingDeviceToChannel: false,
    })
  });

  it('should handle ADD_DEVICE_TO_CHANNEL_FAILURE', () => {
    expect(
      reducer([], {
        type: 'ADD_DEVICE_TO_CHANNEL_FAILURE',
      })
    ).toEqual({
      isAddingDeviceToChannel: false,
    })
  });


});