import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { store } from "./redux/store"
import 'bootstrap/dist/css/bootstrap.min.css';
import './designsystem/main.scss';

import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// import GraphQLClient from './services/graphql/graphqlclient'
// import GraphQLClientContext from './utils/graphqlcontext';

// const client = new GraphQLClient({
//   baseURL: 'http://localhost:5005',
//   headers: {
//     Authorization: `bearer ${
//       process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
//     }`,
//   },
// });

const httpLink = createHttpLink({
  uri: 'https://48p1r2roz4.sse.codesandbox.io'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
        </ApolloProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
