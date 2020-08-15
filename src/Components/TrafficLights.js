import React, { useEffect } from "react";
import axios from "axios";
import Geolocation from "react-native-geolocation-service";

function TrafficLights(props) {
  let url = props.datetime;

  const [locations, setLocations] = React.useState([]);
  const [camInfo, setCamInfo] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState("");
  useEffect(() => getData(url), [props.datetime]);

  function getData(url) {
    console.log(`Timestamp ${url}`);
    axios
      .get("https://api.data.gov.sg/v1/transport/traffic-images", {
        params: {
          date_time: url,
        },
      })
      .then(function (response) {
        let locations = [];
        let camInfo = response.data.items[0].cameras;
        setCamInfo(camInfo);
        camInfo.map((c) => {
          locations.push(c.location);
        });
        // console.log(camInfo);
        console.log(locations);
        setLocations(locations);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      });
  }

  function displayCameraData(id) {
    setImageUrl(camInfo[id].image);
  }

  // function geocodeLatLng(geocoder, map, infowindow) {
  //   const input = document.getElementById("latlng").value;
  //   const latlngStr = input.split(",", 2);
  //   const latlng = {
  //     lat: parseFloat(latlngStr[0]),
  //     lng: parseFloat(latlngStr[1]),
  //   };
  //   geocoder.geocode(
  //     {
  //       location: latlng,
  //     },
  //     (results, status) => {
  //       if (status === "OK") {
  //         if (results[0]) {
  //           map.setZoom(11);
  //           const marker = new google.maps.Marker({
  //             position: latlng,
  //             map: map,
  //           });
  //           infowindow.setContent(results[0].formatted_address);
  //           infowindow.open(map, marker);
  //         } else {
  //           window.alert("No results found");
  //         }
  //       } else {
  //         window.alert("Geocoder failed due to: " + status);
  //       }
  //     }
  //   );
  // }

  return (
    // getData(url),
    <div>
      <ul>
        {locations.map((l, k) => (
          <li>
            <button
              key={k}
              id={k}
              onClick={(e) => displayCameraData(e.target.id)}
            >{`Lat: ${l.latitude} Lng: ${l.longitude}`}</button>
          </li>
        ))}
      </ul>
      <img src={imageUrl} alt="trafficImage" />
    </div>
  );
}

export default TrafficLights;
