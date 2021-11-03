import React from "react";
import ReactDOM from "react-dom";
import Root from "modules/Root";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { ApolloProvider } from "@apollo/client";
import { requestRooms } from "./store/reducers/roomReducer";
import { requestMessages } from "./store/reducers/messageReducer";

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ModalProvider } from "styled-react-modal";
import { SpecialModalBackground } from "components/molecules/Modal";
import { NotificationProvider } from "./support/context/NotificationContext";

import { isDevelopment } from "environment";

import "style.css";
import config from '../config.json';
import LoginPage from './modules/Auth/LoginPage';

const developmentApiUrl = config.apps.PlanfiApi.url + "/graphql"
const localHostApiUrl = "http://localhost:9001/graphql"

const httpLink = createHttpLink({
  uri: isDevelopment ? developmentApiUrl : localHostApiUrl,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const logger = createLogger();
const rootReducer = combineReducers({
  requestRooms,
  requestMessages,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, logger))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationProvider>
        <ModalProvider backgroundComponent={SpecialModalBackground}>
          <ApolloProvider client={client}>
            <Root />
          </ApolloProvider>
        </ModalProvider>
      </NotificationProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
