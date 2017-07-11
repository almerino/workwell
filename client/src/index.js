import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import "./index.css";
import App from "./App/App";
import registerServiceWorker from "./registerServiceWorker";
import createPalette from "material-ui/styles/palette";
import blue from "material-ui/colors/blue";

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

export const client = new ApolloClient({ networkInterface });

const theme = createMuiTheme({
  palette: createPalette({
    primary: blue
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
