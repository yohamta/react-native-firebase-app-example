import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { RkButton } from 'react-native-ui-kitten';

const WIN_WIDTH = Dimensions.get('window').width;

class PostScreen extends Component {
  render() {
    console.log(this.props.photo);
    return (
      <View style={{ flex: 1 }}>
        {/*<Image
          style={styles.imageStyle}
          source={{ uri: this.props.photo.uri }}
        />*/}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  photo: state.photo.photo,
});

const styles = {
  imageStyle: {
    width: WIN_WIDTH,
  },
};

export default connect(mapStateToProps)(PostScreen);
