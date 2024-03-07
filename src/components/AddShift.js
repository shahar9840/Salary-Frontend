import { Button,  Select } from "@mui/material";
import React from "react";
import List from "@mui/material/List";


import Divider from "@mui/material/Divider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import dayjs from 'dayjs';
import CommonlyUsedComponents from "./DateTimePicker";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

function AddShift({token,setCalculateOnOrOff}) {
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [typeOfShift,setTypeOfShift] = React.useState("")

  function calculateHoursDifference(startDate, endDate) {
    setCalculateOnOrOff(true)
    const timeDifference = Math.abs(endDate - startDate);
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    console.log("hoursDifference ",hoursDifference)
    console.log("start ",startDate)
    console.log("end ",endDate)
    axios.post("http://127.0.0.1:50000/add_shift", {"start_date":startDate,"end_date":endDate,"type_of_shift":typeOfShift},{
      headers: { Authorization: `Bearer ${token}` },
    }).then((response)=>{
      console.log(response.data.Massage)
      
    }).finally(()=>{
      setCalculateOnOrOff(false)
    })
    return hoursDifference;
  }
  const handleTypeOfShift = (event) => {
    const selectedValue = event.target.value || "None";
    setTypeOfShift(selectedValue);
    console.log("type Of Shift ", typeOfShift);
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          font:"roboto"

        }}
      >
        <List sx={style} component="nav" aria-label="mailbox folders">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ margin: "2%" }}>תחילת משמרת</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="dd/MM/yyyy h:mm aa"
              timeIntervals={30}
              timeCaption="שעה"
              style={{ borderRadius: "4px" }}
            />
          </div>
          <Divider sx={{ textAlign: "center",margin:"3%" }} light />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ margin: "2%" }}>סיום משמרת</label>
            <DatePicker
              selected={endDate}
              onChange={(date) =>setEndDate(date)}
              showTimeSelect
              dateFormat="dd/MM/yyyy h:mm aa"
              timeIntervals={30}
              timeCaption="שעה"
              style={{ borderRadius: "4px" }}
            />
          </div>
          
          <Divider sx={{ textAlign: "center",margin:"3%" }} light />
          <div>
            <InputLabel id="type-of-shift">סוג משמרת</InputLabel>
            <Select
            onChange={handleTypeOfShift}
            labelId="type-of-shift"
            id="type-of-shift"
            variant="standard"
            displayEmpty
            >
            
              <MenuItem  value="Morning">בוקר</MenuItem>
              <MenuItem value="Lunch">צהריים</MenuItem>
              <MenuItem value="Night">לילה</MenuItem>
            </Select>
          </div>
        </List>
      </div>
      <Button onClick={() => calculateHoursDifference(startDate, endDate)} sx={{ marginTop: "4%" }} variant="outlined">
        הוסף
      </Button>
          <Divider sx={{ textAlign: "center",margin:"3%" }}   />

          

    </div>
  );
}

export default AddShift;
