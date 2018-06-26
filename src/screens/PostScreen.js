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
import { uploadPhoto } from '../actions';

class PostScreen extends Component {
  onPress() {
    this.props.uploadPhoto({
      photo: this.props.photo,
      message: 'hello',
      user: this.props.user,
    });
  }

  onPressHideKeyboard() {
    console.log('onPressHideKeyboard');
    Keyboard.dismiss();
  }

  renderButton() {
    const { buttonStyle } = styles;
    if (this.props.uploading) {
      return <Spinner style={{ alignSelf: 'center' }} />;
    }
    return (
      <RkButton
        rkType="rounded"
        onPress={this.onPress.bind(this)}
        style={buttonStyle}
      >
        Post
      </RkButton>
    );
  }

  render() {
    const {
      containerStyle,
      imageContainerStyle,
      imageStyle,
      inputContainerStyle,
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
              {this.renderButton()}
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
  uploadPhoto: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
PostScreen.defaultProps = {
  photo: null,
};

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

const mapStateToProps = state => ({
  photo: state.photo.photo,
  uploading: state.photo.uploading,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { uploadPhoto }
)(PostScreen);
