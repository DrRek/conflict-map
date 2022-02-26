import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { MobileDateTimePicker } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import moment from "moment";

function valuetext(value) {
  return `${value}°C`;
}

const initialDate = moment(new Date(1645670725000));
const finalDate = moment(new Date());

function CustomSlider() {
  const [startDate, setStartDate] = React.useState(
    moment(new Date(1645670725000))
  );
  const [endDate, setEndDate] = React.useState(moment(new Date()));

  const handleChange = (event, newValue) => {
    setStartDate(moment.unix(newValue[0]));
    setEndDate(moment.unix(newValue[1]));
  };

  return (
    <Box sx={{ width: "100%", display:"flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <MobileDateTimePicker
        value={startDate}
        onChange={setStartDate}
        renderInput={(params) => <TextField {...params} />}
      />
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={[startDate.unix(), endDate.unix()]}
        onChange={handleChange}
        valueLabelDisplay="off"
        getAriaValueText={valuetext}
        min={initialDate.unix()}
        max={finalDate.unix()}
        style={{margin: "0 70px", display: window.screen.width < 600 ? "none" : "block"}}
      />
      <MobileDateTimePicker
        value={endDate}
        onChange={setEndDate}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
}

export default CustomSlider;
