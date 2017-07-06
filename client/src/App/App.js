import React, { Component } from "react";
import MyMap from "../Components/MyMap/MyMap";
import AppBar from "../Components/AppBar/AppBar";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <div className="App-map">
          <MyMap />
        </div>
      </div>
    );
  }
}

export default App;
