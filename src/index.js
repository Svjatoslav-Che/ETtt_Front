import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {CookiesProvider} from 'react-cookie';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './services/reduxServices';

const store = createStore(reducer);

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App/>,
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
