import React from "react";
import "./App.css";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import TrafficLights from "./Components/TrafficLights.js";
import WeatherForecast from "./Components/WeatherForecast.js";
import { format } from "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function MaterialUIPickers() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState(new Date());
  const [datetime, setDatetime] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateTime =
      format(date, "yyyy-MM-dd") + "T" + format(selectedTime, "HH:mm:ss");
    setDatetime(dateTime);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    const dateTime =
      format(selectedDate, "yyyy-MM-dd") + "T" + format(time, "HH:mm:ss");
    setDatetime(dateTime);
  };

  return (
    <div>
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
        </Grid>
        <Grid container justify="space-around">
          <TrafficLights datetime={datetime} />
        </Grid>

        <Grid container justify="space-around">
          <WeatherForecast datetime={datetime} />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}
