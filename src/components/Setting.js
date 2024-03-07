import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputLabel from '@mui/material/InputLabel';
import axios from "axios";


function Setting({
  importPlaceHolder,
  token,
  payPerHour,
  setPayPerHour,
  extraHours,
  setExtraHours,
  drivePayment,
  setDrivePayment,
  mealPayment,
  setMealPayment,
  weekPayment,
  setWeekPayment,
  weekendPayment,
  setWeekendPayment,
  driveMonthCheckbox,
  setDriveMonthCheckbox,
  mealMonthCheckbox,
  setMealMonthCheckbox,
  setDriveDailyCheckbox,
  driveDailyCheckbox,
  mealDailyCheckbox,
  setMealDailyCheckbox
}) {
  const handleDriveMonthCheckboxChange = () => {
    setDriveMonthCheckbox(!driveMonthCheckbox);
    if (driveMonthCheckbox === true) {
      console.log('driveMonthCheckbox:',driveMonthCheckbox)
      setDriveDailyCheckbox(false);
    }else{
      setDriveDailyCheckbox(false)
      setDriveMonthCheckbox(true)
    }
  };

  const handleDriveDailyCheckboxChange = () => {
    setDriveDailyCheckbox(!driveDailyCheckbox);
    if (driveDailyCheckbox === true) {
      console.log('driveDailyCheckbox:',driveDailyCheckbox)
      setDriveMonthCheckbox(false);
    }else{
      setDriveMonthCheckbox(false)
      setDriveDailyCheckbox(true)
    }
  };


  const handleMealMonthCheckboxChange = () => {
    setMealMonthCheckbox(!mealMonthCheckbox);
    if (mealMonthCheckbox === true) {
      console.log('mealMonthCheckbox:',mealMonthCheckbox)
      setMealDailyCheckbox(false);
    }else{
      setMealDailyCheckbox(false)
      setMealMonthCheckbox(true)
    }
  };

  const handleMealDailyCheckboxChange = () => {
    setMealDailyCheckbox(!mealDailyCheckbox)
    if (mealDailyCheckbox === true) {
      console.log('mealDailyCheckbox:',mealDailyCheckbox)
      setMealMonthCheckbox(false);
    }else{
      setMealMonthCheckbox(false)
      setMealDailyCheckbox(true)
    }
  };


  const handlePayPerHour = (event) => {
      setPayPerHour(event.target.value);
      console.log("pay per hour", payPerHour);
    };
  const handleMealPayment = (event) => {
    setMealPayment(event.target.value);
    console.log("meal payment", mealPayment);
  };
  
  const handleExtraHours = (event) => {
    const selectedValue = event.target.value || "None";
    setExtraHours(selectedValue);
    console.log("extra hours ", extraHours);
  };

  const handleDrivePayment = (event) => {
    setDrivePayment(event.target.value);
    console.log("drive payment ", drivePayment);
  };
  const handleWeekPayment = (event) => {
      setWeekPayment(event.target.value);
      console.log("week payment", weekPayment);
    };
    const handleWeekendPayment = (event) => {
      setWeekendPayment(event.target.value);
      console.log("weekend payment", weekendPayment);
    };
  function sendSetting(){
    axios.put('http://127.0.0.1:50000/setting',{pay_per_hour:payPerHour,extra_hours:extraHours,drive_payment:drivePayment,drive_month_checkbox:driveMonthCheckbox,drive_daily_checkbox:driveDailyCheckbox,meals_payment:mealPayment,meals_month_checkbox:mealMonthCheckbox,meals_daily_checkbox:mealDailyCheckbox,week_payment:weekPayment,weekend_payment:weekendPayment},{
      headers: { Authorization: `Bearer ${token}` },
    }).then((response)=>{
      console.log(response.data.Massage)
    })
  }


  return (
    <Fragment>
      <Box sx={{ flexGrow: 1, direction: "rtl" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="pay-per-hour"
            id="pay-per-hour"
          >
            <Typography>שכר לשעה</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <TextField
                onChange={handlePayPerHour}
                placeholder={payPerHour}
                type="number"
                variant="standard"
                size="small"
                inputProps={{
                  style: { textAlign: "center" },
                }}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>חישוב שעות נוספות</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Select
              onChange={handleExtraHours}

              labelId="extra-hours-select"
              id="extra-hours-select"
              variant="standard"
              displayEmpty
            >
              <InputLabel id="extra-hours-select">{extraHours ===7?<div>לאחר 7 שעות</div>:<div>לאחר 8 שעות</div>}</InputLabel>
              
              <MenuItem value={7}>לאחר 7 שעות</MenuItem>
              <MenuItem value={8}>לאחר 8 שעות</MenuItem>
            </Select>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="drive-payment"
          >
            <Typography>נסיעות</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={driveMonthCheckbox}
              size="small"
              onChange={handleDriveMonthCheckboxChange}
            />
            <Typography>חודשי</Typography>

            <Checkbox
              checked={driveDailyCheckbox}
              size="small"
              onChange={handleDriveDailyCheckboxChange}
            />
            <Typography>יומי</Typography>

            <TextField
              onChange={handleDrivePayment}
              type="number"
              placeholder={drivePayment}
              variant="standard"
              size="small"
              inputProps={{
                style: { textAlign: "center" },
              }}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>ארוחות</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={mealMonthCheckbox}
              size="small"
              onChange={handleMealMonthCheckboxChange}
            />
            <div>
              <Typography>חודשי</Typography>
            </div>
            <Checkbox
              checked={mealDailyCheckbox}
              size="small"
              onChange={handleMealDailyCheckboxChange}
            />
            <div>
              <Typography>יומי</Typography>
            </div>

            <TextField
              onChange={handleMealPayment}
              placeholder={mealPayment}
              type="number"
              variant="standard"
              size="small"
              inputProps={{
                style: { textAlign: "center" },
              }}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>תעריף משמרת</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>בימים א עד ה </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Select
                    onChange={handleWeekPayment}
                    labelId="week"
                    id="week"
                    variant="standard"
                    displayEmpty
                  >
                    <InputLabel id="week">{weekPayment===1?<div>100%</div>:weekPayment===1.25?<div>125%</div>:weekPayment===1.5?<div>150%</div>:<div>200%</div>}</InputLabel>
                    <MenuItem value={1}>100%</MenuItem>
                    <MenuItem value={1.25}>125%</MenuItem>
                    <MenuItem value={1.5}>150%</MenuItem>
                    <MenuItem value={2.00}>200%</MenuItem>
                  </Select>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>
                  סופי שבוע יום שישי מ 17:00 עד שבת 20:00{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Select
                    onChange={handleWeekendPayment}
                    labelId="weekend"
                    id="weekend"
                    variant="standard"
                    displayEmpty
                  >
                    <InputLabel id="week">{weekendPayment===1?<div>100%</div>:weekendPayment===1.25?<div>125%</div>:weekendPayment===1.5?<div>150%</div>:<div>200%</div>}</InputLabel>
                    <MenuItem value={1}>100%</MenuItem>
                    <MenuItem value={1.25}>125%</MenuItem>
                    <MenuItem value={1.5}>150%</MenuItem>
                    <MenuItem value={2.0}>200%</MenuItem>
                  </Select>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
        <Button
          onClick={sendSetting}
          variant="outlined"
          sx={{ margin: "4%" }}
        >
          שמור
        </Button>
      </Box>
    </Fragment>
  );
}

export default Setting;
