import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { StyleSheet } from 'react-native-stylesheet-merge';
import { Spinner } from '../common/components';

class Detail extends Component {
  state = {
    dimensions: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    loading: true,
  };

  onLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  };

  onLoadEnd = () => {
    this.setState({ loading: false });
  };

  renderLoading = () => {
    if (this.state.loading) {
      const { width, height } = this.state.dimensions;
      return (
        <View style={[styles.loadingContainerStyle, { width, height }]}>
          <Spinner />
        </View>
      );
    }
    return <View />;
  };

  render() {
    const {
      photoUrl,
      title,
      message,
      authorName,
      photoWidth,
      photoHeight,
      createdAt,
    } = this.props.navigation.state.params.item;
    const { width, height } = this.state.dimensions;
    const imageWidth = photoWidth * (width / photoWidth);
    const imageHeight = photoHeight * (width / photoWidth);
    return (
      <View style={styles.containerStyle} onLayout={this.onLayout}>
        {this.renderLoading()}
        <ImageZoom
          cropWidth={width}
          cropHeight={height}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
        >
          <Image
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
            source={{ uri: photoUrl }}
            onLoadEnd={this.onLoadEnd}
          />
        </ImageZoom>
        <View style={styles.textContainerStyle}>
          {title && <Text style={styles.textStyle}>{title}</Text>}
          {message && <Text style={styles.textStyle}>{message}</Text>}
          <Text style={styles.textStyle}>
            {createdAt != null
              ? moment(createdAt.toDate()).format('YYYY/MM/DD ddd HH:mm:ss')
              : ''}
          </Text>
          <Text style={styles.textStyle}>{authorName}</Text>
        </View>
      </View>
    );
  }
}

Detail.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        item: PropTypes.shape({
          photoUrl: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          message: PropTypes.string.isRequired,
          authorName: PropTypes.string.isRequired,
          photoWidth: PropTypes.number.isRequired,
          photoHeight: PropTypes.number.isRequired,
          createdAt: PropTypes.object.isRequired,
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
    backgroundColor: 'black',
  },
  textStyle: {
    paddingHorizontal: 10,
    textAlign: 'right',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loadingContainerStyle: {
    flex: 1,
    position: 'absolute',
    alignContent: 'center',
  },
});

export default Detail;
