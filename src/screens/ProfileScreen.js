import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // eslint-disable-line
import { RkCard, RkText } from 'react-native-ui-kitten';
import { loginWithFacebook } from '../actions';

class ProfileScreen extends Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync(FontAwesome.font);
    this.setState({ fontLoaded: true });
  }

  loginWithTwitter() {
    console.log(this.props);
    this.props.loginWithFacebook();
  }

  renderLoginButton() {
    if (this.props.user != null && this.state.fontLoaded) {
      return (
        <View style={{ margin: 10 }}>
          <FontAwesome.Button
            name="facebook"
            backgroundColor="#4360B5"
            color="#fff"
            onPress={() => {
              this.loginWithFacebook();
            }}
            style={{ alignSelf: 'center' }}
            underlayColor="#4360B5"
            activeOpacity={1}
          >
            Login with Facebook
          </FontAwesome.Button>
        </View>
      );
    }
    return <View />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RkCard>
          <View rkCardContent style={{ flexDirection: 'column' }}>
            <RkText style={{ fontWeight: 'bold' }}>{this.props.name}</RkText>
            <RkText>{this.props.bio}</RkText>
          </View>
          {this.renderLoginButton()}
        </RkCard>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  name: state.auth.name,
  bio: state.auth.bio,
});

export default connect(
  mapStateToProps,
  { loginWithFacebook }
)(ProfileScreen);
