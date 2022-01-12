/* eslint-disable no-use-before-define */
import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedStatus,
  getFilteredLeadList,
  getLeadsTableData,
} from "../../store/actions/Leads";
import {
  RESET_SELECTED_STATUS,
  LEAD_TABLE_DATA_SUCCESS,
} from "../../store/actionTypes/Leads";
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.status,
});

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#4d4d4d",
    fontSize:"14px"
  },
}));
export default function Filter(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const leadFilterBaseStatus = (value) => {
    console.log("pppp", value);
    if (value != null) {
      dispatch(setSelectedStatus(value));
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      // dispatch(setSelectedStatus({ stage: null, status: null }));
      dispatch({ type: RESET_SELECTED_STATUS });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
    // } else {
    //   dispatch(getLeadsTableData());
    // }
  };
  // dispatch(getFilteredLeadList())

  //   return filterContent.map((item) => {

  // console.log("===>",props.data);

  const {statuss} = useSelector((state) => state.leads);
  console.log(statuss);

  
  return (
    <div style={{ display: "inline-grid", margin: 10 }}>
      {/* <Autocomplete
        id="filter-demo"
        options={props.data}
        getOptionLabel={(option) => option.status}
        filterOptions={filterOptions}
        style={{ width: 250, backgroundColor: "#3f50b5" }}
        classes={classes}
        size="small"
        // onChange={(event, value) => props.getStatus(value._id)}
        renderInput={(params, option) => (
          <TextField
            {...params}
            placeholder={props.placeHolder}
            variant="outlined"
            color="primary"
            style={{ backgroundColor: "#3f50b5", borderRadius: 20 }}
          />
        )}
      /> */}
      <Autocomplete
      
        id="grouped-demo"
        options={props.data}
        groupBy={(option) => option.stage}
        getOptionLabel={(option) => option.status}
      
        // groupBy={(option) => option.name}
        // getOptionLabel={(option) => option.status}
        filterOptions={filterOptions}
        style={{ width: 250, backgroundColor: "#fcfcfd" }}
        classes={classes}
        size="small"
        onChange={(event, value) => leadFilterBaseStatus(value)}
        // onChange={(event, value) => props.getStatus(value._id)}
        renderInput={(params, option) => (
          <TextField
            {...params}
            placeholder={props.placeHolder}
            variant="outlined"
            color="primary"
            style={{ backgroundColor: "#fcfcfd", borderRadius: 3 }}
          />
        )}

        value={statuss}
      />
    </div>
  );
  //   });
}
