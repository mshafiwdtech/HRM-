/* eslint-disable no-use-before-define */
import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  RESET_FILTER,
  LEAD_TABLE_DATA_SUCCESS,
} from "../../store/actionTypes/Leads";
import { getLeadsTableData, setSelectedLeadChannel } from "../../store/actions/Leads";
import { useSelector, useDispatch } from "react-redux";
import { ClearIcon } from "../../assets/Icons";
import './resetfilter.css'


const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.title,
});

const useStyles = makeStyles((theme) => ({
  input: {
    color: "black",
  },
}));

export default function Filter(props) {
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const onResetFilters = () => {
    dispatch(setSelectedLeadChannel(null));
    dispatch({
      type: RESET_FILTER,
    });
    // dispatch({
    //   type: LEAD_TABLE_DATA_SUCCESS,
    //   payload: [],
    //   updatedMasterData: [],
    //   updatedFilterData: [],
    // });

    dispatch(getLeadsTableData());
  };
  //   return filterContent.map((item) => {
  return (
    <div style={{ display: "flex" }}>
      {/* <Autocomplete
        id="filter-demo"
        options={props.data}
        getOptionLabel={(option) => option.title}
        filterOptions={filterOptions}
        style={{ width: 200 }}
        classes={classes}
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={props.placeHolder}
            variant="outlined"
            color="primary"
            // style={{ borderRadius: 20 }}
          />
        )}
      /> */}
      <div className="reset-filter">
        <div
          onClick={onResetFilters}
          style={{ display: "flex", marginLeft: 10 }}
          className="clear-filter-button"
        >
          {/* <ClearIcon /> */}
          <RefreshIcon />
          <span style={{marginLeft:"10px"}}>Reset Filter</span>
        </div>
      </div>
    </div>
  );
  //   });
}
