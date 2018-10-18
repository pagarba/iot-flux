import constants from '../types';

export default (state = {}, action) => {
  switch (action.type) {
    case constants.GET_EVENTS_REQUEST:
      return {
        ...state,
        loadingEvents: true,
      }
    case constants.GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loadingEvents: false,
      };
    case constants.GET_EVENTS_FAILURE:
      return {
        ...state,
        loadingEvents: false,
      }
    case constants.GET_EVENT_REQUEST:
      return {
        ...state,
        loadingEvents: true,
      }
    case constants.GET_EVENT_SUCCESS:
      return {
        ...state,
        event: action.payload,
        loadingEvents: false,
      };
    case constants.GET_EVENT_FAILURE:
      return {
        ...state,
        loadingEvents: false,
      }
    case constants.CREATE_EVENT_REQUEST:
      return {
        ...state,
        isCreatingEvent: true,
      }
    case constants.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        isCreatingEvent: false,
      }
    case constants.CREATE_EVENT_FAILURE:
      return {
        ...state,
        isCreatingEvent: false,
      }
    case constants.EDIT_EVENT_REQUEST:
      return {
        ...state,
        isEditingEvent: true,
      }
    case constants.EDIT_EVENT_SUCCESS:
      return {
        ...state,
        isEditingEvent: false,
      }
    case constants.EDIT_EVENT_FAILURE:
      return {
        ...state,
        isEditingEvent: false,
      }
    default:
      return state;
  }
}