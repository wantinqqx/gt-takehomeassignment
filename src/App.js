import React from "react";
import "./App.css";
import { DatePicker, TimePicker, Button, Space } from "antd";
import TrafficWeatherConditions from "./Components/TrafficWeatherConditions.js";

export default function App() {
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
      console.log(time);
      time = time.format("HH:mm:ss");
      setSelectedTime(time);
      console.log(selectedTime);
    } else if (time === "") {
      setSelectedTime("");
    }
  };

  const handleDateTimeChange = () => {
    // console.log(selectedTime);
    // console.log(selectedDate === "");
    if (
      selectedTime !== null &&
      selectedTime !== "" &&
      selectedDate !== "" &&
      selectedDate !== null
    ) {
      console.log(selectedDate);
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
        {/* {showWeatherResults ? <WeatherForecast datetime={datetime} /> : null} */}
      </Space>
    </div>

    // {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //   <Grid container justify="space-around">
    //     <KeyboardDatePicker
    //       margin="normal"
    //       id="date-picker-dialog"
    //       label="Date"
    //       format="MM/dd/yyyy"
    //       value={selectedDate}
    //       onChange={handleDateChange}
    //       KeyboardButtonProps={{
    //         "aria-label": "change date",
    //       }}
    //     />
    //     <KeyboardTimePicker
    //       margin="normal"
    //       id="time-picker"
    //       label="Time"
    //       value={selectedTime}
    //       onChange={handleTimeChange}
    //       KeyboardButtonProps={{
    //         "aria-label": "change time",
    //       }}
    //     />
    //   </Grid>
    //   <Grid container justify="space-around"> */}
    // {/* <TrafficLights datetime={datetime} />
    //   </Grid>

    //   <Grid container justify="space-around">
    //     <WeatherForecast datetime={datetime} />
    //   </Grid>
    // </MuiPickersUtilsProvider> */}
  );
}
