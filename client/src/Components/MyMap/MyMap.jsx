import React, { Component } from "react";
import L from "leaflet";
import * as d3 from "d3";
import "leaflet/dist/leaflet.css";

class MyMap extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate({ cities }) {
    const self = this;

    console.log(cities);

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
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + this.mapLink + " Contributors",
      maxZoom: 18
    }).addTo(this.map);
    L.control.zoom({ position: "bottomright" }).addTo(this.map);
    L.svg().addTo(this.map);

    /* We simply pick up the SVG from the map object */
    this.svg = d3.select("#map").select("svg");
    this.g = this.svg.append("g");

    this.bounds = new L.LatLngBounds();

    // d3.json("circles.json", function(collection) {
    //   /* Add a LatLng object to each item in the dataset */
    //   collection.objects.forEach(function(d) {
    //     d.LatLng = new L.LatLng(
    //       d.circle.coordinates[0],
    //       d.circle.coordinates[1]
    //     );
    //   });

    //   const feature = g
    //     .selectAll("circle")
    //     .data(collection.objects)
    //     .enter()
    //     .append("circle")
    //     .style("stroke", "black")
    //     .style("opacity", 0.6)
    //     .style("fill", "red")
    //     .attr("r", 20);

    //   map.on("viewreset", update);
    //   update();

    //   function update() {
    //     feature.attr("transform", function(d) {
    //       return (
    //         "translate(" +
    //         map.latLngToLayerPoint(d.LatLng).x +
    //         "," +
    //         map.latLngToLayerPoint(d.LatLng).y +
    //         ")"
    //       );
    //     });
    //   }
    // });
  }

  render() {
    return <div id="map" />;
  }
}

export default MyMap;
