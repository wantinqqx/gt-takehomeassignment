import React, { useEffect } from "react";
import axios from "axios";
// import Geolocation from "react-native-geolocation-service";
import LocationTable from "./LocationTable";
import App from "../App";

function TrafficWeatherConditions(props) {
  let selDateTime = props.datetime;

  const [locations, setLocations] = React.useState([]);
  const [camInfo, setCamInfo] = React.useState([]);
  const [forecasts, setForecastInfo] = React.useState([]);
  // const [weatherForecastInfo, setWeatherForecastInfo] = React.useState([]);
  //   const [imageUrl, setImageUrl] = React.useState("");

  useEffect(() => getData(selDateTime), [selDateTime]);


  function getData(url) {
      getTrafficData(url);
      getWeatherData(url);
  }

  function getTrafficData(url) {
    axios
      .get("https://api.data.gov.sg/v1/transport/traffic-images", {
        params: {
          date_time: url,
        },
      })
      .then(function (response) {
        let camInfo = response.data.items[0].cameras;
        setCamInfo(camInfo);
        let locations = camInfo.map((c) => {
          return c.location;
        });
        setLocations(locations);
      })
      .catch(function (error) {
        console.log(error);
      });
  }  

  function getWeatherData(url) {
    axios
      .get("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast", {
        params: {
          date_time: url,
        },
      })
      .then(function (response) {
        let weatherForecastInfo = response.data.items[0].forecasts;
        setForecastInfo(weatherForecastInfo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return <LocationTable locations={locations} camInfo={camInfo} weather = {forecasts}/>;
}

export default TrafficWeatherConditions;
