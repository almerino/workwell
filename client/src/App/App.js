import React from "react";
import MyMap from "../Components/MyMap/MyMap";
import Menu from "../Components/Menu/Menu";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="content">
        <Menu />
        <div className="map">
          <MyMap />
        </div>
      </div>
    </div>
  );
}

export default App;
