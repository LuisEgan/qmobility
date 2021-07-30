import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@shopify/restyle";

import client from "./src/config/apolloClient";
import Router from "./src/navigation/Router";
import theme from "./src/config/Theme";

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider {...{ theme }}>
      <Router />
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
