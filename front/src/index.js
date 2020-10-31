/*
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from 'serviceWorker';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';
import 'designsystem/main.scss';

const apiURL = 'http://localhost:5005/graphql';

const httpLink = createHttpLink({
  uri: apiURL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'views/Root';

// eslint-disable-next-line no-undef
ReactDOM.render(<Root />, document.getElementById('root'));
