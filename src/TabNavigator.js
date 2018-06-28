import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // eslint-disable-line
import { createBottomTabNavigator } from 'react-navigation';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

const navigationOptions = ({ navigation }) => ({
  // eslint-disable-next-line
  tabBarIcon: ({ focused, tintColor }) => {
    const { routeName } = navigation.state;
    let iconName;
    if (routeName === 'Home') {
      iconName = `ios-home${focused ? '' : '-outline'}`;
    } else if (routeName === 'Profile') {
      iconName = `ios-person${focused ? '' : '-outline'}`;
    }
    return <Ionicons name={iconName} size={25} color={tintColor} />;
  },
});

export default createBottomTabNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
  },
  {
    navigationOptions,
    tabBarOptions: {
      activeTintColor: '#a167bf',
      inactiveTintColor: 'gray',
    },
  }
);
