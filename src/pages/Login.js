import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";


function Login({loadUser,setUsername,setPassword}) {
    

    
    
    

  return (
    <div>
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            border: "1px solid #979797 ",
            borderRadius: "8px",
            boxShadow: "2px 2px 1px #979797",
            marginTop: "5%",
            
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              id="standard-basic"
              label="Username"
              variant="standard"
            />
          </div>
          <div>
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="standard-basic"
              label="Password"
              variant="standard"
            />
          </div>
          <div>
            <Button
              onClick={loadUser}
              sx={{ borderColor: "#979797", color: "#979797" }}
              variant="outlined"
            >
              התחבר
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Login;
