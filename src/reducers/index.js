import { combineReducers } from 'redux';
import PhotoReducer from './PhotoReducer';
import AuthReducer from './AuthReducer';
import PaintingsReducer from './PaintingsReducer';

export default combineReducers({
  photo: PhotoReducer,
  auth: AuthReducer,
  paintings: PaintingsReducer,
});
