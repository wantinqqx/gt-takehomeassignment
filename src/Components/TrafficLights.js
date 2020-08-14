import React from "react";
import axios from "axios";

export default class TrafficLights extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    trafficLocations: [],
  };

  componentDidMount() {
    axios
      .get("https://api.data.gov.sg/v1/transport/traffic-images", {
        params: {
          date: this.props.dateTime,
        },
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
        this.setState({ trafficLocations: response.data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return <ul></ul>;
  }
}

//   {this.setState.trafficLocations.map((trafficLocations) => (
//     <li>{trafficLocations.latitude}</li>
//   ))}
