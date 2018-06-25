import { combineReducers } from 'redux';
import PhotoReducer from './PhotoReducer';

export default combineReducers({
  photo: PhotoReducer,
});
