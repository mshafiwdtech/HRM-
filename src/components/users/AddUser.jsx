import React, { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_USER_SUCCESS_FLAG,
  GET_USER_SUCCESS,
  SET_EDIT_FLAG,
  SET_ERROR_FLAG,
  SET_MANAGER_ID,
  SET_MODAL_FLAG,
} from "../../store/actionTypes/Users";
import {
  addUserAction,
  getUserTableData,
  getUsers,
} from "../../store/actions/Users";
import { loadSettingsApi } from "../../store/actions/Settings";
import { FormControl, Input, InputLabel, NativeSelect, OutlinedInput, Select } from "@material-ui/core";
import EditUser from "./EditUser";
import MenuItem from '@mui/material/MenuItem';

const AddUsers = () => {

  const dispatch = useDispatch();

  const modal = useSelector((state)=>state.user['modalFlag'])
  const editFlag = useSelector((state)=>state.user['editFlag'])
  const {editData} = useSelector((state)=>state.user)
  const {addFlag} = useSelector((state)=>state.user)
  const {errorFlag} = useSelector((state)=>state.user)
  const {error} = useSelector((state)=>state.user)
  
  const [ispass, setPassword] = useState(true);
  

  const handleOpenModal = () => {
    console.log('********',modal,editFlag,editData)
    dispatch({type: GET_USER_SUCCESS,payload: [], stateName:'users'});
    dispatch({type:SET_MODAL_FLAG,payload:true})
    reset();
  };

  const handleCloseModal = () => {
    //console.log('hello',getValues())
    dispatch({type:SET_MODAL_FLAG,payload:false})
    dispatch({type:SET_EDIT_FLAG,payload:false})
    setPassword(true)
    reset();
    dispatch({type: GET_USER_SUCCESS,payload: [],});
  };

  const handleCloseSuccessModal = () => {
    dispatch({type:ADD_USER_SUCCESS_FLAG,payload:false})
  }

  const handleCloseErrorModal = () => {
    dispatch({type:SET_ERROR_FLAG,payload:false})
  }

  useEffect(()=>{
    dispatch(loadSettingsApi('locationData','locations'))
  },[])

  const location = useSelector((state)=>state.setting['locationData'])

  const status = [{ title: "active" }, { title: "paused" }];
  const role = [
    { title: "Super Admin" },
    { title: "Admin" },
    { title: "Sales Lead" },
    { title: "Pre Sale Manager" },
    { title: "Pre Sale Executive" },
    { title: "Sales Manager" },
    { title: "Sales Executive" },
  ];

  const {register,formState: { errors },reset,handleSubmit,setValue ,getValues, control} = useForm({});


  /*useEffect(()=>{
   
    if(Object.keys(editData).length > 0){
      Object.keys(editData).forEach(field=>{
        setValue(`${field}`,`${editData[field]}`,{shouldValidate: true})
      })
    }
  },[editData])*/

  const onSubmit = (data) => {
    console.log("ADD user Data", data);
    if (data.password !== data.confirm) {
      setPassword(false);
    } else {
      dispatch(addUserAction(data));
      handleCloseModal();
      reset();
    }
    dispatch({type: GET_USER_SUCCESS, payload: [],});
  };

  const onSubmitDetails = () => {
    console.log(getValues('firstName','lastName','phone','status'))
    reset();
    handleCloseModal();
    dispatch({
      type: GET_USER_SUCCESS,
      payload: [],
    });
  };

  const getUser = (value) => {
    if (value.title === "Pre Sale Executive" || value.title === "Sales Executive") {
      let name = value.title ==="Pre Sale Executive" ? "Pre Sale Manager" : 'Sales Manager'
      //console.log('name==============',name)
      dispatch(getUsers(name));
    } 
    else {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: [],
        stateName:'users'
      });
    }
  };

  const getManager = (value) => {
    console.log("Manager", value);
    if(value){
      dispatch({
      type: SET_MANAGER_ID,
      payload: value._id,
    });
  }}

  const { users } = useSelector((state) => state.user);
  console.log("USERS", users);
  return (
    <div>
      <div>

        {<Dialog open={editFlag} onClose={handleCloseModal}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
              <EditUser editData={editFlag?editData:''}/>
          </DialogContent>
        </Dialog>}

        {<Dialog open={addFlag} onClose={handleCloseSuccessModal}>
          <DialogContent>
            <p>{'Successfully Added'.toUpperCase()}</p>    
          </DialogContent>
        </Dialog>}

        {<Dialog open={errorFlag} onClose={handleCloseErrorModal}>
          <DialogContent>
            <p>{error.toUpperCase()}</p>    
          </DialogContent>
        </Dialog>}

        <Dialog
          open={modal && editFlag===false}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{editFlag===false ? 'Add New User' : 'Edit User' }</DialogTitle>

          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                
                <div style={{ display: "flex" }}>
                  <div>
                  <TextField
                      margin="dense"
                      variant="outlined"
                      defaultValue={editFlag?editData.firstName:''}
                      color="primary"
                      id="firstName"
                      label="First Name"
                      style={{ margin: 10,width:'92%' }}
                      {...register("firstName", {
                        required: "required",
                      })}
                    />
                    {/*<input {...register("firstName")} />*/}

                    {/*<TextField
                        margin="dense"
                        variant="outlined"
                        color="primary"
                        //defaultValue={editFlag?editData.firstName:''}
                        value={editFlag?fname:null}
                        onChange={(t)=>setFname(t.target.value)}
                        //id="firstName"
                        label="First Name"
                        style={{ margin: 10 }}
                        {...register("firstName", {
                          required: "required",
                        })}
                      />*/}

                    <div>
                      {errors.firstName && (
                        <span
                          role="alert"
                          style={{ color: "red", fontSize: 12, marginLeft: 10 }}
                        >
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      defaultValue={editFlag?editData.lastName:''}
                      color="primary"
                      id="lastName"
                      label="Last Name"
                      style={{ margin: 10,width:'95%' }}
                      {...register("lastName", {
                        //required: "required",
                      })}
                    />

                    <div>
                      {errors.lastName && (
                        <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }}>
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div> 

                <div style={{ display: "flex" }}>
                  <div>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      color="primary"
                      id="phone"
                      //inputProps={{pattern:'^[0-9]*$'}}
                      label="Phone"
                      type='number'
                      defaultValue={editFlag?editData.phone:''}
                      style={{ margin: 10 }}
                      {...register("phone", {
                        required: "required",
                        min:{
                          value:0
                        },
                        minLength: {
                          value: 10,
                          message: "Should be a Valid Number",
                        },
                        pattern:{value:/^[0-9]*$/}
                      })}
                    />

                    <div>
                      {errors.phone && (
                        <span
                          role="alert"
                          style={{ color: "red", fontSize: 12, marginLeft: 10 }}
                        >
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{display:'flex',width:'50%',flexDirection:'column'}}>
                    <FormControl>
                    <InputLabel style={{marginLeft:20}}>Status</InputLabel>
                    <Select 
                        style={{width:'95%',margin:10,height:'40px'}}
                        //defaultValue={editFlag?editData.status:''}
                        label="Status"
                        variant='outlined' 
                        {...register('status',{
                          required:'required'
                        })}
                      >
                        {status.map((item,index)=>{
                          return (<MenuItem value={item.title}>{item.title}</MenuItem>)
                        })}
                      </Select>
                    </FormControl>

                    <div>
                      {errors.status && (
                        <span
                          role="alert"
                          style={{ color: "red", fontSize: 12, marginLeft: 10 }}
                        >
                          {errors.status.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {editFlag === false ? 
                <div style={{ display: "flex" }}>
                  <div>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      color="primary"
                      id="email"
                      label="Email"
                      type="email"
                      style={{ margin: 10 }}
                      {...register("email", {
                        required: "required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format",
                        },
                      })}
                    />
                    <div>
                      {editFlag===false ? errors.email && (
                        <span
                          role="alert"
                          style={{ color: "red", fontSize: 12, marginLeft: 10 }}
                        >
                          {errors.email.message}
                        </span>
                      ):null}
                    </div>
                  </div>

                  <div style={{display:'flex',width:'50%'}}>
                    <Autocomplete
                      id="location"
                      options={location}
                      getOptionLabel={(option) => option.name}
                      style={{width:'95%'}}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="location"
                          placeholder="Select Location"
                          variant="outlined"
                          
                          margin="dense"
                          color="primary"
                          style={{ margin: 10 }}
                          {...register("location", {
                            required: "required",
                          })}
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
                  </div>
                </div> : null } 

                {editFlag=== true ?
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                  <Button variant='contained' style={{height:30,marginLeft:20}} color='primary' 
                  onClick={()=>{
                    console.log(getValues())
                    //handleCloseModal()
                  }}
                  >Cancel</Button>
                  <Button variant='contained' type='submit' style={{height:30,marginLeft:20,marginRight:10}} color='secondary' onClick={onSubmitDetails}>Update</Button>
                </div> : null }

              {editFlag=== true ? <p style={{fontSize:19}}>New Password</p> : null}  

              <div style={{display:'flex'}}>
                <div>
                    <TextField
                      autoComplete='new-password'
                      margin="dense"
                      variant="outlined"
                      color="primary"
                      id="password"
                      label="Password"
                      type="password"
                      style={{ margin:10 }}
                      {...register("password", {
                        required: "required",
                        minLength: {
                          value: 5,
                          message: "min length is 5",
                        },
                      })}
                    />
                    <div>
                      {errors.password && (
                        <span
                          role="alert"
                          style={{ color: "red", fontSize: 12, marginLeft: 10 }}
                        >
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                  <TextField
                    margin="dense"
                    autoComplete='new-password'
                    variant="outlined"
                    color="primary"
                    id="confirm"
                    label="Confirm Password"
                    style={{ margin: 10,width:'95%' }}
                    type="password"
                    {...register("confirm", {
                      required: "required",
                      minLength: {
                        value: 5,
                        message: "min length is 5",
                      },
                    })}
                  />
                  <div>
                    {errors.confirm && (
                      <span
                        role="alert"
                        style={{ color: "red", fontSize: 12, marginLeft: 10 }}
                      >
                        {errors.confirm.message}
                      </span>
                    )}
                    {!ispass ? (
                      <span
                        role="alert"
                        style={{ color: "red", fontSize: 12, marginLeft: 10 }}
                      >
                        Entered two different password
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {editFlag===false ?
              <div style={{ display: "flex", }}>
                  <div style={{display:'flex',width:'50%'}}>
                    <Autocomplete
                      id="role"
                      options={role}
                      getOptionLabel={(option) => option.title}
                      style={{width:'92.5%' }}
                      onChange={(event, value) => getUser(value?value:'')}
                      renderInput={(params) => (
                        <div>
                          <TextField
                            {...params}
                            id="role"
                            placeholder="Select Role"
                            variant="outlined"
                            
                            margin="dense"
                            color="primary"
                            style={{ margin: 10 }}
                            {...register("role", {
                              required: "required",
                            })}
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

                  {users.length > 0 ? (
                  <div style={{display:'flex',width:'50%'}}>
                    <Autocomplete
                      id="mrole"
                      options={users}
                      getOptionLabel={(option) => option.firstName}
                      style={{width:'95%'}}
                      onChange={(event, value) => getManager(!value?'':value)}
                      renderInput={(params) => (
                        <div>
                          <TextField
                            {...params}
                            id="mrole"
                            placeholder="Select Manager"
                            variant="outlined"
                            
                            margin="dense"
                            color="primary"
                            style={{ margin: 10 }}
                            {...register("mrole", {
                              required: "required",
                            })}
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
                              {errors.mrole.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  ) : null }

                </div> : null }

               

                <DialogActions>
                  <div>
                    {editFlag===false ?
                    <Button
                      onClick={handleCloseModal}
                      color="white"
                      style={{
                        width: 100,
                        height: 30,
                        backgroundColor: "#3f50b5",
                        margin: 10,
                      }}
                    >
                      <text style={{ color: "white" }}>Cancel</text>
                    </Button> : null }
                    {editFlag===false ? 
                    <Button color="primary" type="submit" variant='contained' style={{height: 30}}>Add User</Button> :
                    <Button color="primary" variant='contained' style={{height: 30}}>Change Password</Button>}
                    
                  </div>
                </DialogActions>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Fab
        color='secondary'
        aria-label="Add"
        style={{ position: "absolute", right: 30, top:100  }}
        onClick={()=>handleOpenModal()}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default AddUsers;
