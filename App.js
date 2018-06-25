import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { HomeScreen, PostScreen } from './src/screens';
import reducers from './src/reducers';

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

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};
