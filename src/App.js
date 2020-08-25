import React from "react";
import "./App.css";
import { DatePicker, TimePicker, Button, Space, Layout } from "antd";
import moment from "moment";
import TrafficWeatherConditions from "./Components/TrafficWeatherConditions.js";

export default function App() {
  require('dotenv').config();

  const { Header, Content, Footer } = Layout;
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const [datetime, setDatetime] = React.useState("");
  const [showTrafficResults, setShowTrafficResults] = React.useState(false);

  const handleDateChange = (date) => {
    if (date !== null) {
      date = date.format("YYYY-MM-DD");
      setSelectedDate(date);
    } else {
      setSelectedDate("");
    }
  };

  const handleTimeChange = (time) => {
    if (time !== null) {
      time = time.format("HH:mm:ss");
      setSelectedTime(time);
    } else {
      setSelectedTime("");
    }
  };

  const handleDateTimeChange = () => {

    setShowTrafficResults(false);
    if (selectedTime!== null && selectedTime !== "" && selectedDate !== "" && selectedDate !== null) {
      let dateTime = selectedDate + "T" + selectedTime;
      setDatetime(dateTime);
      if (dateTime.length === 19) {
        setShowTrafficResults(true);
      }
    }else {
      setShowTrafficResults(false);
      alert("Date & Time cannot be empty!");
    }


  };

  return (
    <Layout className="site-layout-background">
      <Header className="header">  Traffic &amp; Weather App</Header>
      <Content  className="site-layout-content">
        <div className="space-align-container">
          <Space direction="vertical" size={12}>
            <div className="inline">
              <Space size="large">
                <DatePicker defaultValue={selectedDate} onChange={handleDateChange} disabledDate={current => { return current > moment();}}/>

                <TimePicker defaultValue={selectedTime} use12Hours secondStep={10} onChange={handleTimeChange} />
              </Space>
            </div>

            <Button type="primary" block onClick={handleDateTimeChange}>
              Check Traffic &amp; Weather Conditions
            </Button>
            {showTrafficResults ? <TrafficWeatherConditions datetime={datetime} /> : null}
            <br/>
          </Space>
        </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>©2020</Footer>
    </Layout>
  );
}
