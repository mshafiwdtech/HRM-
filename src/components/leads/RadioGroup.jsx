import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useSelector, useDispatch } from "react-redux";
import { setDateLabel, getLeadsTableData, setToDate, setFromDate } from "../../store/actions/Leads";
import { LEAD_TABLE_DATA_SUCCESS } from "../../store/actionTypes/Leads";
import { DatePicker, Space } from 'antd';



import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { ConvertDateToLocal_YYMMDD } from "../../helpers/helperFunctions";


const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#3f50b5",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function CustomizedRadios() {
  const dispatch = useDispatch();



  const handleUpdatedAt = () => {
    setCreated(false)
    dispatch(setDateLabel("updatedAt"));
    dispatch({
      type: LEAD_TABLE_DATA_SUCCESS,
      payload: [],
      updatedMasterData: [],
      updatedFilterData: [],
    });
    dispatch(getLeadsTableData());
  };



  const handleCreatedAt = () => {
    setCreated(true)
    dispatch(setDateLabel("createdAt"));
    dispatch({
      type: LEAD_TABLE_DATA_SUCCESS,
      payload: [],
      updatedMasterData: [],
      updatedFilterData: [],
    });
    dispatch(getLeadsTableData());
  };



  // date picker on change functions....................

  const handleToDate = (date) => {
    dispatch(setToDate(date));
    dispatch({
      type: LEAD_TABLE_DATA_SUCCESS,
      payload: [],
      updatedMasterData: [],
      updatedFilterData: [],
    });
    dispatch(getLeadsTableData());
  };



  const handleFromDate = (date) => {
    dispatch(setFromDate(date));
    dispatch({
      type: LEAD_TABLE_DATA_SUCCESS,
      payload: [],
      updatedMasterData: [],
      updatedFilterData: [],
    });
    dispatch(getLeadsTableData());


  };


  //newly added in V2........................
  const { fromDate, toDate, dateLabel } = useSelector((state) => state.leads);
  let [isCreated, setCreated] = useState(false)

  const { RangePicker } = DatePicker;

  function onChange(date, dateString) {
    console.log(date);

    if (date !== null) {

      dispatch(setFromDate(date[0]._d));
      dispatch(setToDate(date[1]._d));

      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }

    else{

      dispatch(setFromDate(null));
      dispatch(setToDate(null));

      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());



    }
  }

  
  const dateFormat = 'YYYY-MM-DD';


  return (
    <div style={{
      border: ".5px solid #C4C4C4",
      padding: "15px 30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      borderRadius: "5px"

    }}>
      <FormControl component="fieldset">
        <RadioGroup
          // defaultValue="createdon"
          aria-label="gender"
          name="customized-radios"
        >
          <div style={{ display: "flex" }}>
            <FormControlLabel
              checked={dateLabel ? dateLabel === "createdAt" ? true : false : null}
              value="createdon"
              control={<StyledRadio />}
              label="Created On"
              onClick={handleCreatedAt}
            // onClick={() => dispatch(setDateLabel("updatedAt"))}
            />
            <FormControlLabel
              checked={dateLabel ? dateLabel === "updatedAt" ? true : false : null}
              value="updatedon"
              control={<StyledRadio />}
              label="Updated On"
              onClick={handleUpdatedAt}
            />
          </div>
        </RadioGroup>
      </FormControl>

      <div className="d-flex flex-column">

        <RangePicker onChange={onChange}
        allowClear={false}
         value={[moment(ConvertDateToLocal_YYMMDD(fromDate), dateFormat), moment(ConvertDateToLocal_YYMMDD(toDate), dateFormat)]} />


        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableFuture
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            maxDate={new Date()}
            value={isCreated ? fromDate : toDate}
            onChange={isCreated ? handleFromDate : handleToDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            style={{ width: "100%" }}
          />

          <KeyboardDatePicker
            disableFuture
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            maxDate={new Date()}
            value={isCreated ? fromDate : toDate}
            onChange={isCreated ? handleFromDate : handleToDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            style={{ width: "100%", border: ".5px solid black", padding: ".5rem .5rem" }}
          />


        </MuiPickersUtilsProvider> */}
      </div>

    </div>
  );
}
