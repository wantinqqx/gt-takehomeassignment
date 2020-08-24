import React, { useEffect } from "react";
import axios from "axios";
import LocationTable from "./LocationTable";

function TrafficWeatherConditions(props) {
  let selDateTime = props.datetime;

  const [locations, setLocations] = React.useState([]);
  const [camInfo, setCamInfo] = React.useState([]);
  const [forecasts, setForecastInfo] = React.useState([]);
  const [areaInfo, setAreaInfo] = React.useState([]);

  useEffect(() => getData(selDateTime), [selDateTime]);

  function getData(dateTime) {
      getTrafficData(dateTime);
      getWeatherData(dateTime);
  }

  function getTrafficData(dateTime) {
    axios
      .get("https://api.data.gov.sg/v1/transport/traffic-images", {
        params: {
          date_time: dateTime,
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

  function getWeatherData(dateTime) {
    axios
      .get("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast", {
        params: {
          date_time: dateTime,
        },
      })
      .then(function (response) {
        let weatherForecastInfo = response.data.items[0].forecasts;
        let areaInfo = response.data.area_metadata;

        setForecastInfo(weatherForecastInfo);
        setAreaInfo(areaInfo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return <LocationTable locations={locations} camInfo={camInfo} weather = {forecasts} areaInfo={areaInfo}/>;
}

export default TrafficWeatherConditions;
