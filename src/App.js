import React from "react";
import "./App.css";
import { DatePicker, TimePicker, Button, Space } from "antd";
import TrafficWeatherConditions from "./Components/TrafficWeatherConditions.js";

export default function App() {
  require('dotenv').config();
  const dateFormatList = ["DD-MM-YYYY", "HH:mm:ss"];

  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState(new Date());
  const [datetime, setDatetime] = React.useState(new Date());
  const [showTrafficResults, setShowTrafficResults] = React.useState(false);
  // const [showWeatherResults, setShowWeatherResults] = React.useState(false);

  const handleDateChange = (date) => {
    if (date !== null) {
      date = date.format("YYYY-MM-DD");
      setSelectedDate(date);
    } else if (date === null) {
      setSelectedDate("");
    }
  };

  const handleTimeChange = (time) => {
    if (time !== null) {
      time = time.format("HH:mm:ss");
      setSelectedTime(time);
    } else if (time === "") {
      setSelectedTime("");
    }
  };

  const handleDateTimeChange = () => {
    // console.log(selectedTime);
    // console.log(selectedDate === "");
    if (selectedTime !== null && selectedTime !== "" && selectedDate !== "" && selectedDate !== null) {
      const dateTime = selectedDate + "T" + selectedTime;
      setDatetime(dateTime);
      console.log(dateTime);

      if (dateTime.length === 19) {
        setShowTrafficResults(true);
      }
    } else {
      setShowTrafficResults(false);
      // setShowWeatheresults(false);
      alert("Date & Time cannot be empty!");
    }
  };

  return (
    <div className="space-align-container">
      <Space direction="vertical" size={12}>
        <div className="inline">
          <Space size="large">
            <DatePicker
              defaultValue={selectedDate}
              onChange={handleDateChange}
            />

            <TimePicker
              use12Hours
              secondStep={10}
              onChange={handleTimeChange}
            />
          </Space>
        </div>

        <Button type="primary" block onClick={handleDateTimeChange}>
          Check Traffic & Weather Conditions
        </Button>
        {showTrafficResults ? <TrafficWeatherConditions datetime={datetime} /> : null}
        <br/>
      </Space>
    </div>
  );
}
