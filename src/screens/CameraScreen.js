import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Camera, Permissions } from 'expo';
import { RkButton } from 'react-native-ui-kitten';
import { StyleSheet } from 'react-native-stylesheet-merge';
import { Spinner } from '../common/components';
import { photoSnapped } from '../actions';

class CameraScreen extends Component {
  camera = null;

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    loading: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  // Flip Camera
  onPress() {
    const { type } = this.state;
    this.setState({
      type:
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  }

  onSnap() {
    if (this.camera) {
      this.setState({
        loading: true,
      });
      this.camera
        .takePictureAsync()
        .then(photo => {
          this.setState({
            loading: false,
          });
          this.props.photoSnapped({
            photo,
            navigation: this.props.navigation,
          });
        })
        .catch(err => {
          console.log('err:', err);
          this.setState({
            loading: false,
          });
        });
    }
  }

  renderSnapButton() {
    const { buttonStyle, buttonContainerStyle } = styles;
    if (this.state.loading) {
      return (
        <View style={{ height: 60 }}>
          <Spinner />
        </View>
      );
    }
    return (
      <View style={buttonContainerStyle}>
        <RkButton
          style={buttonStyle}
          rkType="rounded"
          onPress={this.onSnap.bind(this)}
        >
          Snap
        </RkButton>
      </View>
    );
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { containerStyle, cameraStyle } = styles;

    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={containerStyle}>
        <Camera
          style={cameraStyle}
          type={this.state.type}
          ref={ref => {
            this.camera = ref;
          }}
        />
        {this.renderSnapButton()}
      </View>
    );
  }
}
CameraScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  photoSnapped: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cameraStyle: {
    flex: 1,
  },
  buttonContainerStyle: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    alignSelf: 'center',
  },
});

export default connect(
  null,
  { photoSnapped }
)(CameraScreen);
