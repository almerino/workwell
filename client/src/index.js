import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import "./index.css";
import App from "./App/App";
import registerServiceWorker from "./registerServiceWorker";
import createPalette from "material-ui/styles/palette";
import blue from "material-ui/colors/blue";

const theme = createMuiTheme({
  palette: createPalette({
    primary: blue
  })
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
