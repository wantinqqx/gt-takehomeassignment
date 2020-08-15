import React, { useEffect } from "react";
import axios from "axios";

function WeatherForecast(props) {
  let url = props.datetime;

  const [forecasts, setForecastInfo] = React.useState([]);
  const [weatherForecastInfo, setWeatherForecastInfo] = React.useState([]);
  //   const [imageUrl, setImageUrl] = React.useState("");
  useEffect(() => getData(url), [props.datetime]);

  function getData(url) {
    console.log(`Timestamp ${url}`);
    axios
      .get("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast", {
        params: {
          date_time: url,
        },
      })
      .then(function (response) {
        let forecasts = [];
        console.log(response.data.items[0]);
        let weatherForecastInfo = response.data.items[0].forecasts;
        console.log(weatherForecastInfo);
        setForecastInfo(weatherForecastInfo);
        weatherForecastInfo.map((c) => {
          forecasts.push(c.forecasts);
        });
        // console.log(camInfo);
        console.log(forecasts);
        setWeatherForecastInfo(forecasts);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      });
  }

  //   function displayCameraData(id) {
  //     setImageUrl(camInfo[id].image);
  //   }

  return (
    // getData(url),
    <div>
      <ul>
        {forecasts.map((f, k) => (
          <li>
            <button
              key={k}
              id={k}
              //   onClick={(e) => displayCameraData(e.target.id)}
            >{`Area: ${f.area} Forecast: ${f.forecast}`}</button>
          </li>
        ))}
      </ul>
      {/* <img src={imageUrl} alt="trafficImage" /> */}
    </div>
  );
}

export default WeatherForecast;
