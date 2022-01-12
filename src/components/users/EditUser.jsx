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
  GET_USER_SUCCESS,
  SET_EDIT_FLAG,
  SET_MANAGER_ID,
  SET_MODAL_FLAG,
} from "../../store/actionTypes/Users";
import {
  addUserAction,
  getUserTableData,
  getUsers,
  editUserAction,
  editUserDetailsAction,
  editUserPasswordAction,
} from "../../store/actions/Users";
import { loadSettingsApi } from "../../store/actions/Settings";
import { Input, NativeSelect, Select } from "@material-ui/core";
import Password from "antd/lib/input/Password";
import { set } from "date-fns/esm";

const EditUser = () => {

  const dispatch = useDispatch();

  //const modal = useSelector((state)=>state.user['modalFlag'])
  const editFlag = useSelector((state)=>state.user['editFlag'])
  const {editData} = useSelector((state)=>state.user)

  const [ispass, setIspass] = useState(false);
  const [detailsErrorFlag,setDetailsErrorFlag] = useState(false)
  const [passErrorFlag,setPassErrorFlag] = useState(false)

  const [fname,setFname] = useState(editData.firstName);
  const [lname,setLname] = useState(editData.lastName);
  const [phone,setPhone] = useState(editData.phone);
  const [stat,setStat] = useState(editData.status);

  const [oldPassword,setOldPassword] = useState('')
  const [pass,setPass] = useState('')
  const [confirmPass,setConfirmPass] = useState('')

  const comparison = (value) => {
    if (value === undefined){
        return false
    }
    else if (value === null){
        return false
    }
    else if (value=== ''){
        return false
    }
    else{
        return true
    }
  }

  const handleCloseModal = () => {
    console.log('hello',fname,lname,phone,stat)
    dispatch({type:SET_MODAL_FLAG,payload:false})
    dispatch({type:SET_EDIT_FLAG,payload:false})
    //dispatch({type: GET_USER_SUCCESS,payload: [],});
  };

  const status = [{ title: "active" }, { title: "paused" }];

  const onSubmitDetails = () => {
    console.log("ADD user Data", editData);
    console.log('hello',fname,lname,phone,stat)
    if (comparison(fname) && comparison(lname) && comparison(phone) && comparison(stat)){
        dispatch(editUserDetailsAction (editData._id,fname,lname,phone,stat))
        handleCloseModal();
    }
    else{
        setDetailsErrorFlag(true)
    }
  };

  const onSubmitPassword = () => {
    console.log('hello',Password)
    if (comparison(pass) && comparison(confirmPass) && comparison(oldPassword) ){
        if ( pass === confirmPass){
            dispatch(editUserPasswordAction(editData.email,oldPassword,pass))
            handleCloseModal();
        }
        else{
          setIspass(true)
        }
    }
    else{
        setPassErrorFlag(true)
    }
  };

return (
    <div>
      <div>
        <div>
                <div style={{ display: "flex" }}>
                  <div>
                   {<TextField
                        margin="dense"
                        variant="outlined"
                        color="primary"
                        value={fname}
                        onChange={(t)=>setFname(t.target.value)}
                        //id="firstName"
                        label="First Name"
                        style={{ margin: 10 }}
                    />}
                    <div>
                    {!comparison(fname) && detailsErrorFlag ? (
                      <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }} >Required </span>
                    ) : null}
                    </div>
                  </div>
                  <div>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      value={lname}
                      onChange={(t)=>setLname(t.target.value)}
                      color="primary"
                      id="lastName"
                      label="Last Name"
                      style={{ margin: 10,width:'95%' }}
                    />

                    <div>
                    {!comparison(lname) && detailsErrorFlag ? (
                      <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }} >Required </span>
                    ) : null}
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
                      value={phone}
                      onChange={(e)=>setPhone(e.target.value)}
                      style={{ margin: 10 }}
                    />

                    <div>
                    {!comparison(phone) && detailsErrorFlag ? (
                      <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }} >Required </span>
                    ) : null}
                    </div>
                  </div>

                  <div style={{display:'flex',width:'50%',flexDirection:'column'}}>
                    <Select 
                        style={{width:'95%',margin:10,height:'40px'}}
                        defaultValue={editFlag?editData.status:''}
                        value={stat}
                        onChange={(e)=>setStat(e.target.value)}
                        variant='outlined' 
                      >
                        {status.map((item,index)=>{
                          return (<option value={item.title}>{item.title}</option>)
                        })}
                      </Select>

                    <div>
                    {!comparison(stat) && detailsErrorFlag ? (
                      <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }} >Required </span>
                    ) : null}
                    </div>
                  </div>
                </div>

                <div style={{display:'flex',justifyContent:'flex-end'}}>
                  <Button variant='contained' style={{height:30,marginLeft:20}} color='primary' 
                  onClick={()=>{
                    //console.log()
                    handleCloseModal()
                  }}
                  >Cancel</Button>
                  <Button variant='contained' type='submit' style={{height:30,marginLeft:20,marginRight:10}} color='secondary' 
                  onClick={()=>onSubmitDetails()}
                  >Update</Button>
                </div>

            <p style={{fontSize:19}}>New Password</p>
              
              <div>
                <div>
                      <TextField
                        autoComplete='new-password'
                        margin="dense"
                        variant="outlined"
                        color="primary"
                        id="password"
                        value={oldPassword}
                        onChange={(e)=>setOldPassword(e.target.value)}
                        label="Old Password"
                        type="password"
                        style={{ margin:10 }}
                      />
                      <div>
                      {!comparison(oldPassword) && passErrorFlag ? (
                        <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }} >Required </span>
                      ) : null}
                      </div>
                  </div>
              </div>
                
              <div style={{display:'flex'}}>
                <div>
                    <TextField
                      autoComplete='new-password'
                      margin="dense"
                      variant="outlined"
                      color="primary"
                      id="password"
                      value={pass}
                      onChange={(e)=>setPass(e.target.value)}
                      label="Password"
                      type="password"
                      style={{ margin:10 }}
                     
                    />
                    <div>
                    {!comparison(pass) && passErrorFlag ? (
                      <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }} >Required </span>
                    ) : null}
                    </div>
                  </div>
                  
                  <div>
                  <TextField
                    margin="dense"
                    autoComplete='new-password'
                    variant="outlined"
                    color="primary"
                    value={confirmPass}
                    onChange={(e)=>setConfirmPass(e.target.value)}
                    id="confirm"
                    label="Confirm Password"
                    style={{ margin: 10,width:'95%' }}
                    type="password"
                    
                  />
                    <div>
                    {!comparison(confirmPass) && passErrorFlag ? (
                      <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }} >Required </span>
                    ) : null}

                    {ispass ? (
                      <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }} > Entered two different password </span>
                    ) : null}
                    </div>

                </div>
              </div>
               
               <div style={{display:'flex',justifyContent:'flex-end',margin:10}}>
                    <Button color="secondary" variant='contained' style={{height: 30}} onClick={onSubmitPassword}>Change Password</Button>
                </div>
                
              </div>
      </div>
    </div>
  );
};

export default EditUser;
