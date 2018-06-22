import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './src/screens';

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
});

export default () => <RootStack />;
