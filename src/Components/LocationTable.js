import React, { useEffect } from "react";
import { Table } from "antd";
import axios from "axios";

function LocationTable(props) {
  let data = props.locations;
  let camInfo = props.camInfo;
  const initial = data.slice(0, 20);
  const [currLocations, setCurrentLocations] = React.useState([]);
  let [pData, setPData] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);

  useEffect(() => {
    initializeDisplayArray(data);
  }, [props.locations]);

  const columns = [
    { title: "Area", key: "name", dataIndex: "name" },
    {
      title: "Street",
      dataIndex: "location",
      key: "location",
      render: (text) => <a>{text}</a>,
    },
  ];

  async function handlePageChange(e) {
    let currentPage = e.current;
    const pageSize = 10;
    setIsLoading(true);
    await geocodeLatLng(
      "AIzaSyDvFF7juGaQNrE7onUVkdlWZpVDn_fgw7I",
      data,
      e.current - 1,
      pageSize
    );
    setIsLoading(false);
  }

  function displayCameraImg(locIndex) {
    setImageUrl(camInfo[locIndex].image);
  }

  function initializeDisplayArray(initialArray) {
    let fOut = initialArray.map((item, k) => {
      return {
        key: k,
        name: `item ${k}`,
        location: `location ${k}`,
      };
    });
    setPData(fOut);
  }

  console.log(`Curr : ${currLocations}`);

  function geocodeLatLng(key, locationsArray, startIndex, pageSize) {
    let promiseList = [];
    let pageArray = locationsArray.slice(startIndex, startIndex + pageSize);
    pageArray.map((l) => {
      let lat = l.latitude;
      let long = l.longitude;

      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${key}`;
      let p = axios.get(url);
      promiseList.push(p);
    });
    Promise.all(promiseList).then((out) => {
      let tmp = out.map((x) => x.data.results);
      let formattedLocations = tmp.map((t, k) => {
        return {
          key: k + startIndex * pageSize,
          location: t[0].formatted_address,
          name:
            t[t.length - 3] !== undefined
              ? t[t.length - 3].formatted_address
              : "",
        };
      });
      let s = pData;
      s.map((x) => {
        formattedLocations.map((f) => {
          if (x.key === f.key) {
            console.log(x.key);
            s[x.key].location = f.location;
            s[x.key].name = f.name;
          }
        });
      });
      setPData(s);
      // if (out) {
      //   // console.log(out[0].data.results[0].formatted_address);

      //   // let locationInfo = out.data.results;
      //   out.map((index) => {
      //     // get each index
      //     const result = index.data.results;

      //     const formattedStreet = result[0].formatted_address;
      //     console.log(formattedStreet);
      //     const formattedAddress = result[result.length - 3].formatted_address;
      //     console.log(formattedAddress);

      //     setPData([
      //       {
      //         key: index,
      //         name: formattedStreet,
      //         location: formattedAddress,
      //       },
      //     ]);
      //   });
      // }

      //   let locationInfo = out;
      //     setPData(camInfo);
      //     camInfo.map((c) => {
      //       locations.push(c.location);
      //     });

      //   setPData(out);
    });
  }

  return (
    <div>
      <Table
        onRow={(r, i) => {
          return {
            onClick: (e) => {
              console.log(r.key);
              displayCameraImg(r.key);
              setShowResults(true);
            },
          };
        }}
        columns={columns}
        dataSource={pData}
        onChange={handlePageChange}
        // onRow={getCamInfo}
        loading={isLoading}
      />

      {showResults ? (
        <img src={imageUrl} alt="trafficImage" class="responsive" />
      ) : null}
    </div>
  );
}

export default LocationTable;
