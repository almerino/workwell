import React, { Component } from "react";
import Map from "../Components/Map/Map";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-map">
          <Map />
        </div>
      </div>
    );
  }
}

export default App;
