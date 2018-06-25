import React, { Component } from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RkButton, RkTextInput, RkTheme } from 'react-native-ui-kitten';
import { Spinner } from '../common/components';
import StyleSheet from '../common/StyleSheet';
import { createObject } from '../common/Functions';

class PostScreen extends Component {
  onPress() {}

  onPressHideKeyboard() {
    console.log('onPressHideKeyboard');
    Keyboard.dismiss();
  }

  render() {
    const {
      containerStyle,
      imageContainerStyle,
      imageStyle,
      inputContainerStyle,
      buttonStyle,
    } = styles;
    if (this.props.photo == null) {
      return (
        <View style={{ flex: 1 }}>
          <Spinner />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={this.onPressHideKeyboard.bind(this)}>
          <View style={containerStyle}>
            <View style={imageContainerStyle}>
              <Image
                style={imageStyle}
                source={{ uri: this.props.photo.uri }}
                resizeMode="contain"
              />
            </View>
            <View style={inputContainerStyle}>
              <RkTextInput
                placeholder="Comment"
                multiline
                rkType="post"
                inputStyle={{ textAlignVertical: 'top' }}
              />
              <RkButton
                rkType="rounded"
                onPress={this.onPress.bind(this)}
                style={buttonStyle}
              >
                Post
              </RkButton>
            </View>
            <View style={{ height: 100 }} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
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

RkTheme.setType(
  'RkTextInput',
  'post',
  createObject({
    input: {
      borderWidth: 0.5,
      borderRadius: 8,
      borderColor: 'gray',
      alignSelf: 'stretch',
      paddingLeft: 16,
    },
    paddingRight: 16,
    flex: 1,
    underlineWidth: 0,
  })
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  imageContainerStyle: {
    flex: 1,
    paddingTop: 16,
  },
  imageStyle: {
    flex: 1,
    height: 300,
  },
  inputContainerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps)(PostScreen);
