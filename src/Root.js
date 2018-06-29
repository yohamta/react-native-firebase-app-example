import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginSuccess } from './actions';
import TabNavigator from './TabNavigator';

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
          console.log({ user });
          this.props.loginSuccess(user);
        }
      });
      require('firebase/firestore'); // eslint-disable-line global-require
      const firestore = firebase.firestore();
      const settings = { timestampsInSnapshots: true };
      firestore.settings(settings);
    }
  }

  render() {
    return <TabNavigator />;
  }
}

Root.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default connect(
  null,
  { loginSuccess }
)(Root);
