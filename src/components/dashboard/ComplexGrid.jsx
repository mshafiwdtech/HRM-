import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TouchAppTwoToneIcon from "@material-ui/icons/TouchAppTwoTone";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
  },
  paper: {
    // padding: theme.spacing(4),
    margin: "auto",
    maxWidth: 250,
  },
  image: {
    width: 250,
    height: 100,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function ComplexGrid(props) {
  const classes = useStyles();
  const { rows } = useSelector((state) => state.leads);
  console.log("ROWS", rows);
  const title = rows?.filter((source) => source.stage === props.status).length;

  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        style={{
          backgroundColor: props.backgroundColor,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            {/* <ButtonBase className={classes.image}> */}
            {/* <img src="images/new.png" alt="New Leads" /> */}
            {props.status === "NEW" ? (
              <TouchAppTwoToneIcon style={{ fontSize: 60, color: "white" }} />
            ) : props.status === "HOT" ? (
              <TouchAppTwoToneIcon style={{ fontSize: 60, color: "white" }} />
            ) : props.status === "SITE VISITED" ? (
              <TouchAppTwoToneIcon style={{ fontSize: 60, color: "white" }} />
            ) : (
              <TouchAppTwoToneIcon style={{ fontSize: 60, color: "white" }} />
            )}
            {/* </ButtonBase> */}
          </Grid>
          <Grid item xs={12} sm container style={{ alignItems: "center" }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={{ marginBottom: 20, color: "white" }}
                >
                  {props.status}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ color: "white" }}
                >
                  {title}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
