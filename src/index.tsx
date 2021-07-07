import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
  ApolloProvider,
  HttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const graphQLink = new HttpLink({
  uri: "https://graphql-weather-api.herokuapp.com/",
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: graphQLink,
  cache,
  credentials: "include",
  resolvers: {},
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
