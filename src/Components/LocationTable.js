import React from "react";
import { Table } from "antd";
import axios from "axios";

function LocationTable(props) {
  let data = props.locations;
  const initial = data.slice(0, 20);
  const [currLocations, setCurrentLocations] = React.useState([]);
  let [pData, setPData] = React.useState([]);

  console.table(currLocations);
  geocodeLatLng("AIzaSyDvFF7juGaQNrE7onUVkdlWZpVDn_fgw7I", initial);

  const columns = [
    { title: "Test", key: "name", dataIndex: "name" },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
    },
  ];

  //   pData = [
  //     {
  //       key: 1,
  //       name: "Test",
  //       location: "locat",
  //     },
  //     {
  //       key: 2,
  //       name: "Test",
  //       location: "locat",
  //     },
  //   ];

  console.log(`Curr : ${currLocations}`);

  function geocodeLatLng(key, locations) {
    let promiseList = [];
    locations.map((l, k) => {
      let lat = l.latitude;
      let long = l.longitude;

      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${key}`;
      let p = axios.get(url);
      promiseList.push(p);

      // axios
      //   .get(url)
      //   .then((response) => {
      //     setCurrentLocations([
      //       ...currLocations,
      //       {
      //         key: k,
      //         name: "Test",
      //         location: response.data.results[0].formatted_address,
      //       },
      //     ]);
      //   })
      //   .catch(function (error) {
      //     // handle error
      //     // console.log(error);
      //   });
    });
    Promise.all(promiseList).then((out) => {
      if (out) {
        // console.log(out[0].data.results[0].formatted_address);

        // let locationInfo = out.data.results;
        out.map((index) => {
          // get each index
          const result = index.data.results;

          const formattedStreet = result[0].formatted_address;
          console.log(formattedStreet);
          const formattedAddress = result[result.length - 3].formatted_address;
          console.log(formattedAddress);

          setPData([
            {
              key: index,
              name: formattedStreet,
              location: formattedAddress,
            },
          ]);
        });
      }

      //   let locationInfo = out;
      //     setPData(camInfo);
      //     camInfo.map((c) => {
      //       locations.push(c.location);
      //     });

      //   setPData(out);
    });
  }

  return <Table columns={columns} dataSource={pData} />;
}

export default LocationTable;
