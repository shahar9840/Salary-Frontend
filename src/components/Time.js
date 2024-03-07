import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

function MyTimePicker() {
  const [selectedTime, setSelectedTime] = React.useState(null);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="Select Time"
        value={selectedTime}
        onChange={handleTimeChange}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
}

export default MyTimePicker;
