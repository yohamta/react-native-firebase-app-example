import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Easing, Animated } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons'; // eslint-disable-line
import { TimelineScreen, HomeScreen, PostScreen } from './screens';
import { loginSuccess } from './actions';

const navigationOptions = {
  headerTitle: 'Paintings',
  headerTitleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
  },
};

const transitionConfig = () => ({
  transitionSpec: {
    duration: 750,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    });
    return { transform: [{ translateX }] };
  },
});

const RootStack = createStackNavigator(
  {
    Timeline: {
      screen: TimelineScreen,
      navigationOptions: navigation => ({
        ...navigationOptions,
        headerRight: (
          <View style={{ marginRight: 8 }}>
            <FontAwesome.Button
              name="plus-square"
              size={32}
              backgroundColor="rgba(0,0,0,0)"
              color="#a167bf"
              onPress={() => {
                navigation.navigation.navigate('Home');
              }}
              iconStyle={{ alignSelf: 'center', marginLeft: 10 }}
              style={{
                height: 44,
                padding: 0,
              }}
            />
          </View>
        ),
      }),
    },
    Home: {
      screen: HomeScreen,
      navigationOptions,
    },
    Post: {
      screen: PostScreen,
      navigationOptions,
    },
  },
  {
    transitionConfig,
  }
);

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
      require('firebase/firestore'); // eslint-disable-line global-require
      const firestore = firebase.firestore();
      const settings = { timestampsInSnapshots: true };
      firestore.settings(settings);
    }
  }

  render() {
    return <RootStack />;
  }
}

Root.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default connect(
  null,
  { loginSuccess }
)(Root);
