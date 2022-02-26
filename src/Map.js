import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

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
      lat: 50.4456484,
      lng: 30.5389313,
    },
    zoom: 4,
  };

  render() {
    const { markers, setSelectedMarker } = this.props;

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDGzOCfMaPrmtJ2Pke0wdIzkWCRLPloeQA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={(a, b, c) => console.log(a, b, c)}
        >
          {markers &&
            markers.map((marker, index) => (
              <DotMarker
                key={index}
                lat={marker.lat}
                lng={marker.lng}
                color="yellow"
                onClick={() => setSelectedMarker(marker.data)}
              />
            ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
