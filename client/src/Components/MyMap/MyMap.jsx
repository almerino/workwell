import React, { Component } from "react";
import L from "leaflet";
import * as d3 from "d3";
import "leaflet/dist/leaflet.css";

class MyMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = L.map("map", { zoomControl: false }).setView(
      [48.864716, 2.349014],
      13
    );
    const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + mapLink + " Contributors",
      maxZoom: 18
    }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.svg().addTo(map);

    /* We simply pick up the SVG from the map object */
    const svg = d3.select("#map").select("svg"),
      g = svg.append("g");

    d3.json("circles.json", function(collection) {
      /* Add a LatLng object to each item in the dataset */
      collection.objects.forEach(function(d) {
        d.LatLng = new L.LatLng(
          d.circle.coordinates[0],
          d.circle.coordinates[1]
        );
      });

      const feature = g
        .selectAll("circle")
        .data(collection.objects)
        .enter()
        .append("circle")
        .style("stroke", "black")
        .style("opacity", 0.6)
        .style("fill", "red")
        .attr("r", 20);

      map.on("viewreset", update);
      update();

      function update() {
        feature.attr("transform", function(d) {
          return (
            "translate(" +
            map.latLngToLayerPoint(d.LatLng).x +
            "," +
            map.latLngToLayerPoint(d.LatLng).y +
            ")"
          );
        });
      }
    });
  }

  render() {
    return <div id="map" />;
  }
}

export default MyMap;
