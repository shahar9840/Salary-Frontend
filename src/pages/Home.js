import axios from "axios";
import React from "react";
import AddShift from "../components/AddShift";
import SimpleBottomNavigation from "../components/ButtonNavigation";
import Setting from "../components/Setting";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CustomizedAccordions from "../components/AllShifts";

function Home({
  loggedIn,
  token,
  setValue,
  value,
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
  mealCheckbox,
  setMealCheckbox,
  setDriveDailyCheckbox,
  driveDailyCheckbox,
  mealMonthCheckbox,
  setMealMonthCheckbox,
  mealDailyCheckbox,
  setMealDailyCheckbox,
}) {
  React.useEffect(() => {
    if (loggedIn) {
      importPlaceHolder();
    }
  }, [value]);
  function importPlaceHolder() {
    axios
      .get("http://127.0.0.1:50000/setting", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setPayPerHour(response.data.pay_per_hour);
        setExtraHours(response.data.extra_hours);
        console.log(response.data.extra_hours);
        setWeekPayment(response.data.week_payment);
        setWeekendPayment(response.data.weekend_payment);
        setDriveDailyCheckbox(response.data.drive_daily_checkbox);
        setDriveMonthCheckbox(response.data.drive_month_checkbox);
        setMealDailyCheckbox(response.data.meals_daily_checkbox);
        setMealMonthCheckbox(response.data.meals_month_checkbox);
        setDrivePayment(response.data.drive_payment);
        setMealPayment(response.data.meals_payment);
      });
  }
  const [calculateOnOrOff,setCalculateOnOrOff] = React.useState(false)
  return (
    <div style={{ textAlign: "center", marginTop: "5vh" }}>
      {value === 0 ? (
        <div>
          <Setting
            importPlaceHolder={importPlaceHolder}
            token={token}
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
            setDriveDailyCheckbox={setDriveDailyCheckbox}
            driveDailyCheckbox={driveDailyCheckbox}
            mealDailyCheckbox={mealDailyCheckbox}
            setMealDailyCheckbox={setMealDailyCheckbox}
          />
        </div>
      ) : value === 1 ? (
        <div><AddShift
        setCalculateOnOrOff={setCalculateOnOrOff}
        token={token}/></div>
      ) : value === 2 ?(
        <div><CustomizedAccordions token={token} calculateOnOrOff={calculateOnOrOff}/></div>
      ) : (
        <div>value 3 </div>
      )
      }

      <div style={{ margin: "1vh" }}>
        <SimpleBottomNavigation setValue={setValue} value={value} />
      </div>
    </div>
  );
}

export default Home;
