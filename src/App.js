import { Container } from "@mui/material";
import axios from "axios";
import React from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import ButtonAppBar from "./components/AppBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [name, setName] = React.useState("");
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [confrimPassword, setConfirmPassword] = React.useState("");
  const [value, setValue] = React.useState(0);
  const loggedIn = localStorage.getItem("loggedIn");

  const [payPerHour, setPayPerHour] = React.useState("");
  const [extraHours, setExtraHours] = React.useState("");
  const [drivePayment, setDrivePayment] = React.useState("");
  const [mealPayment, setMealPayment] = React.useState("");
  const [weekPayment, setWeekPayment] = React.useState("");
  const [weekendPayment, setWeekendPayment] = React.useState("");
  const [driveMonthCheckbox, setDriveMonthCheckbox] = React.useState(true);
  const [driveDailyCheckbox, setDriveDailyCheckbox] = React.useState(false);
  const [mealMonthCheckbox, setMealMonthCheckbox] = React.useState(true);
  const [mealDailyCheckbox, setMealDailyCheckbox] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
      checkToken();
    }
  }, [token, navigate, value, loggedIn]);

  function loadUser() {
    if (username !== undefined && username !== "") {
      axios
        .post("http://127.0.0.1:50000/token", {
          username: username,
          password: password,
        })
        .then((response) => {
          const accessToken = response.data.access_token;
          const refreshToken = response.data.refresh_token;
          const expiresIn = response.data.expires_in;
          const expirationDate = new Date();
          console.log(
            "accessToken: ",
            accessToken,
            "refreshToken: ",
            refreshToken,
            "expiresIn: ",
            expiresIn,
            "expirationDate: ",
            expirationDate
          );
          localStorage.setItem("token", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          localStorage.setItem("loggedIn", true);
          localStorage.setItem("tokenExpiration", expirationDate.toISOString());
          navigate("/");
        })
        .catch((error) => {
          console.error("Error loading user:", error);
          console.error("Response data: ", error.response.data);
          console.error("Status code: ", error.response.status);
        });
    }
  }

  function signup() {
    axios
      .post("http://127.0.0.1:50000/signup", {
        name: name,
        username: username,
        password,
      })
      .then((response) => {
        console.log(response.data.massage);
        navigate("/login");
      });
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("loggedIn");

    navigate("/login");
  }

  function checkToken() {
    if (token !== "" && token !== undefined) {
      axios
        .get("http://127.0.0.1:50000/check_token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.user === username) {
            console.log("Check Token Pass");
            return true;
          }
        })
        .catch((error) => {
          console.error("Error checking token:", error);
          console.error("Response data:", error.response.data);
          console.error("Status code:", error.response.status);
         
          navigate("/login"); // Redirect to login page on error or token expiration
        });
    }
  }

  return (
    <div className="App">
      <Container>
        <ButtonAppBar loggedIn={loggedIn} logout={logout} />

        <Routes>
          <Route
            path="/signup"
            element={
              <Signup
                setName={setName}
                signup={signup}
                setUsername={setUsername}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                loadUser={loadUser}
                setUsername={setUsername}
                setPassword={setPassword}
                username={username}
                password={password}
                loggedIn={loggedIn}
                checkToken={checkToken}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
              driveDailyCheckbox={driveDailyCheckbox}
              setDriveDailyCheckbox={setDriveDailyCheckbox}
              loggedIn={loggedIn}
              token={token}
                value={value}
                setValue={setValue}
                payPerHour={payPerHour}
                setPayPerHour={setPayPerHour}
                extraHours={extraHours}
                setExtraHours={setExtraHours}
                drivePayment={drivePayment}
                setDrivePayment={setDrivePayment}
                mealPayment={mealPayment}
                setMealPayment={setMealPayment}
                weekPayment={weekPayment}
                setWeekPayment={setWeekPayment}
                weekendPayment={weekendPayment}
                setWeekendPayment={setWeekendPayment}
                driveMonthCheckbox={driveMonthCheckbox}
                setDriveMonthCheckbox={setDriveMonthCheckbox}
                mealMonthCheckbox={mealMonthCheckbox}
                setMealMonthCheckbox={setMealMonthCheckbox}
                mealDailyCheckbox={mealDailyCheckbox}
                setMealDailyCheckbox={setMealDailyCheckbox}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
