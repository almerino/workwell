import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// In case of marker required, refer to: https://github.com/PaulLeCam/react-leaflet/issues/255

function MainMap({ position = [51.505, -0.09] }) {
  return (
    <Map center={position} zoom={13}>
      <TileLayer
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
}

export default MainMap;
