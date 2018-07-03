import React, { Component } from 'react';
import {
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RkButton } from 'react-native-ui-kitten';
import { StyleSheet } from 'react-native-stylesheet-merge';
import { Spinner, FBLoginButton } from '../common/components';
import { uploadPhoto, loginWithFacebook } from '../actions';

class PostScreen extends Component {
  state = {
    title: '',
    message: '',
  };

  onPress() {
    this.props.uploadPhoto({
      navigation: this.props.navigation,
      photo: this.props.photo,
      title: this.state.title,
      message: this.state.message,
      uid: this.props.user.uid,
      authorName: this.props.user.displayName,
    });
  }

  onPressHideKeyboard() {
    Keyboard.dismiss();
  }

  loginWithFacebook() {
    this.props.loginWithFacebook();
  }

  renderButton() {
    if (!this.props.isLoggedIn) {
      return (
        <View style={{ marginHorizontal: 16 }}>
          <FBLoginButton onPress={this.loginWithFacebook.bind(this)} />
        </View>
      );
    }
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
        style={styles.buttonStyle}
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
              <TextInput
                placeholder="Title"
                rkType="post"
                style={[styles.commentTextStyle, { height: 40 }]}
                onChangeText={title => this.setState({ title })}
                underlineColorAndroid="rgba(0,0,0,0)"
              />
              <TextInput
                placeholder="Comment"
                multiline
                style={[styles.commentTextStyle, { flex: 1 }]}
                onChangeText={message => this.setState({ message })}
                underlineColorAndroid="rgba(0,0,0,0)"
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
  loginWithFacebook: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
PostScreen.defaultProps = {
  photo: null,
};

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
  titleTextStyle: {
    height: 40,
  },
  commentTextStyle: {
    minHeight: 40,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'gray',
    alignSelf: 'stretch',
    paddingLeft: 16,
    marginHorizontal: 16,
    marginBottom: 10,
  },
});

const mapStateToProps = state => ({
  photo: state.photo.photo,
  uploading: state.photo.uploading,
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(
  mapStateToProps,
  { uploadPhoto, loginWithFacebook }
)(PostScreen);
