import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './src/screens';
import { PostScreen } from './src/screens';

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

export default () => <RootStack />;
