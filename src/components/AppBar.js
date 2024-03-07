import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";


export default function ButtonAppBar({ loggedIn, logout }) {
  const navigate = useNavigate();

  function goToSignup() {
    navigate("/signup");
  }
  function goToLogin() {
    navigate("/login");
  }
  function goToHome() {
    if (loggedIn) {
      navigate("/");
    } else {
      window.alert("Please login/signup");
      navigate("/login");
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        dir="rtl"
        sx={{ backgroundColor: "#2196f3", textAlign: "center" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            onClick={goToHome}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            <Button variant="inherit"><img src="/Logo.png" style={{ width: "20vh",marginRight:"10%" }}/></Button>
          </Typography>
          {loggedIn ? (
            <Button onClick={logout} color="inherit">
              התנתקות
            </Button>
          ) : (
            <div>
              <Button onClick={goToLogin} color="inherit">
                התחברות
              </Button>
              <Button onClick={goToSignup} color="inherit">
                הרשמה
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
