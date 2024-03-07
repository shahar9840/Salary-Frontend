import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ListDividers from './EditShift';
import { hover } from '@testing-library/user-event/dist/hover';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: '5px',
  border: '1px solid transparent',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(3),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({ token, calculateOnOrOff }) {
  const [expanded, setExpanded] = React.useState('panel1');
  const [shifts, setShifts] = React.useState([]);
  const [shiftsSum,setShiftsSum] = React.useState(0)
  
  const [choosenMonth, setChoosenMonth] = React.useState(new Date().getMonth() + 1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handlePaginationChange = (event, value) => {
    setChoosenMonth(value);
  };

  React.useEffect(() => {
    shiftsByMonth();
    
  }, [choosenMonth]);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  }
  function shiftsByMonth() {
    axios
      .post("http://127.0.0.1:50000/shift_by_date", { month: choosenMonth }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const formattedShifts = response.data.map(shift => ({
            ...shift,
            start_shift: formatDateTime(shift.start_shift),
            end_shift: formatDateTime(shift.end_shift)
         }));
        setShifts(formattedShifts);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching shifts:", error);
      });
  }


  return (
    <div>
        <div>
        <b>חודש</b>
        <div></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination
            count={12}
            onChange={handlePaginationChange}
            defaultPage={choosenMonth}
          />
        </Stack>
            
      </div>
        <div style={{ backgroundColor:"#eeeeee",padding:"5px",marginTop:"10px",marginBottom:"0px", direction:"rtl",display: "flex", justifyContent: "space-around" }}>
            <div style={{ paddingLeft:"5%" }}>מספר משמרות: {shifts.length} </div>
            <div style={{paddingLeft:"5%",}}>סכום ברוטו: {(sum)=>{}}</div>
        </div>
      </div>
      {shifts.map((shift, index) => (
        <div style={{direction:"rtl"}} key={shift.id}>
          <Accordion expanded={expanded === shift.id} onChange={handleChange(shift.id)}>
            <AccordionSummary sx={{ backgroundColor: "#bbdefb" }} aria-controls="panel1d-content" id="panel1d-header">
              <Typography p={1}> משמרת  -  {index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{  borderRadius: "4px", display: "flex", flexWrap: "wrap",justifyContent:"center",direction:"rtl" }}>
                <ListDividers 
                    shiftStart={shift.start_shift}
                    shiftEnd={shift.end_shift} 
                    shiftPayment={shift.payment_per_shift}
                    day = {shift.day}
                    lenOfShift={shift.length_of_shift}
                    typeOfShift={shift.type_of_shift}
                />

              </Typography>
            </AccordionDetails>

          </Accordion>
        </div>
      ))}

    </div>
  );
}
