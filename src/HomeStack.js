import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // eslint-disable-line
import { TimelineScreen, CameraScreen, PostScreen } from './screens';
import transitionConfig from './common/TransitionConfig';

const navigationOptions = {
  headerTitle: 'Paintings',
  headerTitleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
  },
};

export default createStackNavigator(
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
              underlayColor="rgba(0,0,0,0)"
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
      screen: CameraScreen,
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
