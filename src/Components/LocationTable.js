import React, { useEffect } from "react";
import { Table , Card} from "antd";
import axios from "axios";

function LocationTable(props) {
  const defaultPageSize = 10;
  const defaultPageIndex = 0;
  const { Meta } = Card;
  let latLngList = props.locations;
  let weatherInfoList = props.weather;
  let camInfo = props.camInfo;
  let [tableData, setTableData] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState("");
  const [weatherInfo, setWeatherInfo] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showResultsImage, setShowResultsImage] = React.useState(false);
  const [showResultsWeather, setShowResultsWeather] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      await initializeDisplayArray(latLngList,defaultPageIndex,defaultPageSize,latLngList);
      setIsLoading(false);
    }
    fetchData();
  }, [latLngList]);

  const columns = [
    { title: "Area",
     key: "area",
      dataIndex: "area" },
    {
      title: "Street",
      dataIndex: "location",
      key: "location",
      render: (text) => <a>{text}</a>,
    },
  ];

  async function handlePageChange(e) {
    const currentPage = e.current - 1;
    const pageSize = e.pageSize;
    setIsLoading(true);
    await latLngToLocationList(tableData, currentPage, pageSize, latLngList);
    setIsLoading(false);
  }

  async function latLngToLocationList( initialArray, currentPage, pageSize, latLngLocationArr ) {
    console.log(`Current page: ${currentPage}, PageSize: ${pageSize}`);
    let promises = getReverseGeocodePromises("AIzaSyDtzkW7NA67657v2pinYP5ZWY1lsIrWSrs", latLngLocationArr, currentPage, pageSize);
    let resolvedList = await Promise.all(promises);
    let output = formatToTableDefinitions(initialArray,resolvedList, currentPage, pageSize);
    // console.table(output);
    setTableData(output);
  }

  async function initializeDisplayArray(initialArray,initialPageIndex,initialPageSize) {
    let fOut = initialArray.map((item, k) => {
      return {
        key: k,
        area: `item ${k}`,
        location: `location ${k}`,
      };
    });
    await latLngToLocationList(fOut,initialPageIndex,initialPageSize,latLngList);
  }

  function formatToTableDefinitions(propData,geocodeResponse, startIndex, pageSize) {
    let rGeocodeArr = geocodeResponse.map((item) => item.data.results);
    let formattedLocations = rGeocodeArr.map((t, k) => {
      return {
        key: k + startIndex * pageSize,
        location: t[0].formatted_address,
        area:
          t[t.length - 3] !== undefined
            ? t[t.length - 3].formatted_address
            : "",
      };
    });
    let s = propData;
    console.log(propData);
    s.forEach((x) => {
      formattedLocations.forEach((f) => {
        if (x.key === f.key) {
          s[x.key].location = f.location;
          s[x.key].area = f.area;
        }
      });
    });
    return s;
  }

  function getReverseGeocodePromises( key,locationsArray, startIndex, pageSize) {
    let promiseList = [];
    const start = startIndex * pageSize;
    let pageArray = locationsArray.slice(start, start + pageSize);
    pageArray.forEach((l) => {
      let lat = l.latitude;
      let long = l.longitude;

      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${key}`;
      let p = axios.get(url);
      promiseList.push(p);
    });
    return promiseList;
  }

  function displayCameraImg(locIndex) {
    setImageUrl(camInfo[locIndex].image);
  }

  function displayWeatherInfo(userSelectedArea) {
    console.log(weatherInfoList);

    weatherInfoList.forEach((area) => {
      const defaultArea = userSelectedArea.split(',');
      let selectedArea = defaultArea[0];

      if(area.area === selectedArea){
        setWeatherInfo(area.forecast);
        console.log(weatherInfo);
      }
    });
  }

  return (
    <div>
      <Table
        onRow={(r, i) => {
          return {
            onClick: (e) => {
              // console.log(r.area);
              // console.log(r.location);
              // console.log(r.key);
              displayWeatherInfo(r.area);
              setSelectedLocation(r.location);
              displayCameraImg(r.key);
              setShowResultsImage(true);
              setShowResultsWeather(true);
            },
          };
        }}
        columns={columns} dataSource={tableData} onChange={handlePageChange} loading={isLoading}
      />

      {showResultsImage ? (
         <Card hoverable className="responsive" cover={<img src={imageUrl} alt="trafficImage"  />} >
           <Meta title={selectedLocation} description={weatherInfo} /></Card>
         ) : null}
    </div>
  );
}

export default LocationTable;
