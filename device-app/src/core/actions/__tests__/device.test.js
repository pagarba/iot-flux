import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../device'
import moxios from 'moxios';
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('device actions', () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('createDevice', () => {
    moxios.stubRequest('/things', {
      status: 200,
      response: { id: 1, name: 'MOCK DEVICE' },
    });

    const expectedActions = [
      { type: 'CREATE_DEVICE_REQUEST' },
      {
        type: 'CREATE_DEVICE_SUCCESS',
        payload: { id: 1, name: 'MOCK DEVICE' },
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.createDevice({name: 'MOCK DEVICE'})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('editDevice', () => {
    moxios.stubRequest('/things/1', {
      status: 200,
      response: { name: 'MOCK DEVICE' },
    });

    const expectedActions = [
      { type: 'EDIT_DEVICE_REQUEST' },
      {
        type: 'EDIT_DEVICE_SUCCESS',
        payload: { name: 'MOCK DEVICE' },
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.editDevice(1, {name: 'MOCK DEVICE'})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('getDevices', () => {
    moxios.stubRequest('/things', {
      status: 200,
      response: [
        { id: 1, name: 'MOCK DEVICE 1' },
        { id: 2, name: 'MOCK DEVICE 2' },
      ],
    });

    const expectedActions = [
      { type: 'GET_DEVICES_REQUEST' },
      {
        type: 'GET_DEVICES_SUCCESS',
        payload: [
          { id: 1, name: 'MOCK DEVICE 1' },
          { id: 2, name: 'MOCK DEVICE 2' },
        ],
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.getDevices()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('getDevice', () => {
    moxios.stubRequest('/things/1', {
      status: 200,
      response: { id: 1, name: 'MOCK DEVICE' },
    });

    const expectedActions = [
      { type: 'GET_DEVICE_REQUEST' },
      {
        type: 'GET_DEVICE_SUCCESS',
        payload: { id: 1, name: 'MOCK DEVICE' },
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.getDevice(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('deleteDevice', () => {
    moxios.stubRequest('/things/1', {
      status: 200,
      response: { id: 1, name: 'MOCK DEVICE' },
    });

    const expectedActions = [
      { type: 'DELETE_DEVICE_REQUEST' },
      {
        type: 'DELETE_DEVICE_SUCCESS',
        payload: { id: 1, name: 'MOCK DEVICE' },
      },
    ];

    const store = mockStore({});
    store.dispatch(actions.deleteDevice(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
});

