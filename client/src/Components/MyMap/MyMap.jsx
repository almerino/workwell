import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import L from "leaflet";
import * as d3 from "d3";
import "leaflet/dist/leaflet.css";

class MyMap extends Component {
  componentWillUpdate({ data }) {
    if (data.cities) {
      const self = this;
      const cities = [];

      d3.select("g").remove();
      this.g = this.svg.append("g");

      if (data.cities.length) {
        data.cities.forEach(function(d) {
          const city = { ...d, LatLng: new L.LatLng(d.lat, d.lng) };
          cities.push(city);
          self.bounds.extend(city.LatLng);
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

export const citiesQuery = gql`
  query CitiesQuery {
    cities: allCities {
      id
      placeId
      description
      lat
      lng
    }
  }
`;

export const SimpleMap = MyMap;

export default graphql(citiesQuery)(MyMap);
