import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const DotMarker = ({ color, onClick }) => (
  <div
    onClick={onClick}
    style={{
      width: "10px",
      height: "10px",
      background: color,
      borderRadius: "50%",
      borderWidth: "3px",
      borderColor: "gray",
      borderStyle: "solid"
    }}
  />
);

function SimpleMap ({latlng, setLatlng}){

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "300px", width: "300px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDGzOCfMaPrmtJ2Pke0wdIzkWCRLPloeQA" }}
          defaultCenter={{
            lat: 50.4456484,
            lng: 30.5389313,
          }}
          defaultZoom={4}
          onDragEnd={(data) => setLatlng([data.center.lat(), data.center.lng()])}
        >
          <DotMarker
            lat={latlng[0]}
            lng={latlng[1]}
            color="yellow"
          />
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;
