import { combineReducers } from 'redux';

import auth from './auth';
import device from './device';
import channel from './channel';
import event from './event';

export default combineReducers({
  auth,
  device,
  channel,
  event,
});