import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useForm } from "react-hook-form";
import UserSearch from "./UserSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAction,
  getUserTableData,
  getUserslist,
  userSearch,
} from "../../store/actions/Users";
import { SET_FILTER_FLAG_TRUE, SET_RESET_FILTER } from "../../store/actionTypes/Users";
import { Select } from "@material-ui/core";
const UserFilter = () => {
  const dispatch = useDispatch();

  const {role1} = useSelector((state)=>state.user)
  const {status1} = useSelector((state)=>state.user)


  const role = [
    { title: "Super Admin" },
    { title: "Admin" },
    { title: "Sales Lead" },
    { title: "Pre Sale Manager" },
    { title: "Pre Sale Executive" },
    { title: "Sales Manager" },
    { title: "Sales Executive" },
  ];

  const status = [
    {title:'active'},
    {title:'paused'}
  ]

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  
  return (
    <div>
      <div style={{ display: "flex", margin: 20 }}>
        <div style={{ margin: 10 }}>
          <Autocomplete
            id="role"
            options={role}
            value={role1}
            getOptionLabel={(option) => option.title}
            style={{ width: 195}}
            onChange={(event, value) => {
              console.log('<><><><><><><>><><>',value)
              dispatch({type:SET_RESET_FILTER,payload:value,stateName:'role1'})
              //dispatch({type:SET_RESET_FILTER,payload:'0',stateName:'filterType'})
              dispatch(userSearch('0'))
              dispatch({type:SET_FILTER_FLAG_TRUE,payload:(value?true:false)})
            }}
            renderInput={(params) => (
              <div>
                <TextField
                  {...params}
                  id="role"
                  placeholder="Select Role"
                  variant="outlined"
                  margin="dense"
                  color="primary"
                  style={{ margin: 10,backgroundColor:'white'  }}
                  /*{...register("role", {
                    required: "required",
                  })}*/
                />

                {errors.role && (
                  <span
                    role="alert"
                    style={{
                      color: "red",
                      fontSize: 12,
                      marginLeft: 10,
                    }}
                  >
                    {errors.role.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
        {<div style={{ margin: 10 }}>
          <Autocomplete
            id="status"
            options={status}
            value={status1}
            getOptionLabel={(option) => option.title}
            style={{ width: 195}}
            onChange={(e,value)=>{
              dispatch({type:SET_RESET_FILTER,payload:value!==null?value:{},stateName:'status1'})
              dispatch(userSearch('1'))
              dispatch({type:SET_FILTER_FLAG_TRUE,payload:(value?true:false)})
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="status"
                placeholder="Select Status"
                variant="outlined"
                autoFocus
                margin="dense"
                color="primary"
                style={{ margin: 10,backgroundColor:'white'  }}
                /*{...register("location", {
                  required: "required",
                })}*/
              />
            )}
          />
          <div>
            {errors.location && (
              <span
                role="alert"
                style={{ color: "red", fontSize: 12, marginLeft: 10 }}
              >
                {errors.location.message}
              </span>
            )}
          </div>
            </div>}

        <div>
          <div style={{ margin: 20 }}>
            <UserSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFilter;
