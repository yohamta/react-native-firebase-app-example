import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Camera, Permissions } from 'expo';
import { RkButton } from 'react-native-ui-kitten';

class HomeScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  camera = null;

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

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
      const photo = await this.camera.takePictureAsync();
      console.log(photo);
      this.props.navigation.navigate('Post');
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={ref => { this.camera = ref; }}
        >
        </Camera>
        <View style={{ height: 100, flexDirection: 'row' }}>
          <RkButton
            style={{ alignSelf: 'center', height: 50 }}
            onPress={this.onPress.bind(this)}
          >
            Flip
          </RkButton>
          <RkButton
            style={{ alignSelf: 'center', height: 50 }}
            onPress={this.onSnap.bind(this)}
          >
            Snap
          </RkButton>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
