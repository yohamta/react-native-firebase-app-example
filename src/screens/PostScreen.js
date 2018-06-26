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
  state = {
    title: '',
    category: '',
    message: '',
  };

  onPress() {
    this.props.uploadPhoto({
      photo: this.props.photo,
      title: this.state.title,
      category: this.state.category,
      message: this.state.message,
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
      return (
        <View style={{ height: 40 }}>
          <Spinner style={{ alignSelf: 'center' }} />
        </View>
      );
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
                placeholder="Title"
                rkType="post"
                style={{ height: 40 }}
                onChangeText={title => this.setState({ title })}
              />
              <RkTextInput
                placeholder="Category"
                rkType="post"
                style={{ height: 40 }}
                onChangeText={category => this.setState({ category })}
              />
              <RkTextInput
                placeholder="Comment"
                multiline
                rkType="post"
                style={{ flex: 3, minHeight: 40 }}
                onChangeText={message => this.setState({ message })}
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
    underlineWidth: 0,
    marginVertical: 0,
  })
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  imageContainerStyle: {
    flex: 1,
    paddingVertical: 16,
  },
  imageStyle: {
    flex: 1,
    height: 250,
  },
  inputContainerStyle: {
    flex: 2,
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
