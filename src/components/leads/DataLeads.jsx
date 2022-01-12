import React, { useEffect, useState } from "react";

import CheckboxSource from "./CheckboxSource";
import SearchBox from "./SearchBox";
import LeadFilterOption from "./LeadFilterOption";
import RadioGroup from "./RadioGroup";
import DatePicker from "./DatePicker";
import CheckboxLeads from "./CheckboxLeads";
import ResetFilter from "./ResetFilter";
import DownloadExport from "./DownloadExport";
import Table from "./Table";
import {
  getFilterDataList,
  getleadStages,
  getleadSource,
  getleadSubSource,
  getleadcampaign,
  getFilteredLeadList,
  setSelectedSource,
  setSelectedMedium,
  setSelectedSubSource,
  getleadcampaignTerm,
  setSelectedCampName,
  getleadcampaignContent,
  setSelectedCampTerm,
  getProjectList,
  setSelectedCampContent,
  setSelectedProject,
  setSelectedPreSaleExecutive,
  getLeadsTableData,
  setDateLabel,
  setSelectedSalesExecutive,
  setSelectedLocation,
  setSelectedCountry,
} from "../../store/actions/Leads";
import { getSingleUser, getSalesExecutive } from "../../store/actions/Users";
import {
  LEAD_SOURCE_SUCCESS,
  LEAD_SUB_SOURCE_SUCCESS,
  SET_SELECTED_MEDIUM,
  SET_SELECTED_SOURCE,
  SET_SELECTED_SUBSOURCE,
  SET_SELECTED_CAMPNAME,
  SET_SELECTED_CAMPTERM,
  SET_SELECTED_CAMPCONTENT,
  SET_SELECTED_PROJECT,
  SET_SELECTED_PRESALE_EXECUTIVE,
  LEAD_TABLE_DATA_SUCCESS,
  RESET_FILTER,
  SET_SELECTED_SALES_EXECUTIVE,
  SET_SELECTED_LOCATION,
  SET_SELECTED_COUNTRY,
} from "../../store/actionTypes/Leads";
import { useSelector, useDispatch } from "react-redux";
import LeadStatusFilter from "./LeadStatusFilter";
import LeadExecutiveFilter from "./LeadExecutiveFilter";

import styles from '../../CSS/Components/leads/dataleads.module.css'
import { DownIcon, UpIcon } from "../../assets/Icons";
import RadioGroupforTriggerInitiated from "./RadioGroupforTriggerInitiated";
import { filterOptionNames, getLeadsFilterRestrictData } from "../../constants/UserRoles";

const addFilter = [];

export default function DataLeads() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getFilterDataList());
    // dispatch(setDateLabel("createdAt"));
    dispatch({
      type: LEAD_TABLE_DATA_SUCCESS,
      payload: [],
      updatedMasterData: [],
      updatedFilterData: [],
    });

    // dispatch(setDateLabel("createdAt"));
    dispatch(getLeadsTableData());
    dispatch(getProjectList());
    dispatch(getleadStages());
    dispatch(getSingleUser({ role: "Pre Sale Executive" }));
    dispatch(getSalesExecutive({ role: "Sales Executive" }));
  }, [dispatch]);



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

  const { users, sales } = useSelector((state) => state.user);



  const getSubfilterOption = (id) => {
    dispatch(getleadSubSource(id));
    dispatch(getleadcampaign(id));
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

  const location = [
    {
      name: "Telangana",
    },
  ];
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
  // console.log("kkk", users);


  //initial data........................
  const initialData = useSelector((state) => state.leads);
  let [isAdvanced, setAdvanced] = useState(false)




  useEffect(() => {

    // dispatch({
    //   type: RESET_FILTER,
    // });
    dispatch(getLeadsTableData());

  }, [])



  // for dependant sourse medium dropdown


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

  useEffect(() => {

    handleSourseDataChange(elementNames[0], channel)

  }, [channel])

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
  const { locationData } = useSelector((state) => state.setting)



  return (

    <>
      <div className={styles.filtercontainerleads}>
        <div className={styles.filterItemContainer}>

          <div className="d-flex flex-row align-items-center justify-cotent start mb-2">

            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingRight: "17px",
            }}>
              <CheckboxSource />
              <span className={styles.captionText}>Filter leads based on channel</span>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingLeft: "17px",
              borderLeft: "1px solid #C4C4C4"
            }}>
              <RadioGroupforTriggerInitiated />
              <span className={styles.captionText}>Filter leads based on Handover Trigger initiated from</span>
            </div>

          </div>


          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center"
          }}>
            <SearchBox />

          </div>

        </div>


        <div className={isAdvanced ? styles.viewAdvancedFiltes : styles.hideAdvancedFiltes}>

          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap"
          }}>


            <div style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              flexWrap: "wrap"
            }}>

              <LeadStatusFilter
                data={initial_status}
                placeHolder="Status"
              // getStatus={(stage_id) => dispatch(getleadStatus(stage_id))}
              />

              <LeadFilterOption
                data={locationData}
                placeHolder="Location"
                getId={(name) => setLocation(name)}
                selectedOption={selLocation}
              />

              <LeadFilterOption
                data={projects}
                placeHolder="Project"
                getId={(value) => setProject(value)}
                selectedOption={selProject}
              />

              {
                !getLeadsFilterRestrictData().includes(filterOptionNames[11]) ?

                  <LeadExecutiveFilter
                    data={users}
                    placeHolder="Presale executive"
                    getId={(value) => setExecutive(value)}
                    Selectedvalue={selPreSaleExe}
                  />
                  : null
              }

              {
                !getLeadsFilterRestrictData().includes(filterOptionNames[12]) ?

                  <LeadExecutiveFilter
                    data={sales}
                    placeHolder="Sales executive"
                    getId={(value) => setSalesExecutive(value)}
                    Selectedvalue={selSalesExe}
                  />
                  : null
              }



            </div>



            {/* <LeadFilterOption
              data={country}
              placeHolder="Country"
              getId={(_id) => setCountry(_id)}
              selectedOption={selCountry}
            /> */}

            <div style={{
              width: "100%",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              flexWrap: "wrap"
            }}>






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
                <LeadFilterOption
                  data={medium}
                  placeHolder="Medium"
                  // getId={(medium_id) => dispatch(getleadSource(medium_id))}
                  getId={(medium) => {
                    // getSource(medium)
                    handleSourseDataChange(elementNames[1], medium)

                  }}
                /> : null}

              {sourseData.medium != null && source.length > 0 ?
                <LeadFilterOption
                  data={source}
                  placeHolder="Source"
                  // getId={(value) => dispatch(getleadSubSource(value._id))}
                  getId={(value) => {
                    // getSubSource(value)
                    handleSourseDataChange(elementNames[2], value)
                  }}
                /> : null}

              {sourseData.source != null ?
                <LeadFilterOption
                  data={subsource}
                  placeHolder="Sub source"
                  getId={(value) => {
                    //setSubSource(value)
                    handleSourseDataChange(elementNames[3], value)
                  }}
                /> : null}




              {
                !getLeadsFilterRestrictData().includes(filterOptionNames[8]) ?

                  sourseData.subSourse != null ?
                    <LeadFilterOption
                      data={campaign}
                      placeHolder="campaign name"
                      getId={(value) => {
                        //setCampName(value)
                        handleSourseDataChange(elementNames[4], value)
                      }}
                    /> : null
                  : null
              }



              {
                !getLeadsFilterRestrictData().includes(filterOptionNames[9]) ?

                  sourseData.campaignName != null ?
                    <LeadFilterOption
                      data={campaignTerm}
                      placeHolder="Campaign term"
                      getId={(value) => {
                        // setCampTerm(value)
                        handleSourseDataChange(elementNames[5], value)
                      }}
                    // getId={(_id) => console.log("campaign")}
                    /> : null

                  : null
              }


              {
                !getLeadsFilterRestrictData().includes(filterOptionNames[10]) ?

                  sourseData.campaignTerm != null && campaignContent.length > 0 ?
                    <LeadFilterOption
                      data={campaignContent}
                      placeHolder="Campaign content"
                      getId={(value) => {
                        // setCampContent(value)
                        handleSourseDataChange(elementNames[6], value)
                      }}
                    // getId={(_id) => console.log("campaign")}
                    /> : null

                  : null
              }



            </div>

          </div>

          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginTop: "12px",
            padding: "10px"
          }}>

            <div>
              <RadioGroup />


            </div>

            <div>
              <ResetFilter data={addFilter} placeHolder="Add/Select Filter" />
            </div>

          </div>

        </div>


        <div
          onClick={() => { setAdvanced(!isAdvanced) }}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15px",
            border: "1px solid #C4C4C4",
            borderRadius: "3px",
            padding: "8px 0px",
            color: "#a1a1a1",
            cursor: "pointer",
            fontSize: "13px",
            marginBottom: "8px"
          }}
          className={styles.hideButton}
        >


          {
            isAdvanced ? <UpIcon /> : null
          }

          <span>{isAdvanced ? "Hide" : "View"} advanced filters</span>

          {
            !isAdvanced ? <DownIcon /> : null
          }
        </div>






      </div>




      <div className="Container">


        <div style={{ margin: 40 }}>
          <div>
            <div>

            </div>
            <div className="right-box">

            </div>
          </div>
          <div style={{ display: "flex", marginTop: 10 }}>

            <div style={{ paddingLeft: 10 }}>

            </div>
          </div>
          <div
            style={{
              marginTop: 0,
              display: "flex",
              // justifyContent: "space-evenly",
            }}
          >

            <div style={{ marginLeft: "auto" }}>

            </div>
          </div>

          <Table />
        </div>
      </div>
    </>

  );
}
