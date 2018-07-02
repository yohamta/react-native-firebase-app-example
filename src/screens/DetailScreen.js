import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from 'prop-types';
import moment from 'moment';
import { StyleSheet } from 'react-native-stylesheet-merge';

const Detail = ({ navigation }) => {
  console.log(navigation.state.params.item);
  const {
    photoUrl,
    title,
    message,
    authorName,
    createdAt,
  } = navigation.state.params.item;
  const images = [{ url: photoUrl }];
  return (
    <View style={styles.containerStyle}>
      <ImageViewer imageUrls={images} />
      <View style={styles.textContainerStyle}>
        <Text style={styles.textStyle}>{title}</Text>
        <Text style={styles.textStyle}>{message}</Text>
        <Text style={styles.textStyle}>{authorName}</Text>
        <Text style={styles.textStyle}>
          {createdAt != null
            ? moment(createdAt.toDate()).format('YYYY/MM/DD ddd HH:mm:ss')
            : ''}
        </Text>
      </View>
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

const styles = StyleSheet.create({
  textContainerStyle: {
    width: Dimensions.get('window').width,
    alignSelf: 'flex-end',
    position: 'absolute',
    flex: 1,
    paddingBottom: 10,
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  textStyle: {
    paddingHorizontal: 10,
    textAlign: 'right',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Detail;
