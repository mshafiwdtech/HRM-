/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue, getLeadsTableData } from "../../store/actions/Leads";
import {
  SET_SEARCH_VALUE,
  LEAD_TABLE_DATA_SUCCESS,
} from "../../store/actionTypes/Leads";
export default function SearchBox() {
  const dispatch = useDispatch();
  const checkSearchValue = (event) => {
    console.log("hhh", event.target.value);

    if (event.target.value != null) {
      dispatch(setSearchValue(event.target.value));
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: SET_SEARCH_VALUE, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };

  const { searchText } = useSelector((state) => state.leads);

  console.log(searchText,".....................");

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Search Email,phone,name"
        variant="outlined"
        size="small"
        
        // onChange={(event) => dispatch(setSearchValue(event.target.value))}
        onChange={(event) => checkSearchValue(event)}
        value={searchText?searchText:""}

      />
    </div>
  );
}
