import React from 'react';

import AppContainer from './src/navigation/router';
import store from './src/store/index';
import {Provider} from 'react-redux';

class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
