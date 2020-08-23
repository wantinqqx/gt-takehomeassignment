import React, { useEffect } from "react";
import { Table , Card} from "antd";
import axios from "axios";

function LocationTable(props) {
  const defaultPageSize = 10;
  const defaultPageIndex = 0;
  const { Meta } = Card;
  
  let latLngList = props.locations;
  let weatherInfoList = props.weather;
  let areaInfoList = props.areaInfo;

  let userLat = "";
  let userLng = "";
  let camInfo = props.camInfo;
  let [tableData, setTableData] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState("");

  const [weatherInfo, setWeatherInfo] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedArea, setSelectedArea] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);

  useEffect(() => {
    setWeatherInfo("");
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
      render: (text) => <a href="#results">{text}</a>,
    },
  ];

  async function handlePageChange(e) {
    setShowResults(false);
    const currentPage = e.current - 1;
    const pageSize = e.pageSize;
    setIsLoading(true);
    await latLngToLocationList(tableData, currentPage, pageSize, latLngList);
    setIsLoading(false);
  }

  async function latLngToLocationList( initialArray, currentPage, pageSize, latLngLocationArr ) {
    if (!initialArray || !latLngLocationArr) {
      return null;
    }
    console.log(`Current page: ${currentPage}, PageSize: ${pageSize}`);
    let promises = getReverseGeocodePromises(process.env.REACT_APP_API_KEY, latLngLocationArr, currentPage, pageSize);
    let resolvedList = await Promise.all(promises);
    // console.log(resolvedList);
    let output = formatToTableDefinitions(initialArray,resolvedList, currentPage, pageSize);
    // console.table(output);
    setTableData(output);
  }

  async function initializeDisplayArray(initialArray,initialPageIndex,initialPageSize) {
    if (!initialArray) {
      return null;
    }
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
    if (!propData) {
      return null;
    }
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

  function getReverseGeocodePromises(key,locationsArray, startIndex, pageSize) {
    if (!locationsArray) {
      return null;
    }
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
    const defaultArea = userSelectedArea.split(',');
    setSelectedArea(defaultArea[0]);
    userSelectedArea = defaultArea[0];
    
    weatherInfoList.forEach((area) => {
       if(area.area === userSelectedArea){
          setWeatherInfo(area.forecast);
      }
    });
    // console.log(weatherInfo);
  }

  function findNearestWeatherInfo(latitude,longitude,areaDataFromWeather){

    if (!areaDataFromWeather) {
      return null;
    }
    let min = 300;
    let nearest = -1;

    console.log(latitude + " " + longitude);
    for (let i = 0; i < areaDataFromWeather.length; i++) {
      const data = areaDataFromWeather[i].label_location;
      const curr = Math.abs(longitude - data.longitude) + Math.abs(latitude - data.latitude);

      if (curr < min) {
        min = curr;
        nearest = i;
      }
    }
    let nearestArea = nearest > -1 ? areaDataFromWeather[nearest].name: null;
    setSelectedArea(nearestArea);
    console.log(nearestArea);
    displayWeatherInfo(nearestArea);
  }

  function resetVariables(){
    setWeatherInfo("");
    userLat = "";
    userLng = "";
  }

  return (
    <div>
      <Table
        onRow={(r, i) => {
          return {
            onClick: () => {
              resetVariables();              
              setSelectedLocation(r.location);
              userLat = camInfo[r.key].location.latitude;
              userLng = camInfo[r.key].location.longitude;
              // console.log(userLat + " " + userLng);
              displayCameraImg(r.key);

              findNearestWeatherInfo(userLat,userLng,areaInfoList);
              setShowResults(true);              
            },
          };
        }}
        columns={columns} dataSource={tableData} onChange={handlePageChange} loading={isLoading} pagination={{showSizeChanger: false}}/>

      {showResults ? (
         <Card id="results" hoverable className="responsive" cover={<img src={imageUrl} alt="trafficImage" />}>
           <Meta title={selectedLocation} description={`Weather is forecasted to be ${weatherInfo} at ${selectedArea}`}/> 
        </Card>) : null}
    </div>
  );
}

export default LocationTable;
