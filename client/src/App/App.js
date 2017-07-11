import React, { Component } from "react";
import MyMap from "../Components/MyMap/MyMap";
import SideBar from "../Components/SideBar/SideBar";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cities: [] };
    this.addToMap = this.addToMap.bind(this);
  }

  addToMap(cities) {
    this.setState({ cities });
  }

  render() {
    return (
      <div className="app">
        <div className="content">
          <SideBar addToMap={this.addToMap} />
          <div className="map">
            <MyMap cities={this.state.cities} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
