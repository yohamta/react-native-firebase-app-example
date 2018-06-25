import { combineReducers } from 'redux';
import PhotoReducer from './PhotoReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  photo: PhotoReducer,
  auth: AuthReducer,
});
