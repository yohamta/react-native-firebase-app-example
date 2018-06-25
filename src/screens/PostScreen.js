import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

class PostScreen extends Component {
  renderPhoto() {
    if (this.props.photo == null) {
      return <View />;
    }
    return (
      <Image
        style={styles.imageStyle}
        source={{ uri: this.props.photo.uri }}
        resizeMode="center"
      />
    );
  }

  render() {
    console.log(this.props);
    return <View style={{ flex: 1 }}>{this.renderPhoto()}</View>;
  }
}

PostScreen.propTypes = {
  photo: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }),
};
PostScreen.defaultProps = {
  photo: null,
};

const mapStateToProps = state => ({
  photo: state.photo.photo,
});

const styles = {
  imageStyle: {
    width: WIN_WIDTH,
    height: WIN_HEIGHT,
  },
};

export default connect(mapStateToProps)(PostScreen);
