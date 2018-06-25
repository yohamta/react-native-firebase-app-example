import { PHOTO_SNAPPED } from './types';

export const photoSnapped = (photo, navigation) => {
  navigation.navigate('Post');
  return {
    type: PHOTO_SNAPPED,
    payload: photo,
  };
};
