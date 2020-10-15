import { combineReducers } from 'redux';
import alert from './alert';
import rootReducer from './rootReducer';
import statistics from './statistics';
export default combineReducers({
  alert,
  rootReducer,
  statistics,
});
