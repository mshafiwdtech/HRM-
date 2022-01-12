import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ADDLEAD_FIELD } from "../../store/actionTypes/Leads";
import {
  getProjectList,
  getleadStages,
  getleadChannel,
  setSelectedLeadChannel,
  getleadSource,
  getleadSubSource,
  getleadcampaign,
  getleadcampaignTerm,
  getleadcampaignContent,
  setSelectedStatus,
  submitLead,
  setSelectedLeadChannelAddLead,
} from "../../store/actions/Leads";
import { getSingleUser, getSalesExecutive } from "../../store/actions/Users";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Comments from "./Comment";
import { queryByDisplayValue } from "@testing-library/dom";
import { loadSettingsApi, loadStageStatusApi } from "../../store/actions/Settings";

import './addleaddialauge.css'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddUsers = () => {


  const [modal, setModal] = useState(false);
  const [ispass, setPassword] = useState(true);
  const dispatch = useDispatch();




  const handleOpenModal = () => {
    setModal(true);
    reset();
  };

  const handleCloseModal = () => {
    setModal(false);
    reset();
    dispatch({
      type: RESET_ADDLEAD_FIELD,
    });
  };

  const [selectedDate, setSelectedDate] = useState(null);



  useEffect(() => {

    const { token } = JSON.parse(localStorage?.getItem("epitomeUser"));
    console.log("Token", token);

    if (token) {
      dispatch(getProjectList());
      dispatch(getSingleUser({ role: "Pre Sale Executive" }));
      dispatch(getSalesExecutive({ role: "Sales Executive" }));
      dispatch(getleadStages());
      dispatch(getleadChannel());
    }
  }, [dispatch]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const location = [
    {
      title: "Telangana",
    },
  ];

  const country = [
    {
      title: "India",
    },
    {
      title: "UK",
    },
    {
      title: "USA",
    },
  ];

  const getSubfilterOption = (id) => {
    dispatch(getleadSubSource(id));
    dispatch(getleadcampaign(id));
  };

  const {
    projects,
    status,
    leadSource,
    medium,
    source,
    subsource,
    campaign,
    campaignTerm,
    campaignContent,
    statuss,
    stage,

  } = useSelector((state) => state.leads);

  const { users, sales } = useSelector((state) => state.user);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    // console.log("ADD user Data", sourseData);

    // console.log("ADD user Data", data);

    let submittingData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      stage: selectedStageAndStatus ? selectedStageAndStatus.stageId : "",
      status: selectedStageAndStatus ? selectedStageAndStatus.status_id : "",
    }

    // console.log("ADD user ", data);
    console.log("ADD user Data", submittingData);
    dispatch(submitLead(submittingData));
    reset();
    handleCloseModal();
  };


  //initialStates.....................................

  let [isPresale, setisPresale] = useState(false)

  let [sourseData, setSourseData] = useState({
    channel: null,
    medium: null,
    sourse: null,
    subSourse: null,
    campaignName: null,
    campaignTerm: null,
    campaignContent: null
  })

  let [selectedStageAndStatus, setStateAndStatus] = useState(null)

  let [selectedSalesExecutive, setSaleExecutive] = useState(null)
  let [selectedPresaleExecutive, setPreSaleExecutive] = useState(null)




  //helpers functions................................
  let createStatusGroup = (data) => {

    let results = []


    if (data != null) {
      let result = data.map((obj) => {


        if (obj.statusList.length > 0) {

          obj.statusList.map((obj2) => {

            results.push({ stage: obj.name, status: obj2.name, stageId: obj._id, status_id: obj2._id })

          })
        }
        else {

        }

      })

      return results
    }
  }



  let CreateExecutivesGroup = (flag) => {


    let results = []

    if (flag === "presale") {
      if (users != null) {
        users.map((obj) => {

          // console.log({role:"Presale",name:obj.firstName,id:obj._id})
          results.push({ role: "Presale Executive", name: obj.firstName, id: obj._id })

        })
      }

    }
    else if (flag === "sale") {
      if (sales != null) {
        sales.map((obj) => {

          // console.log({role:"Sale",name:obj.firstName,id:obj._id})
          results.push({ role: "Sales Executive", name: obj.firstName, id: obj._id })

        })
      }
    }

    else {

      if (users != null) {
        users.map((obj) => {

          // console.log({role:"Presale",name:obj.firstName,id:obj._id})
          results.push({ role: "Presale Executive", name: obj.firstName, id: obj._id })

        })
      }

      if (sales != null) {
        sales.map((obj) => {

          // console.log({role:"Sale",name:obj.firstName,id:obj._id})
          results.push({ role: "Sales Executive", name: obj.firstName, id: obj._id })

        })
      }
    }

    return results



  }


  let elementNames = ["channel", "medium", "sourse", "subSourse", "campaignName", "campaignTerm", "campaignContent", "status&stage"]

  let handleSourseDataChange = (element, value) => {

    if (element === elementNames[0]) {
      //if channel change, all others sub will be null
      if (value) {
        //only load from API if value!=null
        dispatch(setSelectedLeadChannelAddLead(value))
      }
      setSourseData({
        channel: value ? value.name : null,
        medium: null,
        sourse: null,
        subSourse: null,
        campaignName: null,
        campaignTerm: null,
        campaignContent: null

      })
    }
    else if (element === elementNames[1]) {
      //if medium change, all others are null

      console.log(value)

      if (value) {
        //only load from API if value!=null
        dispatch(getleadSource(value._id))
      }

      setSourseData({
        channel: sourseData.channel,
        medium: value ? value.name : null,
        sourse: null,
        subSourse: null,
        campaignName: null,
        campaignTerm: null,
        campaignContent: null

      })


    }

    else if (element === elementNames[2]) {

      //if sourse change, all others are null

      console.log("..........", value)

      if (value) {
        //only load from API if value!=null
        getSubfilterOption(value._id)
      }

      setSourseData({
        channel: sourseData.channel,
        medium: sourseData.medium,
        sourse: value ? value.name : null,
        subSourse: null,
        campaignName: null,
        campaignTerm: null,
        campaignContent: null

      })


    }

    else if (element === elementNames[3]) {


      // if (value != null) {
      //   //only load from API if value!=null
      //   dispatch(getleadSubSource(value._id))
      // }

      setSourseData({
        channel: sourseData.channel,
        medium: sourseData.medium,
        sourse: sourseData.sourse,
        subSourse: value ? value.name : null,
        campaignName: null,
        campaignTerm: null,
        campaignContent: null

      })


    }

    else if (element === elementNames[4]) {

      //if ..... change, all others are null

      console.log("..........", value)

      if (value) {
        //only load from API if value!=null
        dispatch(getleadcampaignTerm(value._id))
      }

      setSourseData({
        channel: sourseData.channel,
        medium: sourseData.medium,
        sourse: sourseData.sourse,
        subSourse: sourseData.subSourse,
        campaignName: value ? value.name : null,
        campaignTerm: null,
        campaignContent: null

      })


    }

    else if (element === elementNames[5]) {

      //if campaignTerm change, all others are null

      console.log("..........", value)

      if (value) {
        //only load from API if value!=null
        dispatch(getleadcampaignContent(value._id))
      }

      setSourseData({
        channel: sourseData.channel,
        medium: sourseData.medium,
        sourse: sourseData.sourse,
        subSourse: sourseData.subSourse,
        campaignName: sourseData.campaignName,
        campaignTerm: value ? value.name : null,
        campaignContent: null

      })


    }

    else if (element === elementNames[6]) {

      //if campaignTerm change, all others are null

      console.log("..........", value)




      setSourseData({
        channel: sourseData.channel,
        medium: sourseData.medium,
        sourse: sourseData.sourse,
        subSourse: sourseData.subSourse,
        campaignName: sourseData.campaignName,
        campaignTerm: sourseData.campaignTerm,
        campaignContent: value ? value.name : null

      })


    }

    else if (element === elementNames[7]) {

      //if campaignTerm change, all others are null

      if (value) {
        dispatch(setSelectedStatus(value));
      }

      console.log("..........", value)
      setStateAndStatus(value)


    }


  }


  useEffect(() => {

    dispatch(loadStageStatusApi('stageStatusData'))
    dispatch(loadSettingsApi('locationData', 'locations'))
  }, [])

  //reading initial dropdown values...........................
  const initial_status = createStatusGroup(useSelector((state) => state.setting.stageStatusData))
  const { locationData } = useSelector((state) => state.setting)







  return (
    <div>
      <div>
        <Dialog
          open={modal}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
        >
          <div style={{ marginTop: 30 }}></div>
          <div className="heading">
            <text className="leadHeading">Add Lead</text>
          </div>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                flexWrap: "wrap"
              }}>




                <div className="form_item_leads">
                  <TextField autoFocus margin="dense" variant="outlined" color="primary" id="firstName" label="First Name"
                    style={{ width: 255, margin: 5 }} {...register("firstName", { required: "required", })} />

                  <div>

                    <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10, }}>
                      {errors.firstName ? errors.firstName.message : null}
                    </span>

                  </div>
                </div>




                <div className="form_item_leads">
                  <TextField autoFocus margin="dense" variant="outlined" color="primary" id="lastName" label="Last Name"
                    style={{ width: 255, margin: 5 }} {...register("lastName", { required: "required", })} />

                  <div>

                    <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10, }}>
                      {errors.lastName ? errors.lastName.message : null}
                    </span>

                  </div>
                </div>


                <div className="form_item_leads">
                  <TextField autoFocus margin="dense" variant="outlined" color="primary" id="email" label="Email" style={{
                    width: 255, margin: 5
                  }} {...register("email", { required: "required", })} />

                  <div>

                    <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10, }}>
                      {errors.email?.message}
                    </span>

                  </div>
                </div>


                <div className="form_item_leads">
                  <TextField autoFocus margin="dense" variant="outlined" color="primary" id="phone" label="Phone" style={{
                    width: 255, margin: 5
                  }} {...register("phone", { required: "required", })} />

                  <div>

                    <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10, }}>
                      {errors.phone?.message}
                    </span>

                  </div>
                </div>


                {/* <div className="form_item_leads">
                  <Autocomplete id="location" options={locationData ? locationData : null} getOptionLabel={(option) => option?.name}
                    style={{ width: 255 }}
                    renderInput={(params) => (
                      <TextField {...params} id="location" placeholder="Select Location" variant="outlined" autoFocus
                        margin="dense" color="primary" style={{ margin: 5 }} {...register("location", {
                          required: "required",
                        })} />
                    )}
                  />
                  <div>

                    <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }}>
                      {errors.location?.message}
                    </span>

                  </div>
                </div> */}

                {/* 
                <div className="form_item_leads">
                  <Autocomplete id="country" options={country} getOptionLabel={(option) => option.title}
                    style={{ width: 255 }}
                    renderInput={(params) => (
                      <TextField {...params} id="country" placeholder="Country" variant="outlined" autoFocus margin="dense"
                        color="primary" style={{ margin: 5 }} {...register("country", { required: "required", })} />
                    )}
                  />
                  <div>

                    <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }}>
                      {errors.country?.message}
                    </span>

                  </div>
                </div> */}

                 <div className="form_item_leads">

                  <Autocomplete id="status" options={initial_status} groupBy={(option) => option.stage}
                    getOptionLabel={(option) => option.status}
                    style={{ width: 255 }}
                    size="small"
                    onChange={(event, value) => {
                      // dispatch(setSelectedStatus(value));
                      // console.log("Status==>", value)
                      handleSourseDataChange(elementNames[7], value)
                    }

                    }
                    renderInput={(params, option) => (
                      <TextField {...params} placeholder="Status" variant="outlined" color="primary" style={{ margin: 5 }} />

                    )}
                  />
                  <div>

                    <span role="alert" style={{ color: "red", fontSize: 12, marginLeft: 10 }}>
                      {errors.status ? status.message : null}
                    </span>

                  </div>
                </div>
              </div>

              <DialogActions>
                <div>
                  <Button onClick={handleCloseModal} color="white" style={{
                    width: 100, height: 30, backgroundColor: "#3f50b5",
                    margin: 10,
                  }}>
                    <text style={{ color: "white" }}>Cancel</text>
                  </Button>

                  <Button color="primary" type="submit" style={{
                    width: 100, height: 30, backgroundColor: "#3f50b5", margin: 10,
                  }}>
                    <text style={{ color: "white" }}>Add</text>
                  </Button>
                </div>
              </DialogActions>


            </form>
          </DialogContent>



        </Dialog>
      </div>
      <Fab
        color="primary"
        aria-label="Add"
        style={{}}
        onClick={handleOpenModal}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default AddUsers;
