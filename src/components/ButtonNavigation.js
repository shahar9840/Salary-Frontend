import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import PaidIcon from '@mui/icons-material/Paid';
import { Paper } from '@mui/material';

export default function SimpleBottomNavigation({value,setValue}) {

    
  return (
    
    <Box sx={{ width: 500 ,marginTop:"30%"}}>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={4}>   
      
      <BottomNavigation
        
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="הגדרות" icon={<SettingsIcon />} />
        <BottomNavigationAction label="הוספת משמרת" icon={<AddIcon />} />
        <BottomNavigationAction label="כל המשמרות" icon={<DensitySmallIcon/>} />
        <BottomNavigationAction label="שכר" icon={<PaidIcon/>} />
      </BottomNavigation> </Paper>
    </Box>
  );
}