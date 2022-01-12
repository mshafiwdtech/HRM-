import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useDispatch } from "react-redux";
import { getUserslist, userSearch } from "../../store/actions/Users";
import { SET_FILTER_FLAG_TRUE, SET_RESET_FILTER } from "../../store/actionTypes/Users";
import { useSelector } from "react-redux";
export default function SearchBox() {
  const dispatch = useDispatch()
  
  const {search} = useSelector((state)=>state.user)

  const handleSearch = (e) => {
      dispatch({type:SET_RESET_FILTER,stateName:'search',payload:e.target.value})
      dispatch(userSearch('3'))
      dispatch({type:SET_FILTER_FLAG_TRUE,payload:(!e && e!=='' ?false:true)})
  }

  return (
    <div>
      <TextField
          id="outlined-basic"
          label="Search"
          value={search}
          variant="outlined"
          size="small"
          style={{ width: 200,backgroundColor:'white'  }}
          onChange={handleSearch}
        />
        <div className="reset-filter">
          <div
            onClick={()=>{
              dispatch(getUserslist(null))
              dispatch({type:SET_RESET_FILTER,payload:'',stateName:'search'})
              dispatch({type:SET_RESET_FILTER,payload:{},stateName:'role1'})
              dispatch({type:SET_RESET_FILTER,payload:{},stateName:'status1'})

            }}
            style={{ marginLeft: 10}}
          >
            <RefreshIcon />
            <span>Reset Filter</span>
          </div>
        </div>
    </div>
  );
}
