import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; // eslint-disable-line
import PropTypes from 'prop-types';

const FBLoginButton = ({ onPress }) => (
  <FontAwesome.Button
    name="facebook"
    backgroundColor="#4360B5"
    color="#fff"
    onPress={onPress}
    style={{ alignSelf: 'center' }}
    underlayColor="#4360B5"
    activeOpacity={1}
  >
    Login with Facebook
  </FontAwesome.Button>
);

FBLoginButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export { FBLoginButton };
