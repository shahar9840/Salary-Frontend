import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function Signup({setName,setUsername,setPassword,setConfirmPassword,signup}) {


  
  return (
    <div>
      <div>הרשמה</div>
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
                setName(e.target.value);
              }}
              id="standard-basic"
              label="Full Name"
              variant="standard"
            />
          </div>
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
            <TextField
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              id="standard-basic"
              label="Confirm Password"
              variant="standard"
            />
          </div>
          <div>
            <Button
              onClick={signup}
              sx={{ borderColor: "#979797", color: "#979797" }}
              variant="outlined"
            >
              הרשמה
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Signup;
