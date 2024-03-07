import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

const style = {
  width: "100vh%",
  maxWidth: "100vh",
  bgcolor: "background.paper",
  borderRadius : "4px",
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "#eeeeee",
};

export default function ListDividers({
  shiftStart,
  shiftEnd,
  shiftPayment,
  day,
  lenOfShift,
  typeOfShift,
}) {

  return (
    <div>
      <List sx={style} aria-label="mailbox folders" >
        <ListItem sx={{ display: "flex", flexWrap: "wrap" }}>
          <ListItemText sx={{ textAlign: "right" }}>
            שעת התחלה: {shiftStart} - שעת סיום: {shiftEnd}
          </ListItemText>
          <Button>
            <EditIcon fontSize="small" sx={{ paddingTop: "1px" }} />
          </Button>
          <Button>
            <DeleteIcon fontSize="small" sx={{ paddingTop: "1px" }} />
          </Button>
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText sx={{ textAlign: "right" }}>
            תשלום :{shiftPayment}
          </ListItemText>
          <Button>
            <EditIcon fontSize="small" sx={{ paddingTop: "1px" }} />
          </Button>
          <Button>
            <DeleteIcon fontSize="small" sx={{ paddingTop: "1px" }} />
          </Button>
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText sx={{ textAlign: "right" }}>יום: {day}</ListItemText>
          <Button>
            <EditIcon fontSize="small" sx={{ paddingTop: "1px" }} />
          </Button>
          <Button>
            <DeleteIcon fontSize="small" sx={{ paddingTop: "1px" }} />
          </Button>
        </ListItem>

      </List>
    </div>
  );
}
