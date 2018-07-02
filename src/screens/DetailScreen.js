import React from 'react';
import { View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from 'prop-types';

const Detail = ({ navigation }) => {
  const url = navigation.state.params.item.photoUrl; // eslint-disable-line
  const images = [{ url }];
  return (
    <View style={{ flex: 1 }}>
      <ImageViewer imageUrls={images} />
    </View>
  );
};

Detail.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        item: PropTypes.shape({
          photoUrl: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Detail;
