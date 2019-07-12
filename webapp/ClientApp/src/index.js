import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import setAuthorizationToken from './store/AuthStore/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import * as Auth from './store/AuthStore/Auth'


// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(Auth.actionCreators.setCurrentUser(jwt.decode(localStorage.jwtToken)));
}


const rootElement = document.getElementById('root');


ReactDOM.render(
  <Provider store={store}>
        <ConnectedRouter history={history}>
            <App auth={store} />
    </ConnectedRouter>
  </Provider>,
  rootElement);

registerServiceWorker();
