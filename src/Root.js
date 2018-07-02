import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Config from './common/Config';
import { loginSuccess } from './actions';
import TabNavigator from './TabNavigator';

class Root extends Component {
  componentWillMount() {
    const firebase = require('firebase'); // eslint-disable-line global-require
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: Config.API_KEY,
        authDomain: Config.AUTH_DOMAIN,
        databaseURL: Config.DATABASE_URL,
        projectId: Config.PROJECT_ID,
        storageBucket: Config.STORAGE_BUCKET,
        messagingSenderId: Config.MESSAGING_SENDER_ID,
      });
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
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
