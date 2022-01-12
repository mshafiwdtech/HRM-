import React from "react";
import { makeStyles, Dialog } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    right: 0,
    top: 20,
  },
});

export default function Example() {
  const [opens, setOpenAvatar] = React.useState(false);
  const classes = useStyles();
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };



  return (
    <div>
      <IconButton onClick={() => setOpenAvatar(true)}>
        <Avatar alt="Remy Sharp" />
        <ArrowDropDownIcon style={{ color: "white" }} />

        {/* {name ? <Typography variant="h6">{name}</Typography> : null} */}
      </IconButton>

      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        open={opens}
        onClose={() => setOpenAvatar(false)}
      >
        <List>
          <ListItem button onClick={() => setOpenAvatar(false)}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => setOpenAvatar(false)}>
            <ListItemText primary="Feedback" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
