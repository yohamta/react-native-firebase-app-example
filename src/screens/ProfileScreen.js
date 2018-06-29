import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // eslint-disable-line
import { RkCard, RkText } from 'react-native-ui-kitten';
import PropTypes from 'prop-types';
import { loginWithFacebook } from '../actions';

class ProfileScreen extends Component {
  async componentDidMount() {
    await Font.loadAsync(FontAwesome.font);
  }

  loginWithFacebook() {
    this.props.loginWithFacebook();
  }

  renderLoginButton() {
    if (this.props.isLoggedIn) {
      return <View />;
    }
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

  render() {
    const { displayName, photoURL } = this.props.user;
    return (
      <View style={{ flex: 1 }}>
        <RkCard>
          <View rkCardContent>
            <RkText style={{ fontSize: 28, fontWeight: 'bold' }}>
              {displayName}
            </RkText>
          </View>
          <View rkCardContent>
            <Image rkCardImg source={{ uri: `${photoURL}?type=large` }} />
          </View>
          {this.renderLoginButton()}
        </RkCard>
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(
  mapStateToProps,
  { loginWithFacebook }
)(ProfileScreen);
