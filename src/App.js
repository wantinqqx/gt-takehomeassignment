import React from "react";
import "./App.css";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import TrafficLights from "./Components/TrafficLights.js";
import { format } from "date-fns";
import axios from "axios";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const dateTime = null;
  let selectedDateTime = false;

  if (selectedDate != null && selectedTime != null) {
    const dateTime =
      format(selectedDate, "yyyy-MM-dd") +
      "T" +
      format(selectedTime, "HH:mm:ss");
    console.log(dateTime);
    selectedDateTime = true;
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time"
          value={selectedTime}
          onChange={handleTimeChange}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
        <TrafficLights dateTime={dateTime} />
      </Grid>

      {/* <iframe
        width="600"
        height="400"
        src="https://data.gov.sg/dataset/traffic-images/resource/e127e29a-bd48-47e2-a0a7-e89ce31f10c7/view/a0e54baf-6ef7-4bca-9aa2-8c6ca37a0a0e"
        frameBorder="0"
      >
        {" "}
      </iframe> */}
    </MuiPickersUtilsProvider>
  );
}
