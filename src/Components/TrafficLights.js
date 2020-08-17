import React, { useEffect } from "react";
import axios from "axios";
// import Geolocation from "react-native-geolocation-service";
import LocationTable from "./LocationTable";

function TrafficLights(props) {
  let url = props.datetime;
  // let lat = "";
  // let long = "";
  // const key = "AIzaSyDvFF7juGaQNrE7onUVkdlWZpVDn_fgw7I";

  const [locations, setLocations] = React.useState([]);
  const [camInfo, setCamInfo] = React.useState([]);
  // const [geocodedLocations, setGeocodedLocations] = React.useState([]);
  // const [imageUrl, setImageUrl] = React.useState("");

  // const [page, setPage] = React.useState(2);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
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
        // let geocodedLocations = [];
        let camInfo = response.data.items[0].cameras;
        setCamInfo(camInfo);
        camInfo.map((c) => {
          locations.push(c.location);
        });
        // console.log(camInfo);
        //console.log(locations);
        setLocations(locations);

        // setGeocodedLocations(geocodeLatLng(key, locations));
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      });
  }

  // function displayCameraData(id) {
  //   setImageUrl(camInfo[id].image);
  // }
  // function geocodeLatLng(key, locations) {
  //   {
  //     locations.map((l, k) => {
  //       lat = l.latitude;
  //       long = l.longitude;

  //       let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${key}`;
  //       axios
  //         .get(url)
  //         .then(function (response) {
  //           console.log(response.data);
  //         })
  //         .catch(function (error) {
  //           // handle error
  //           // console.log(error);
  //         });
  //     });
  //   }
  //   //
  // }

  return (
    <LocationTable locations={locations} />
    // getData(url),
    //     <div>
    //       <ul>
    //         {/* // map  new array with string geocode
    // // */}
    //         {locations.map((l, k) => (
    //           <li>
    //             <button
    //               key={k}
    //               id={k}
    //               onClick={(e) => displayCameraData(e.target.id)}
    //             >{`Lat: ${l.latitude} Lng: ${l.longitude}`}</button>
    //           </li>
    //         ))}
    //       </ul>
    //       <img src={imageUrl} alt="trafficImage" />
    //     </div>
    //   <TablePagination
    //   component="div"
    //   count={100}
    //   page={page}
    //   onChangePage={handleChangePage}
    //   rowsPerPage={rowsPerPage}
    //   onChangeRowsPerPage={handleChangeRowsPerPage}
    // />
  );
}

export default TrafficLights;
