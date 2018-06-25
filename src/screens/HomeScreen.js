import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Camera, Permissions } from 'expo';
import { RkButton } from 'react-native-ui-kitten';
import { Spinner } from '../common/components';

class HomeScreen extends Component {
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

  async onSnap() {
    if (this.camera) {
      this.setState({
        loading: true,
      });
      const photo = await this.camera.takePictureAsync();
      this.setState({
        loading: false,
      });
      console.log(photo);
      this.props.navigation.navigate('Post');
    }
  }

  renderSnapButton() {
    const { buttonStyle } = styles;
    if (this.state.loading) {
      return (
        <RkButton style={buttonStyle} rkType="rounded">
          <Spinner />
        </RkButton>
      );
    }
    return (
      <RkButton
        style={buttonStyle}
        rkType="rounded"
        onPress={this.onSnap.bind(this)}
      >
        Snap
      </RkButton>
    );
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { containerStyle, cameraStyle, buttonContainerStyle } = styles;

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
        >
          <View style={{ flex: 1 }} />
          <View style={buttonContainerStyle}>{this.renderSnapButton()}</View>
        </Camera>
      </View>
    );
  }
}
HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = {
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
};

export default HomeScreen;
