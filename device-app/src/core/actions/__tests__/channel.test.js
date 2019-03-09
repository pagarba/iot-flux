import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../channel'
import moxios from 'moxios';
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('channel actions', () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('createChannel', () => {
    moxios.stubRequest('/channels', {
      status: 200,
      response: { id: 1, name: 'MOCK CHANNEL' },
    });

    const expectedActions = [
      { type: 'CREATE_CHANNEL_REQUEST' },
      {
        type: 'CREATE_CHANNEL_SUCCESS',
        payload: { id: 1, name: 'MOCK CHANNEL' },
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.createChannel({name: 'MOCK_CHANNEL'})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('editChannel', () => {
    moxios.stubRequest('/channels/1', {
      status: 200,
      response: { id: 1, name: 'MOCK CHANNEL UPDATED' },
    });

    const expectedActions = [
      { type: 'EDIT_CHANNEL_REQUEST' },
      {
        type: 'EDIT_CHANNEL_SUCCESS',
        payload: { id: 1, name: 'MOCK CHANNEL UPDATED' },
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.editChannel(1, {name: 'MOCK_CHANNEL'})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('getChannels', () => {
    moxios.stubRequest('/channels', {
      status: 200,
      response: [
        { id: 1, name: 'MOCK CHANNEL 1' },
        { id: 2, name: 'MOCK CHANNEL 2' }
      ],
    });

    const expectedActions = [
      { type: 'GET_CHANNELS_REQUEST' },
      {
        type: 'GET_CHANNELS_SUCCESS',
        payload: [
          { id: 1, name: 'MOCK CHANNEL 1' },
          { id: 2, name: 'MOCK CHANNEL 2' }
        ],
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.getChannels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('getChannel', () => {
    moxios.stubRequest('/channels/1', {
      status: 200,
      response: { id: 1, name: 'MOCK CHANNEL' },
    });

    const expectedActions = [
      { type: 'GET_CHANNEL_REQUEST' },
      {
        type: 'GET_CHANNEL_SUCCESS',
        payload: { id: 1, name: 'MOCK CHANNEL' },
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.getChannel(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('deleteChannel', () => {
    moxios.stubRequest('/channels/1', {
      status: 200,
      response: { id: 1, name: 'MOCK CHANNEL' },
    });

    const expectedActions = [
      { type: 'DELETE_CHANNEL_REQUEST' },
      {
        type: 'DELETE_CHANNEL_SUCCESS',
        payload: { id: 1, name: 'MOCK CHANNEL' },
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.deleteChannel(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('addDeviceToChannel', () => {
    moxios.stubRequest('/channels/1/things/1', {
      status: 200,
      response: 'SUCCESSFULLY ADDED DEVICE',
    });

    const expectedActions = [
      { type: 'ADD_DEVICE_TO_CHANNEL_REQUEST' },
      {
        type: 'ADD_DEVICE_TO_CHANNEL_SUCCESS',
        payload: 'SUCCESSFULLY ADDED DEVICE',
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.addDeviceToChannel(1, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('deleteDeviceFromChannel', () => {
    moxios.stubRequest('/channels/1/things/1', {
      status: 200,
      response: 'SUCCESSFULLY DELETED DEVICE',
    });

    const expectedActions = [
      { type: 'DELETE_DEVICE_FROM_CHANNEL_REQUEST' },
      {
        type: 'DELETE_DEVICE_FROM_CHANNEL_SUCCESS',
        payload: 'SUCCESSFULLY DELETED DEVICE',
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.deleteDeviceFromChannel(1, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
});

