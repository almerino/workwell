import React, { Component } from "react";
import MyMap from "../Components/MyMap/MyMap";
import SideBar from "../Components/SideBar/SideBar";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="content">
          <SideBar />
          <div className="map">
            <MyMap />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
