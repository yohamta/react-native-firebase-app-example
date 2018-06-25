import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HomeScreen, PostScreen } from './screens';
import { loginSuccess, loginAnonymously } from './actions';

const navigationOptions = {
  headerTitle: 'Paintings',
  headerTitleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
  },
};

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions,
  },
  Post: {
    screen: PostScreen,
    navigationOptions,
  },
});

class Root extends Component {
  componentWillMount() {
    const firebase = require('firebase'); // eslint-disable-line global-require
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCCTBtJeAqoamDzT4LfKSQEfxmYhpvj9sM',
        authDomain: 'rn-paintings.firebaseapp.com',
        databaseURL: 'https://rn-paintings.firebaseio.com',
        projectId: 'rn-paintings',
        storageBucket: 'rn-paintings.appspot.com',
        messagingSenderId: '465400638321',
      });
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.loginSuccess(user);
        }
      });
    }
    this.props.loginAnonymously();
  }

  render() {
    return <RootStack />;
  }
}

Root.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
  loginAnonymously: PropTypes.func.isRequired,
};

export default connect(
  null,
  { loginSuccess, loginAnonymously }
)(Root);
