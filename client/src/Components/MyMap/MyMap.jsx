import React, { Component } from "react";
import L from "leaflet";
import * as d3 from "d3";
import "leaflet/dist/leaflet.css";

class MyMap extends Component {
  componentWillUpdate({ cities }) {
    const self = this;

    cities.forEach(function(d) {
      d.LatLng = new L.LatLng(d.location.lat, d.location.lng);
      self.bounds.extend(d.LatLng);
    });

    const feature = self.g
      .selectAll("circle")
      .data(cities)
      .enter()
      .append("circle")
      .style("stroke", "black")
      .style("opacity", 0.6)
      .style("fill", "red")
      .attr("r", 20);

    self.map.on("viewreset", update);
    self.map.fitBounds(self.bounds);

    update();

    function update() {
      feature.attr("transform", function(d) {
        return (
          "translate(" +
          self.map.latLngToLayerPoint(d.LatLng).x +
          "," +
          self.map.latLngToLayerPoint(d.LatLng).y +
          ")"
        );
      });
    }
  }

  componentDidMount() {
    this.map = L.map("map", { zoomControl: false }).setView(
      [48.864716, 2.349014],
      13
    );

    this.mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + this.mapLink + " Contributors",
      maxZoom: 14
    }).addTo(this.map);
    L.control.zoom({ position: "bottomright" }).addTo(this.map);
    // L.svg().addTo(this.map);
    this.map._initPathRoot();

    /* We simply pick up the SVG from the map object */
    this.svg = d3.select("#map").select("svg");
    this.g = this.svg.append("g");

    this.bounds = new L.LatLngBounds();
  }

  render() {
    return <div id="map" />;
  }
}

export default MyMap;
