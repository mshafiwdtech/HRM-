import "date-fns";
import React,{useState} from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { saveSingleData } from "../../store/actions/SingleLead";
import { useSelector } from "react-redux";

const  DatePickerSingle = () => {
  //const [selectedDate, setSelectedDate] =useState("2014-08-18T21:11:54");
  const currentDate = useSelector((state)=>state.leadSingle['nextContactDate'])
  const date = new Date().toLocaleString()
  const selectedDate = currentDate === '' ? date : currentDate
  const dispatch = useDispatch()
  const handleDateChange = (date) => {
    dispatch(saveSingleData(date,'nextContactDate'))
  };

  return (
    <Box>
      <p style={styles.selectLabel}>Next Contact Date</p>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            size='small'
            format="dd/MM/yyyy"
            id="date-picker-inline"
            value={selectedDate}
            onChange={handleDateChange}
            style={{ width: 150 }}
          />
      </MuiPickersUtilsProvider>
    </Box>
  );
}

const styles = {
  label:{
      fontWeight:'bold',
      fontSize:'14px'
  },
  selectLabel:{
      fontSize:'14px',
      fontWeight:'bold'
  }
}

export default DatePickerSingle;

