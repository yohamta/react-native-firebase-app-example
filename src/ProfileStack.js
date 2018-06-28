import { createStackNavigator } from 'react-navigation';
import { ProfileScreen, LoginScreen } from './screens';
import transitionConfig from './common/TransitionConfig';

const navigationOptions = {
  headerTitle: 'Profile',
  headerTitleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
  },
};

export default createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions,
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions,
    },
  },
  {
    transitionConfig,
  }
);
