import { Dialog } from '@material-ui/core'
import React, { useState } from 'react'
import { CloseIcon, FilterIcon, DoneIcon } from '../../../assets/Icons';
import './filtermodal.css'
import RefreshIcon from "@material-ui/icons/Refresh";
import CheckboxSource from "../CheckboxSource";
import LeadStatusFilter from "../LeadStatusFilter";
import LeadFilterOption from "../LeadFilterOption";
import LeadExecutiveFilter from "../LeadExecutiveFilter";
import styles from '../../../CSS/Components/leads/dataleads.module.css'
import RadioGroupforTriggerInitiated from '../RadioGroupforTriggerInitiated';
import { useDispatch, useSelector } from 'react-redux';
import { getleadcampaign, getleadcampaignContent, getleadcampaignTerm, getleadSource, getLeadsTableData, getleadSubSource, setSelectedCampContent, setSelectedCampName, setSelectedCampTerm, setSelectedCountry, setSelectedLeadChannel, setSelectedLocation, setSelectedMedium, setSelectedPreSaleExecutive, setSelectedProject, setSelectedSalesExecutive, setSelectedSource, setSelectedSubSource } from '../../../store/actions/Leads';
import { LEAD_SOURCE_SUCCESS, LEAD_SUB_SOURCE_SUCCESS, LEAD_TABLE_DATA_SUCCESS, RESET_FILTER, SET_SELECTED_CAMPCONTENT, SET_SELECTED_CAMPNAME, SET_SELECTED_CAMPTERM, SET_SELECTED_COUNTRY, SET_SELECTED_LOCATION, SET_SELECTED_MEDIUM, SET_SELECTED_PRESALE_EXECUTIVE, SET_SELECTED_PROJECT, SET_SELECTED_SALES_EXECUTIVE, SET_SELECTED_SOURCE, SET_SELECTED_SUBSOURCE } from '../../../store/actionTypes/Leads';
import { filterOptionNames, getLeadsFilterRestrictData } from '../../../constants/UserRoles';


function FilterModelResponsive({ state, setState }) {

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setState(false);

  };

  const createStatusGroup = (data) => {

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


  const initial_status = createStatusGroup(useSelector((state) => state.setting.stageStatusData))
  const { users, sales } = useSelector((state) => state.user);

  const {
    leadFilterData,
    stages,
    channel,
    status,
    medium,
    source,
    subsource,
    campaign,
    campaignTerm,
    campaignContent,
    projects,
    selPreSaleExe,
    selSalesExe,
    selProject,
    selLocation,
    selCountry
  } = useSelector((state) => state.leads);


  const location = [
    {
      name: "Telangana",
    },
  ];

  const setLocation = (value) => {

    if (value != null) {
      dispatch(setSelectedLocation(value));

      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: SET_SELECTED_LOCATION, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };

  const setProject = (value) => {
    console.log("value", value);
    if (value != null) {
      dispatch(setSelectedProject(value));

      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: SET_SELECTED_PROJECT, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };

  const country = [
    {
      name: "India",
    },
    {
      name: "UK",
    },
    {
      name: "USA",
    },
  ];

  const setCountry = (value) => {

    if (value != null) {
      dispatch(setSelectedCountry(value));

      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: SET_SELECTED_COUNTRY, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };

  const setExecutive = (value) => {
    console.log("exe", value);
    if (value != null) {
      dispatch(setSelectedPreSaleExecutive(value));
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: SET_SELECTED_PRESALE_EXECUTIVE, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };



  const setSalesExecutive = (value) => {

    if (value != null) {
      dispatch(setSelectedSalesExecutive(value));
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: SET_SELECTED_SALES_EXECUTIVE, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };

  const getSource = (value) => {
    if (value != null) {
      dispatch(getleadSource(value._id));
      dispatch(setSelectedMedium(value));
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: LEAD_SOURCE_SUCCESS, payload: [] });
      dispatch({ type: SET_SELECTED_MEDIUM, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };

  const getSubSource = (value) => {
    if (value != null) {
      dispatch(getleadSubSource(value._id));
      dispatch(getleadcampaign(value._id));
      dispatch(setSelectedSource(value));
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: LEAD_SUB_SOURCE_SUCCESS, payload: [] });
      dispatch({ type: SET_SELECTED_SOURCE, payload: null });
      dispatch({ type: SET_SELECTED_SUBSOURCE, payload: null });
      dispatch({ type: SET_SELECTED_CAMPNAME, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };
  const setSubSource = (value) => {
    if (value != null) {
      dispatch(setSelectedSubSource(value));
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: SET_SELECTED_SUBSOURCE, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };
  const setCampName = (value) => {
    if (value != null) {
      dispatch(setSelectedCampName(value));
      dispatch(getleadcampaignTerm(value._id));
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: SET_SELECTED_CAMPNAME, payload: null });
      dispatch({ type: SET_SELECTED_CAMPTERM, payload: null });
      dispatch({ type: SET_SELECTED_CAMPCONTENT, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };

  const setCampTerm = (value) => {
    if (value != null) {
      dispatch(setSelectedCampTerm(value));
      dispatch(getleadcampaignContent(value._id));
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: SET_SELECTED_CAMPTERM, payload: null });
      dispatch({ type: SET_SELECTED_CAMPCONTENT, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };
  const setCampContent = (value) => {
    if (value != null) {
      dispatch(setSelectedCampContent(value));
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else {
      dispatch({ type: SET_SELECTED_CAMPCONTENT, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };


  let elementNames = ["channel", "medium", "sourse", "subSourse", "campaignName", "campaignTerm", "campaignContent"]

  let [sourseData, setSourseData] = useState({
    channel: channel,
    medium: null,
    source: null,
    subSourse: null,
    campaignName: null,
    campaignTerm: null,
    campaignContent: null
  })

  let handleSourseDataChange = (element, value) => {

    if (element === elementNames[0]) {
      //if channel change, all others sub will be null

      setSourseData({
        channel: channel,
        medium: null,
        source: null,
        subSourse: null,
        campaignName: null,
        campaignTerm: null,
        campaignContent: null

      })
    }

    else if (element === elementNames[1]) {
      //if channel change, all others sub will be null
      if (value) {

        getSource(value)
      }
      setSourseData({
        channel: channel,
        medium: value ? value.name : null,
        source: null,
        subSourse: null,
        campaignName: null,
        campaignTerm: null,
        campaignContent: null

      })
    }

    else if (element === elementNames[2]) {
      //if channel change, all others sub will be null
      if (value) {

        getSubSource(value)
      }
      setSourseData({
        channel: channel,
        medium: medium,
        source: value ? value.name : null,
        subSourse: null,
        campaignName: null,
        campaignTerm: null,
        campaignContent: null

      })
    }

    else if (element === elementNames[3]) {
      //if channel change, all others sub will be null
      if (value) {

        setSubSource(value)
      }
      setSourseData({
        channel: channel,
        medium: medium,
        source: source,
        subSourse: value ? value.name : null,
        campaignName: null,
        campaignTerm: null,
        campaignContent: null

      })
    }

    else if (element === elementNames[4]) {
      //if channel change, all others sub will be null
      if (value) {

        setCampName(value)
      }
      setSourseData({
        channel: channel,
        medium: medium,
        source: source,
        subSourse: subsource,
        campaignName: value ? value.name : null,
        campaignTerm: null,
        campaignContent: null

      })
    }

    else if (element === elementNames[5]) {
      //if channel change, all others sub will be null
      if (value) {

        setCampTerm(value)
      }
      setSourseData({
        channel: channel,
        medium: medium,
        source: source,
        subSourse: subsource,
        campaignName: campaign,
        campaignTerm: value ? value.name : null,
        campaignContent: null

      })
    }

    else if (element === elementNames[6]) {
      //if channel change, all others sub will be null
      if (value) {

        setCampContent(value)
      }
      setSourseData({
        channel: channel,
        medium: medium,
        source: source,
        subSourse: subsource,
        campaignName: campaign,
        campaignTerm: campaignTerm,
        campaignContent: value ? value.name : null

      })
    }
  }

  // const classes = useStyles();

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

    setSourseData({
      channel: null,
      medium: null,
      source: null,
      subSourse: null,
      campaignName: null,
      campaignTerm: null,
      campaignContent: null

    })

    dispatch(getLeadsTableData());
  };


  return (

    <div className={state ? "active-responsive-filter" : "hidden-responsive-filter"}>
      <div className="res-filter-container m-0">

        <div className="d-flex flex-row justify-content-between align-items-center w-100"
          style={{ borderBottom: ".5px solid #e0e0e0", paddingBottom: 9 }}
        >
          <div className="d-flex flex-row align-items-center">
            <FilterIcon />
            <div className="ml-2">Filter Leads</div>
          </div>

          <div className="closeIcon" onClick={() => { setState(!state) }}>
            <CloseIcon />
          </div>

        </div>



        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingRight: "17px",
          marginTop: 8,
          width: "100%"
        }}>
          <span className={styles.captionText}>Filter leads based on channel</span>
          <CheckboxSource />

        </div>


        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%"

        }}>
          <span className={styles.captionText}>Filter leads based on Handover Trigger initiated from</span>
          <RadioGroupforTriggerInitiated />

        </div>



        <div className="form_item_leads_responsive">

          <LeadStatusFilter
            data={initial_status}
            placeHolder="Status"
          // getStatus={(stage_id) => dispatch(getleadStatus(stage_id))}
          />

        </div>


        <div className="form_item_leads_responsive">
          <LeadFilterOption
            data={location}
            placeHolder="Location"
            getId={(_id) => setLocation(_id)}
            selectedOption={selLocation}
          />
        </div>

        <div className="form_item_leads_responsive">
          <LeadFilterOption
            data={projects}
            placeHolder="Project"
            getId={(value) => setProject(value)}
            selectedOption={selProject}
          />
        </div>


        {/* <div className="form_item_leads_responsive">
          <LeadFilterOption
            data={country}
            placeHolder="Country"
            getId={(_id) => setCountry(_id)}
            selectedOption={selCountry}
          />
        </div> */}

        <div style={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap"
        }}>


          {
            !getLeadsFilterRestrictData().includes(filterOptionNames[11]) ?

              <div className="form_item_leads_responsive">

                <LeadExecutiveFilter
                  data={users}
                  placeHolder="Presale executive"
                  getId={(value) => setExecutive(value)}
                  Selectedvalue={selPreSaleExe}
                />
              </div>
              : null
          }



          {
            !getLeadsFilterRestrictData().includes(filterOptionNames[12]) ?

              <div className="form_item_leads_responsive">
                <LeadExecutiveFilter
                  data={sales}
                  placeHolder="Sales executive"
                  getId={(value) => setSalesExecutive(value)}
                  Selectedvalue={selSalesExe}
                />
              </div>
              : null
          }




        </div>


        <div style={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap"
        }}>
          {channel ?
            <div className="form_item_leads_responsive">
              <LeadFilterOption
                data={medium}
                placeHolder="Medium"
                // getId={(medium_id) => dispatch(getleadSource(medium_id))}
                getId={(medium) => {
                  // getSource(medium)
                  handleSourseDataChange(elementNames[1], medium)

                }}
              /></div> : null}

          {sourseData.medium != null && source.length > 0 ?

            <div className="form_item_leads_responsive">
              <LeadFilterOption
                data={source}
                placeHolder="Source"
                // getId={(value) => dispatch(getleadSubSource(value._id))}
                getId={(value) => {
                  // getSubSource(value)
                  handleSourseDataChange(elementNames[2], value)
                }}
              /></div> : null}


          {
            !getLeadsFilterRestrictData().includes(filterOptionNames[8]) ?

              sourseData.source != null && subsource.length > 0 ?
                <div className="form_item_leads_responsive">
                  <LeadFilterOption
                    data={subsource}
                    placeHolder="Sub source"
                    getId={(value) => {
                      //setSubSource(value)
                      handleSourseDataChange(elementNames[3], value)
                    }}
                  /></div> : null
              : null
          }



          {sourseData.subSourse != null && subsource.length > 0 ?
            <div className="form_item_leads_responsive">
              <LeadFilterOption
                data={campaign}
                placeHolder="campaign name"
                getId={(value) => {
                  //setCampName(value)
                  handleSourseDataChange(elementNames[4], value)
                }}
              /></div> : null}

          {sourseData.campaignName != null ?
            <div className="form_item_leads_responsive">
              <LeadFilterOption
                data={campaignTerm}
                placeHolder="Campaign term"
                getId={(value) => {
                  // setCampTerm(value)
                  handleSourseDataChange(elementNames[5], value)
                }}
              // getId={(_id) => console.log("campaign")}
              /></div> : null}

          {sourseData.campaignTerm != null && campaignContent.length > 0 ?
            <div className="form_item_leads_responsive">
              <LeadFilterOption
                data={campaignContent}
                placeHolder="Campaign content"
                getId={(value) => {
                  // setCampContent(value)
                  handleSourseDataChange(elementNames[6], value)
                }}
              // getId={(_id) => console.log("campaign")}
              /></div> : null}
        </div>


        <div className="d-flex flex-row">

          <div className="reset-filter-responsive">
            <div
              onClick={onResetFilters}
              style={{ display: "flex", width: "fit-content" }}
              className="clear-filter-button"
            >

              <RefreshIcon />
              <span style={{ marginLeft: "10px" }}>Reset Filter</span>
            </div>
          </div>


          <div className="reset-filter-responsive">
            <div
              onClick={() => { setState(!state) }}
              style={{ display: "flex", width: "fit-content" }}
              className="apply-filter-button"
            >

              <DoneIcon />
              <span style={{ marginLeft: "10px" }}>Apply Filter</span>
            </div>
          </div>

        </div>
      </div>


    </div>




  )
}

export default FilterModelResponsive
