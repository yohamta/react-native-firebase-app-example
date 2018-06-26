import { combineReducers } from 'redux';
import PhotoReducer from './PhotoReducer';
import AuthReducer from './AuthReducer';
import TimelineReducer from './TimelineReducer';

export default combineReducers({
  photo: PhotoReducer,
  auth: AuthReducer,
  timeline: TimelineReducer,
});
