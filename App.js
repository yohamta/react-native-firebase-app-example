import React from 'react';
import { YellowBox } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Root from './src/Root';

YellowBox.ignoreWarnings(['Remote debugger', 'Setting a timer']);

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};
