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
      borderStyle: "solid",
    }}
  />
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "calc(100vh - 64px)", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDGzOCfMaPrmtJ2Pke0wdIzkWCRLPloeQA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={(a, b, c) => console.log(a, b, c)}
        >
          <DotMarker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            color="yellow"
            onClick={() => console.log("clicked")}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
