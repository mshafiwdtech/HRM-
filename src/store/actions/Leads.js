import {
  LEAD_SOURCE_REQUEST,
  LEAD_SOURCE_SUCCESS,
  LEAD_SOURCE_FAILURE,
  LEAD_CAMPAIGN_REQUEST,
  LEAD_CAMPAIGN_SUCCESS,
  LEAD_CAMPAIGN_FAILURE,
  LEAD_SUB_SOURCE_REQUEST,
  LEAD_SUB_SOURCE_SUCCESS,
  LEAD_SUB_SOURCE_FAILURE,
  LEAD_FILTER_DATA_FAILURE,
  LEAD_FILTER_DATA_REQUEST,
  LEAD_FILTER_DATA_SUCCESS,
  LEAD_TABLE_HEAD_REQUEST,
  LEAD_TABLE_HEAD_FAILURE,
  LEAD_TABLE_HEAD_SUCCESS,
  LEAD_TABLE_DATA_REQUEST,
  LEAD_TABLE_DATA_FAILURE,
  LEAD_TABLE_DATA_SUCCESS,
  SET_SELECTED_CHANNEL_SUCCESS,
  SET_SELECTED_SOURCE_REQUEST,
  LEAD_STATUS_REQUEST,
  LEAD_STATUS_SUCCESS,
  LEAD_STATUS_FAILURE,
  LEAD_STAGE_REQUEST,
  LEAD_STAGE_SUCCESS,
  LEAD_STAGE_FAILURE,
  LEAD_MEDIUM_REQUEST,
  LEAD_MEDIUM_FAILURE,
  LEAD_MEDIUM_SUCCESS,
  LEAD_CHANNEL_REQUEST,
  LEAD_CHANNEL_SUCCESS,
  LEAD_CHANNEL_FAILURE,
  GET_PROJECT_REQUEST,
  GET_PROJECT_FAILURE,
  GET_PROJECT_SUCCESS,
  LEAD_CAMPAIGN_TERM_FAILURE,
  LEAD_CAMPAIGN_TERM_REQUEST,
  LEAD_CAMPAIGN_TERM_SUCCESS,
  LEAD_CAMPAIGN_CONTENT_FAILURE,
  LEAD_CAMPAIGN_CONTENT_REQUEST,
  LEAD_CAMPAIGN_CONTENT_SUCCESS,
  SET_SELECTED_STATUS,
  LEAD_SUBMIT_REQUEST,
  LEAD_SUBMIT_FAILURE,
  LEAD_SUBMIT_SUCCESS,
  SET_SELECTED_SOURCE,
  SET_SELECTED_MEDIUM,
  SET_SELECTED_SUBSOURCE,
  SET_SELECTED_CAMPNAME,
  SET_SELECTED_CAMPTERM,
  SET_SELECTED_CAMPCONTENT,
  SET_SELECTED_PROJECT,
  SET_SELECTED_PRESALE_EXECUTIVE,
  SET_SEARCH_VALUE,
  LEADS_COUNT_REQUEST,
  LEADS_COUNT_FAILURE,
  LEADS_COUNT_SUCCESS,
  SET_FROM_DATE,
  SET_TO_DATE,
  SET_DATE_LABEL,
  SET_SELECTED_SALES_EXECUTIVE,
  SET_SELECTED_LOCATION,
  SET_SELECTED_COUNTRY,
  SET_HANDOVER_TRIGGER,
  SET_ADD_DATA_SUCCESS,
  SET_SELECTED_CHANNEL_SUCCESS_ADDLEAD,
  DASHBOSRD_LEADS_COUNT_SUCCESS,
} from "../actionTypes/Leads";

import axiosTokenised from "../../utitlites/axios";
import Config from "../../config.json";
import isTomorrow from "date-fns/isTomorrow/index.js";
import { ConvertDateToLocal, ConvertDateToLocal_YYMMDD } from "../../helpers/helperFunctions";

const campSource = [
  {
    id: 1,
    name: "Website",
    value: false,
  },
  {
    id: 2,
    name: "Campaigns",
    value: false,
  },
  {
    id: 3,
    name: "Others",
    value: false,
  },
];
const leadFilterDataList = {
  // cars: {
  leadStatus: [
    { title: "New" },
    { title: "Switched Off" },
    { title: "Fake Number" },
    { title: "On Hold" },
  ],
  executive: [
    { title: "Arun Kumar" },
    { title: "Vinnop" },
    { title: "Daya" },
    { title: "Sivakumar" },
  ],
  campaign: [
    { title: "Google Lead Form" },
    { title: "Facebook " },
    { title: "Seminar" },
  ],
  project: [{ title: "Platinum" }, { title: "Diamond" }, { title: "Gold" }],
  saleOpportunity: [{ title: "GOOD" }, { title: "FAIR " }, { title: "POOR" }],
};

const headCells = [
  {
    id: "firstName", //name
    numeric: false,
    disablePadding: true,
    label: "Name",
    // checked: true,
  },
  {
    id: "createdAt", //added_date_string
    numeric: false,
    disablePadding: false,
    label: "Created Date",
    // checked: true,
  },
  {
    id: "updated_date_string",
    numeric: false,
    disablePadding: false,
    label: "Updated Date",
    // checked: true,
  },
  {
    id: "flag",
    numeric: false,
    disablePadding: false,
    label: "Flag",
    // checked: true,
  },

  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    // checked: true,
  },

  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone",
    // checked: true,
  },

  {
    id: "Presale_executive",
    numeric: false,
    disablePadding: false,
    label: "Presale Executive",
    // checked: true,
  },

  {
    id: "Sales_executive",
    numeric: false,
    disablePadding: false,
    label: "Sales Executive",
    // checked: true,
  },
  {
    id: "next_contact_date_moment",
    numeric: false,
    disablePadding: false,
    label: "Contact On",
    // checked: true,
  },

  {
    id: "lead_stage",
    numeric: false,
    disablePadding: false,
    label: "Stage",
    // checked: true,
  },
  {
    id: "lead_status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    // checked: true,
  },
  {
    id: "project",
    numeric: false,
    disablePadding: false,
    label: "Project",
    // checked: true,
  },
  {
    id: "channel",
    numeric: false,
    disablePadding: false,
    label: "Channel",
    // checked: true,
  },
  {
    id: "medium",
    numeric: false,
    disablePadding: false,
    label: "Medium",
    // checked: true,
  },
  {
    id: "source",
    numeric: false,
    disablePadding: false,
    label: "Source",
    // checked: true,
  },
  {
    id: "subsource",
    numeric: false,
    disablePadding: false,
    label: "Subsource",
    // checked: true,
  },
  {
    id: "ampaign_name",
    numeric: false,
    disablePadding: false,
    label: "Campaign Name",
    // checked: true,
  },
  {
    id: "campaign_term",
    numeric: false,
    disablePadding: false,
    label: "Campaign Term",
    // checked: true,
  },
  {
    id: "campaign_content",
    numeric: false,
    disablePadding: false,
    label: "Campaign Content",
    // checked: true,
  },
];

export const getProjectList = () => (dispatch, getState) => {
  dispatch({ type: GET_PROJECT_REQUEST });
  // dispatch({ type: LEAD_SOURCE_SUCCESS, payload: campSource });
  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/settings/project/list`)
    .then((res) => {
      // console.log("PROJECT", res);
      dispatch({ type: GET_PROJECT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_PROJECT_FAILURE, payload: err }));
};

export const getleadChannel = () => (dispatch, getState) => {
  dispatch({ type: LEAD_SOURCE_REQUEST });
  // dispatch({ type: LEAD_SOURCE_SUCCESS, payload: campSource });
  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/settings/channel/list`)
    .then((res) => {
      console.log("RES Channel", res);
      dispatch({ type: LEAD_CHANNEL_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: LEAD_CHANNEL_FAILURE, payload: err }));

};



export const setSelectedLeadChannel = (source) => (dispatch, getState) => {
  console.log({ source });

  dispatch({
    type: SET_SELECTED_CHANNEL_SUCCESS,
    payload: source,
  });
  // if (source != null) {
  dispatch(getMediumList());
  dispatch({
    type: LEAD_TABLE_DATA_SUCCESS,
    payload: [],
    updatedMasterData: [],
    updatedFilterData: [],
  });

  dispatch(getLeadsTableData());
  // }
};



export const setSelectedLeadChannelAddLead = (source) => (dispatch, getState) => {
  console.log({ source });

  dispatch({
    type: SET_SELECTED_CHANNEL_SUCCESS_ADDLEAD,
    payload: source,
  });
  // if (source != null) {

  dispatch(getMediumListAddLead());
  dispatch({
    type: LEAD_TABLE_DATA_SUCCESS,
    payload: [],
    updatedMasterData: [],
    updatedFilterData: [],
  });

  dispatch(getLeadsTableData());
  // }
};





export const setSelectedStatus = (source) => (dispatch, getState) => {
  console.log("status", source);

  dispatch({
    type: SET_SELECTED_STATUS,
    payload: source,
  });
};



export const setSelectedLocation = (source) => (dispatch, getState) => {

  dispatch({
    type: SET_SELECTED_LOCATION,
    payload: source,
  });
};

export const setSelectedHandoverTrigger = (source) => (dispatch, getState) => {

  dispatch({
    type: SET_HANDOVER_TRIGGER,
    payload: source,
  });
};


export const setSelectedCountry = (source) => (dispatch, getState) => {

  dispatch({
    type: SET_SELECTED_COUNTRY,
    payload: source,
  });
};




export const setSelectedMedium = (value) => (dispatch, getState) => {
  console.log("medium", value);

  dispatch({
    type: SET_SELECTED_MEDIUM,
    payload: value,
  });
};

export const setSelectedSource = (value) => (dispatch, getState) => {
  console.log("medium", value);

  dispatch({
    type: SET_SELECTED_SOURCE,
    payload: value,
  });
};

export const setSelectedSubSource = (value) => (dispatch, getState) => {
  console.log("subsource", value);

  dispatch({
    type: SET_SELECTED_SUBSOURCE,
    payload: value,
  });
};
export const setSelectedCampName = (value) => (dispatch, getState) => {
  console.log("subsource", value);

  dispatch({
    type: SET_SELECTED_CAMPNAME,
    payload: value,
  });
};
export const setSelectedCampTerm = (value) => (dispatch, getState) => {
  console.log("subsource", value);

  dispatch({
    type: SET_SELECTED_CAMPTERM,
    payload: value,
  });
};

export const setSelectedCampContent = (value) => (dispatch, getState) => {
  console.log("subsource", value);

  dispatch({
    type: SET_SELECTED_CAMPCONTENT,
    payload: value,
  });
};

export const setSelectedProject = (value) => (dispatch, getState) => {
  console.log("subsource", value);

  dispatch({
    type: SET_SELECTED_PROJECT,
    payload: value,
  });
};



export const setSelectedPreSaleExecutive = (value) => (dispatch, getState) => {
  console.log("subsource", value);

  dispatch({
    type: SET_SELECTED_PRESALE_EXECUTIVE,
    payload: value,
  });
};


export const setSelectedSalesExecutive = (value) => (dispatch, getState) => {
  console.log("subsource", value);

  dispatch({
    type: SET_SELECTED_SALES_EXECUTIVE,
    payload: value,
  });
};


export const setSearchValue = (value) => (dispatch, getState) => {
  console.log("Search", value);

  dispatch({
    type: SET_SEARCH_VALUE,
    payload: value,
  });

  // dispatch(getFilteredLeadList());
  // }
};

export const getMediumList = () => (dispatch, getState) => {
  const { channel } = getState().leads;
  dispatch({ type: LEAD_MEDIUM_REQUEST });
  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/settings/medium/list`, {
      channelId: channel ? channel._id : null,
    })
    .then((res) => {
      dispatch({ type: LEAD_MEDIUM_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: LEAD_MEDIUM_FAILURE, payload: err }));
};



export const getMediumListAddLead = () => (dispatch, getState) => {
  const { selChannelAddLead } = getState().leads;
  dispatch({ type: LEAD_MEDIUM_REQUEST });
  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/settings/medium/list`, {
      channelId: selChannelAddLead ? selChannelAddLead._id : null,
    })
    .then((res) => {
      dispatch({ type: LEAD_MEDIUM_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: LEAD_MEDIUM_FAILURE, payload: err }));
};





export const editLead = (leadData) => (dispatch, getState) => {
  const { stage, statuss } = getState().leads;

  console.log("Assignin Lead Process Started .....................", `${Config[process.env.NODE_ENV].baseUrl}/leads/edit`, leadData);
  console.log("Lead data", leadData);
  dispatch({ type: LEAD_SUBMIT_REQUEST });

  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/leads/edit`, leadData)
    .then((res) => {
      console.log("Lead Data", res);

      // dispatch({ type: LEAD_SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: LEAD_SUBMIT_FAILURE, payload: err }));
};


export const setAddDataSuccess = (value) => (dispatch, getState) => {
  console.log("subsource", value);

  dispatch({
    type: SET_ADD_DATA_SUCCESS,
    payload: value,
  });
};




export const submitLead = (data) => (dispatch, getState) => {
  const { stage, statuss } = getState().leads;

  let userData = JSON.parse(localStorage.getItem('epitomeUser'))

  var leadData = {
    flag: "active",
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    location: data.location,
    activityTimeline: [],
    projects: [data.project],
    assignedTo: "",
    // presaleExecutive: data.presale,
    // presaleExecutive: data.presaleExecutive,
    // salesExecutive: data.salesExecutive,
    presaleManager: "",
    nextContactDate: "",
    comments: "",
    stage: data.stage,
    status: data.status,
    ureadNotification: true,
    channel: data.channel,
    medium: data.medium,
    primarySource: "",
    campaignname: data.campName,
    campaignterm: data.campTerm,
    campaigncontent: data.campContent,
    source: data.source,
    subSource: data.subsource,
    // salesExecutive: data.sales,
    username: userData.firstName,
    userId: userData._id
  };

  if (data.presaleExecutive === "") {
    Object.assign(leadData, { salesExecutive: data.salesExecutive });
  }
  else if (data.salesExecutive === "") {
    Object.assign(leadData, { presaleExecutive: data.presaleExecutive, });
  }

  console.log("Add URL.............", `${Config[process.env.NODE_ENV].baseUrl}/leads/add`);
  console.log("Lead data...........", leadData);


  dispatch({ type: LEAD_SUBMIT_REQUEST });
  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/leads/add`, leadData)
    .then((res) => {
      console.log("Lead Data", res);
      dispatch({ type: LEAD_SUBMIT_SUCCESS, payload: res.data });
      dispatch(setAddDataSuccess(true));
    })
    .catch((err) => dispatch({ type: LEAD_SUBMIT_FAILURE, payload: err }));
};

export const getleadSource = (id) => (dispatch, getState) => {
  dispatch({ type: LEAD_SOURCE_REQUEST });

  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/settings/source/list`, {
      mediumId: id,
    })
    .then((res) => {
      dispatch({ type: LEAD_SOURCE_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: LEAD_SOURCE_FAILURE, payload: err }));
};

export const getleadSubSource = (id) => (dispatch, getState) => {
  dispatch({ type: LEAD_SUB_SOURCE_REQUEST });

  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/settings/subsource/list`, {
      sourceId: id,
    })
    .then((res) => {
      dispatch({ type: LEAD_SUB_SOURCE_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: LEAD_SUB_SOURCE_FAILURE, payload: err }));
};
export const getleadcampaign = (id) => (dispatch, getState) => {
  dispatch({ type: LEAD_CAMPAIGN_REQUEST });
  // dispatch(getleadcampaign(id));

  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/settings/campaign/list`)
    .then((res) => {
      dispatch({ type: LEAD_CAMPAIGN_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: LEAD_CAMPAIGN_FAILURE, payload: err }));
};
export const getleadcampaignTerm = (id) => (dispatch, getState) => {
  dispatch({ type: LEAD_CAMPAIGN_TERM_REQUEST });
  // dispatch(getleadcampaign(id));

  axiosTokenised
    .post(
      `${Config[process.env.NODE_ENV].baseUrl}/settings/campaignTerm/list`,
      { campaignId: id }
    )
    .then((res) => {
      console.log("Term", res);
      dispatch({ type: LEAD_CAMPAIGN_TERM_SUCCESS, payload: res.data });
    })
    .catch((err) =>
      dispatch({ type: LEAD_CAMPAIGN_TERM_FAILURE, payload: err })
    );
};

export const getleadcampaignContent = (id) => (dispatch, getState) => {
  dispatch({ type: LEAD_CAMPAIGN_CONTENT_REQUEST });
  // dispatch(getleadcampaign(id));

  axiosTokenised
    .post(
      `${Config[process.env.NODE_ENV].baseUrl}/settings/campaignContent/list`,
      { campaignId: id }
    )
    .then((res) => {
      console.log("Term", res);
      dispatch({ type: LEAD_CAMPAIGN_CONTENT_SUCCESS, payload: res.data });
    })
    .catch((err) =>
      dispatch({ type: LEAD_CAMPAIGN_CONTENT_FAILURE, payload: err })
    );
};

export const getleadStages = () => (dispatch, getState) => {
  dispatch({ type: LEAD_STAGE_REQUEST });
  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/settings/stage/list`)
    .then((res) => {
      console.log("Stages", res);

      dispatch({ type: LEAD_STAGE_SUCCESS, payload: res.data });
      dispatch(getleadStatus());
    })
    .catch((err) => dispatch({ type: LEAD_STAGE_FAILURE, payload: err }));
};

export const getleadStatus = (id) => (dispatch, getState) => {
  const { stages } = getState().leads;
  dispatch({ type: LEAD_STATUS_REQUEST });
  // dispatch({ type: LEAD_SOURCE_SUCCESS, payload: campSource });
  const { token } = JSON.parse(localStorage.getItem("epitomeUser"));
  var filterParam = {};
  filterParam.token = token;
  filterParam.stageId = id;
  var statusArray = [];

  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/settings/status/list`)
    .then((res) => {
      console.log("StaTUS", res);
      res.data.map((resItem) => {
        var status = {};
        var statuses = [];

        status.stage = resItem.stageId.name;
        statuses.push(resItem.name);
        status.status = statuses;
        // status.statuses.push(resItem.name);
        // checkAbsent(resItem.stageId.name, statusArray);

        statusArray.map((ele, ind) => {
          if (ele.stage !== resItem.stageId.name) {
            //console.log("index", ind);
            //console.log("jjj");
            // statusArray[ind];
            // statusArray.splice(ind, 1);
            // console.log()
          }
        });
        statusArray.push(status);
      });
      console.log("Status array", statusArray);

      dispatch({ type: LEAD_STATUS_SUCCESS, payload: res.data });
    });

  // .catch((err) => dispatch({ type: LEAD_STATUS_FAILURE, payload: err }));
};

export const getFilterDataList = () => (dispatch, getState) => {
  dispatch({ type: LEAD_FILTER_DATA_REQUEST });
  dispatch({
    type: LEAD_FILTER_DATA_SUCCESS,
    leadFilterOption: leadFilterDataList,
  });
  // axios
  // 	.get(`${Config[process.env.NODE_ENV].baseUrl}/language?$limit=30`)
  // 	.then((res) => {
  // 		dispatch({ type: LEAD_SOURCE_SUCCESS, payload: res.data });

  // 	})
  // 	.catch((err) => dispatch({ type:  LEAD_SOURCE_FAILURE, payload: err }));
};

export const getLeadsTableHead = () => (dispatch, getState) => {
  // dispatch({ type: LEAD_TABLE_DATA_REQUEST });
  dispatch({ type: LEAD_TABLE_HEAD_REQUEST });
  dispatch({
    type: LEAD_TABLE_HEAD_SUCCESS,
    headCells: headCells,
  });
};

export const setFromDate = (fromDate) => (dispatch, getState) => {
  dispatch({
    type: SET_FROM_DATE,
    payload: fromDate,
  });
};
export const setToDate = (toDate) => (dispatch, getState) => {
  dispatch({
    type: SET_TO_DATE,
    payload: toDate,
  });
};
export const setDateLabel = (toDate) => (dispatch, getState) => {
  dispatch({
    type: SET_DATE_LABEL,
    payload: toDate,
  });
};

export const getLeadsTableData = (limit, skip) => (dispatch, getState) => {
  console.log("<.........................Updating Table..............................>");
  console.log("LIMIT SKIP", limit, skip);

  const {
    filterdata,
    masterData,
    channel,
    selMedium,
    selSource,
    selSubSource,
    selCampName,
    selCampTerm,
    selCampContent,
    selProject,
    selPreSaleExe,
    selSalesExe,
    searchText,
    dateLabel,
    fromDate,
    toDate,
    statuss,
    selLocation,
    selHandoverTrigger


  } = getState().leads;




  // if (channel != null) {
  //   let channelParam=&$channel=channel.name
  // }
  let query = "";

  if (channel !== null) {
    query = `&channel=${channel.name}`;
  }

  if (statuss !== null) {
    query += `&status=${statuss.status_id}`;
  }

  if (selMedium !== null) {
    query += `&medium=${selMedium.name}`;
  }

  if (selSource !== null) {
    query += `&source=${selSource.name}`;
  }
  if (selSubSource !== null) {
    query += `&subSource=${selSubSource.name}`;
  }
  if (selCampName !== null) {
    query += `&campaignname=${selCampName.name}`;
  }
  if (selCampTerm !== null) {
    query += `&campaignterm=${selCampTerm.name}`;
  }

  if (selCampContent !== null) {
    query = `&campaigncontent=${selCampContent.name}`;
  }

  if (selPreSaleExe !== null) {
    query += `&presaleExecutive=${selPreSaleExe._id}`;
  }

  if (selSalesExe !== null) {
    query += `&salesExecutive=${selSalesExe._id}`;
  }

  if (selLocation !== null) {
    query += `&location=${selLocation.name}`;
  }


  if (selHandoverTrigger !== null) {
    query += `&isHandoverCompleted=${false}`;

    if (selHandoverTrigger === "presaletoSales") {
      query += `&handoverRequestedTo=salesExecutive`;
    }
    else if (selHandoverTrigger === "salestoPresale") {
      query += `&handoverRequestedTo=presaleExecutive`;
    }

  }




  //  if (selCountry !== null) {

  //    query += `&country=${selCountry.name}`;

  //  }




  if (selProject !== null) {
    query += `&projects=${selProject.name}`;
  }
  if (searchText !== null) {
    // query += `&projects=${selProject.name}`;
    query += `&$regex[0][firstName]=${searchText}&$regex[1][lastName]=${searchText}&$regex[2][email]=${searchText}&$regex[3][phone]=${searchText}`;
  }



  let dummydataLabels = ["createdAt", "updatedAt"]

  if (dateLabel !== null) {
    

    var from = new Date(fromDate)//.toJSON();
    var to = new Date(toDate)//.toJSON();

   


    if (dateLabel === dummydataLabels[0]) {

      query += `&${dateLabel}[$gt]=${ConvertDateToLocal_YYMMDD(from.setDate( from.getDate() - 0 ))}`;
      query += `&${dateLabel}[$lt]=${ConvertDateToLocal_YYMMDD(to.setDate( to.getDate() + 1 ))}`;
     
    }
    else if (dateLabel === dummydataLabels[1]) {
      query += `&${dateLabel}[$gt]=${ConvertDateToLocal_YYMMDD(from.setDate( from.getDate() - 0 ))}`;
      query += `&${dateLabel}[$lt]=${ConvertDateToLocal_YYMMDD(to.setDate( to.getDate() + 1 ))}`;
    }


  }

  // $regex[0][firstName]=de&$regex[1][lastName]=de&$regex[2][email]=de&$regex[3][phone]=de

  console.log("URL++++++++++++", `${Config[process.env.NODE_ENV].baseUrl
    }/leads/list?$sort[createdAt]=-1&$limit=${limit}&$skip=${10 * skip
    }${query}`);

  console.log("Filter Querry....>", query);


  dispatch({ type: LEAD_TABLE_DATA_REQUEST });
  axiosTokenised
    // .post(`${Config[process.env.NODE_ENV].baseUrl}/leads/list`, query)
    .get(
      `${Config[process.env.NODE_ENV].baseUrl
      }/leads/list?$sort[createdAt]=-1&$limit=${limit}&$skip=${10 * skip
      }${query}`
    )
    // ?$sort[createdAt]=-1
    .then((res) => {
      console.log("Leads Res.........................................", res);

      const updatedMasterData = [...new Set(masterData.concat(res.data))];
      const updatedFilterData = [...new Set(filterdata.concat(res.data))];
      // const updatedMasterData = [...masterData, ...res.data];
      // const updatedFilterData = [...filterdata, ...res.data];
      var uniq = {};
      var arr = [{ id: "1" }, { id: "1" }, { id: "2" }];
      var arrFiltered = updatedFilterData.filter(
        (obj) => !uniq[obj._id] && (uniq[obj._id] = true)
      );
      console.log("arrFiltered", arrFiltered);

      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: res.data,
        updatedMasterData: arrFiltered,
        updatedFilterData: arrFiltered,
      });
      // dispatch({
      //   type: LEADS_COUNT_SUCCESS,
      //   payload: updatedFilterData.length,
      // });

      console.log("updated Res", filterdata);
    })

    .catch((err) => dispatch({ type: LEAD_TABLE_DATA_FAILURE, payload: err }));
};
export const getLeadsCount =
  (query = {}) =>
    (dispatch, getState) => {
      dispatch({ type: LEADS_COUNT_REQUEST });
      axiosTokenised
        // .post(`${Config[process.env.NODE_ENV].baseUrl}/leads/list`, query)
        .get(
          `${Config[process.env.NODE_ENV].baseUrl}/leads/list?$limit=-1&$skip=-1`
        )
        // ?$sort[createdAt]=-1
        .then((res) => {
          console.log("Leads COUNT", res);
          dispatch({
            type: LEADS_COUNT_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => dispatch({ type: LEADS_COUNT_FAILURE, payload: err }));
    };





  export const getDashboardLeadsCount = (limit, skip) => (dispatch, getState) =>  {

    console.log(".......................Startf Fetching Master Data");
      dispatch({ type: LEADS_COUNT_REQUEST });
      axiosTokenised
        // .post(`${Config[process.env.NODE_ENV].baseUrl}/leads/list`, query)
        .get(
          `${Config[process.env.NODE_ENV].baseUrl
          }/leads/list?$sort[createdAt]=-1&$limit=${limit}&$skip=${10 * skip
          }`
        )
        // ?$sort[createdAt]=-1
        .then((res) => {

          console.log(".......................Master Data",res);
    
          dispatch({
            type: DASHBOSRD_LEADS_COUNT_SUCCESS,
            payload: res.data,
          });

        })
        .catch((err) => dispatch({ type: LEADS_COUNT_FAILURE, payload: err }));
    };






export const getFilteredLeadList = (filterParam) => (dispatch, getState) => {
  const {
    channel,
    statuss,
    stage,
    selMedium,
    selSource,
    selSubSource,
    selCampName,
    selCampTerm,
    selCampContent,
    selProject,
    selPreSaleExe,
    emailSearch,
    phoneSearch,
    nameSearch,
  } = getState().leads;
  console.log("Stage", selCampName);

  var filterParam = {};
  if (channel != null) filterParam.channel = channel.name;
  if (statuss != null) filterParam.status = statuss;
  if (stage != null) filterParam.stage = stage;
  if (selMedium != null) filterParam.medium = selMedium.name;
  if (selSource != null) filterParam.source = selSource.name;
  if (selSubSource != null) filterParam.subSource = selSubSource.name;
  if (selCampName != null) filterParam.campaignname = selCampName.name;
  if (selCampTerm != null) filterParam.campaignterm = selCampTerm.name;
  if (selCampContent != null) filterParam.campaigncontent = selCampContent.name;
  if (selProject != null) filterParam.projects = selProject.name;
  if (selPreSaleExe != null)
    filterParam.presaleExecutive = selPreSaleExe.firstName;
  if (emailSearch != null) filterParam.email = emailSearch;
  if (phoneSearch != null) filterParam.phone = phoneSearch;

  if (nameSearch != null) filterParam.firstName = nameSearch;

  // filterParam.email = "johndoe@yopmail.com";

  console.log("Filter Param", filterParam);
  dispatch({ type: LEAD_TABLE_DATA_REQUEST });

  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/leads/list`, filterParam)
    .then((res) => {
      console.log("res filter", res.data);
      dispatch({ type: LEAD_TABLE_DATA_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: LEAD_TABLE_DATA_FAILURE, payload: err }));
};
