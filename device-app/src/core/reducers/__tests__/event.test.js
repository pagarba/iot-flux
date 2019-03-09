import reducer from '../event'

describe('event reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  });

  it('should handle GET_EVENTS_REQUEST', () => {
    expect(
      reducer([], {
        type: 'GET_EVENTS_REQUEST',
      })
    ).toEqual({
      loadingEvents: true,
    })
  });

  it('should handle GET_EVENTS_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'GET_EVENTS_SUCCESS',
        payload: [{
          name: 'MOCK EVENT',
        }],
      })
    ).toEqual({
      loadingEvents: false,
      events: [{
        name: 'MOCK EVENT',
      }]
    })
  });

  it('should handle GET_EVENTS_FAILURE', () => {
    expect(
      reducer([], {
        type: 'GET_EVENTS_FAILURE',
      })
    ).toEqual({
      loadingEvents: false,
      events: { messages: [] }
    })
  });

  it('should handle GET_EVENT_REQUEST', () => {
    expect(
      reducer([], {
        type: 'GET_EVENT_REQUEST',
      })
    ).toEqual({
      loadingEvents: true,
    })
  });

  it('should handle GET_EVENT_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'GET_EVENT_SUCCESS',
        payload: {
          name: 'MOCK EVENT',
        }
      })
    ).toEqual({
      loadingEvents: false,
      event: {
        name: 'MOCK EVENT',
      }
    })
  });

  it('should handle GET_EVENT_FAILURE', () => {
    expect(
      reducer([], {
        type: 'GET_EVENT_FAILURE',
      })
    ).toEqual({
      loadingEvents: false,
    })
  });

  it('should handle CREATE_EVENT_REQUEST', () => {
    expect(
      reducer([], {
        type: 'CREATE_EVENT_REQUEST',
      })
    ).toEqual({
      isCreatingEvent: true,
    })
  });

  it('should handle CREATE_EVENT_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'CREATE_EVENT_SUCCESS',
      })
    ).toEqual({
      isCreatingEvent: false,
    })
  });

  it('should handle CREATE_EVENT_FAILURE', () => {
    expect(
      reducer([], {
        type: 'CREATE_EVENT_FAILURE',
      })
    ).toEqual({
      isCreatingEvent: false,
    })
  });

  it('should handle EDIT_EVENT_REQUEST', () => {
    expect(
      reducer([], {
        type: 'EDIT_EVENT_REQUEST',
      })
    ).toEqual({
      isEditingEvent: true,
    })
  });

  it('should handle EDIT_EVENT_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'EDIT_EVENT_SUCCESS',
      })
    ).toEqual({
      isEditingEvent: false,
    })
  });

  it('should handle EDIT_EVENT_FAILURE', () => {
    expect(
      reducer([], {
        type: 'EDIT_EVENT_FAILURE',
      })
    ).toEqual({
      isEditingEvent: false,
    })
  });
});