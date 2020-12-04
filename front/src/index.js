import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'modules/Root';

import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ModalProvider } from 'styled-react-modal';
import { SpecialModalBackground } from 'components/molecules/Modal';
import { NotificationProvider } from './support/context/NotificationContext';

import 'styles.scss';
import { isDevelopment } from 'environment'

const developmentApiUrl = 'http://188.165.16.160:5005/graphql';
const localHostApiUrl = 'http://localhost:5005/graphql';

const httpLink = createHttpLink({
  uri: isDevelopment ? developmentApiUrl : localHostApiUrl,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <NotificationProvider>
      <ModalProvider backgroundComponent={SpecialModalBackground}>
        <ApolloProvider client={client}>
          <Root />
        </ApolloProvider>
      </ModalProvider>
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
