import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useSelector, useDispatch } from "react-redux";
import { setFromDate, setToDate } from "../../store/actions/Leads";
import { getLeadsTableData } from "../../store/actions/Leads";
import { LEAD_TABLE_DATA_SUCCESS } from "../../store/actionTypes/Leads";
export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const dispatch = useDispatch();

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
  const { fromDate, toDate } = useSelector((state) => state.leads);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-between">
        <KeyboardDatePicker
          // disableToolbar
          disableFuture
          variant="inline"
          // format="MM/dd/yyyy"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          // label="Date picker inline"
          maxDate={new Date()}
          value={fromDate}
          onChange={handleFromDate}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          style={{ width: 150, margin: 10 }}
        />
        <KeyboardDatePicker
          // disableToolbar
          disableFuture
          variant="inline"
          // format="MM/dd/yyyy"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          // label="Date picker inline"
          minDate={fromDate}
          value={toDate}
          onChange={handleToDate}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          style={{ width: 150, borderWidth: 1, borderColor: "red", margin: 10 }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
