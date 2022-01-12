import {
  LEAD_SOURCE_FAILURE,
  LEAD_SOURCE_SUCCESS,
  LEAD_SOURCE_REQUEST,
  LEAD_SUB_SOURCE_FAILURE,
  LEAD_SUB_SOURCE_SUCCESS,
  LEAD_SUB_SOURCE_REQUEST,
  LEAD_CAMPAIGN_FAILURE,
  LEAD_CAMPAIGN_SUCCESS,
  LEAD_CAMPAIGN_REQUEST,
  LEAD_CHANNEL_SUCCESS,
  LEAD_CHANNEL_REQUEST,
  LEAD_CHANNEL_FAILURE,
  LEAD_FILTER_DATA_SUCCESS,
  LEAD_FILTER_DATA_REQUEST,
  LEAD_FILTER_DATA_FAILURE,
  LEAD_TABLE_HEAD_SUCCESS,
  LEAD_TABLE_HEAD_REQUEST,
  LEAD_TABLE_HEAD_FAILURE,
  LEAD_TABLE_DATA_SUCCESS,
  LEAD_TABLE_DATA_FAILURE,
  LEAD_TABLE_DATA_REQUEST,
  SET_SELECTED_CHANNEL_SUCCESS,
  LEAD_STAGE_SUCCESS,
  LEAD_STAGE_FAILURE,
  LEAD_STAGE_REQUEST,
  LEAD_STATUS_FAILURE,
  LEAD_STATUS_REQUEST,
  LEAD_STATUS_SUCCESS,
  LEAD_MEDIUM_SUCCESS,
  LEAD_MEDIUM_FAILURE,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
  GET_PROJECT_REQUEST,
  LEAD_CAMPAIGN_TERM_FAILURE,
  LEAD_CAMPAIGN_TERM_REQUEST,
  LEAD_CAMPAIGN_TERM_SUCCESS,
  LEAD_CAMPAIGN_CONTENT_FAILURE,
  LEAD_CAMPAIGN_CONTENT_REQUEST,
  LEAD_CAMPAIGN_CONTENT_SUCCESS,
  SET_SELECTED_STATUS,
  RESET_ADDLEAD_FIELD,
  SET_SELECTED_SOURCE,
  SET_SELECTED_MEDIUM,
  SET_SELECTED_SUBSOURCE,
  RESET_SELECTED_STATUS,
  SET_SELECTED_CAMPNAME,
  SET_SELECTED_CAMPTERM,
  SET_SELECTED_CAMPCONTENT,
  SET_SELECTED_PROJECT,
  SET_SELECTED_PRESALE_EXECUTIVE,
  SET_SEARCH_VALUE,
  RESET_FILTER,
  LEADS_COUNT_REQUEST,
  LEADS_COUNT_FAILURE,
  SET_FROM_DATE,
  SET_TO_DATE,
  LEADS_COUNT_SUCCESS,
  SET_DATE_LABEL,
  SET_SELECTED_SALES_EXECUTIVE,
  SET_SELECTED_LOCATION,
  SET_SELECTED_COUNTRY,
  SET_HANDOVER_TRIGGER,
  SET_ADD_DATA_SUCCESS,
  SET_SELECTED_CHANNEL_SUCCESS_ADDLEAD,
  DASHBOSRD_LEADS_COUNT_SUCCESS,
} from "../actionTypes/Leads";

const initialState = {
  filterdata: [],
  masterData: [],
  leadSource: [],
  leadFilterData: [],
  headCells: [],
  rows: [],
  loader: false,
  channel: null,
  selChannelAddLead:null,
  stages: [],
  status: [],
  medium: [],
  source: [],
  subsource: [],
  campaign: [],
  projects: [],
  campaignTerm: [],
  campaignContent: [],
  stage: null,
  statuss: null,
  selMedium: null,
  selSource: null,
  selSubSource: null,
  selCampName: null,
  selCampTerm: null,
  selCampContent: null,
  selProject: null,
  selPreSaleExe: null,
  selSalesExe: null,
  searchText: null,
  leadCount: 0,
  fromDate: new Date(),
  toDate: new Date(),
  dateLabel: null,
  selLocation:null,
  selHandoverTrigger:null,
  selCountry:null,
  addLeadSuccess:false
};

const LeadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        loader: false,
      };
    case GET_PROJECT_FAILURE:
      return {
        ...state,
        loader: false,
      };
    case LEAD_CHANNEL_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case LEAD_CHANNEL_SUCCESS:
      return {
        ...state,
        leadSource: [...action.payload],
        loader: false,
      };
    case LEAD_CHANNEL_FAILURE:
      return {
        ...state,
        loader: false,
      };
    case LEAD_FILTER_DATA_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case LEAD_FILTER_DATA_SUCCESS:
      return {
        ...state,
        leadFilterData: action.leadFilterOption,
        loader: false,
      };

    case LEAD_TABLE_HEAD_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case LEAD_TABLE_HEAD_SUCCESS:
      return {
        ...state,
        headCells: action.headCells,
        loader: false,
      };
    case LEAD_TABLE_HEAD_FAILURE:
      return {
        ...state,
        loader: false,
      };
    case LEAD_TABLE_DATA_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case LEAD_TABLE_DATA_SUCCESS:
      return {
        ...state,
        rows: action.payload,
        filterdata: action.updatedFilterData,
        // masterData: action.updatedMasterData,
        loader: false,
      };
    case LEAD_TABLE_DATA_FAILURE:
      return {
        ...state,
        loader: false,
      };

    case LEADS_COUNT_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case LEADS_COUNT_SUCCESS:
      return {
        ...state,
        leadCount: action.payload,
        loader: false,
      };

      case DASHBOSRD_LEADS_COUNT_SUCCESS:
        return {
          ...state,
          masterData: action.payload,
          loader: false,
        };


    case LEADS_COUNT_FAILURE:
      return {
        ...state,
        loader: false,
      };
    case SET_SELECTED_CHANNEL_SUCCESS:
      return {
        ...state,
        channel: action.payload,
      };

      case SET_SELECTED_CHANNEL_SUCCESS_ADDLEAD:
      return {
        ...state,
        selChannelAddLead: action.payload,
      };

    case LEAD_STAGE_REQUEST:
      return {
        ...state,
      };

    case LEAD_STAGE_SUCCESS:
      return {
        ...state,
        stages: action.payload,
      };
    case LEAD_STAGE_FAILURE:
      return {
        ...state,
      };
    case LEAD_STATUS_REQUEST:
      return {
        ...state,
      };

    case LEAD_STATUS_SUCCESS:
      return {
        ...state,
        status: action.payload,
      };
    case LEAD_STATUS_FAILURE:
      return {
        ...state,
      };
    case LEAD_MEDIUM_SUCCESS:
      return {
        ...state,
        medium: action.payload,
      };
    case LEAD_MEDIUM_FAILURE:
      return {
        ...state,
      };
    case LEAD_SOURCE_SUCCESS:
      return {
        ...state,
        source: action.payload,
      };
    case LEAD_SOURCE_FAILURE:
      return {
        ...state,
      };
    case LEAD_SUB_SOURCE_SUCCESS:
      return {
        ...state,
        subsource: action.payload,
      };
    case LEAD_SUB_SOURCE_FAILURE:
      return {
        ...state,
      };
    case LEAD_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaign: action.payload,
      };
    case LEAD_CAMPAIGN_FAILURE:
      return {
        ...state,
      };
    case LEAD_CAMPAIGN_TERM_SUCCESS:
      return {
        ...state,
        campaignTerm: action.payload,
      };
    case LEAD_CAMPAIGN_TERM_FAILURE:
      return {
        ...state,
      };
    case LEAD_CAMPAIGN_CONTENT_SUCCESS:
      return {
        ...state,
        campaignContent: action.payload,
      };
    case LEAD_CAMPAIGN_CONTENT_FAILURE:
      return {
        ...state,
      };
    case SET_SELECTED_STATUS:
      return {
        ...state,
        stage: action.payload.stageId,
        statuss: action.payload,
      };

      case SET_SELECTED_LOCATION:
        return {
          ...state,
          selLocation: action.payload,
        };

        case SET_HANDOVER_TRIGGER:
          return {
            ...state,
            selHandoverTrigger: action.payload,
          };

        case SET_SELECTED_COUNTRY:
          return {
            ...state,
            selCountry: action.payload,
          };





    case RESET_SELECTED_STATUS:
      return {
        ...state,
        stage: null,
        statuss: null,
      };

    case SET_SELECTED_MEDIUM:
      return {
        ...state,
        selMedium: action.payload,
      };

    case SET_SELECTED_SOURCE:
      return {
        ...state,
        selSource: action.payload,
      };
    case SET_SELECTED_SUBSOURCE:
      return {
        ...state,
        selSubSource: action.payload,
      };
    case SET_SELECTED_CAMPNAME:
      return {
        ...state,
        selCampName: action.payload,
      };

    case SET_SELECTED_CAMPTERM:
      return {
        ...state,
        selCampTerm: action.payload,
      };
    case SET_SELECTED_CAMPCONTENT:
      return {
        ...state,
        selCampContent: action.payload,
      };

    case SET_SELECTED_PROJECT:
      return {
        ...state,
        selProject: action.payload,
      };


    case SET_SELECTED_PRESALE_EXECUTIVE:
      return {
        ...state,
        selPreSaleExe: action.payload,
      };

      case SET_SELECTED_SALES_EXECUTIVE:

      console.log("set sales...>",action.payload );
        return {
          ...state,
          selSalesExe: action.payload,
        };



    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchText: action.payload,
      };

      
    case SET_ADD_DATA_SUCCESS:
      return {
        ...state,
        addLeadSuccess: action.payload,
      };


    case SET_FROM_DATE:
      return {
        ...state,
        fromDate: action.payload,
      };
    case SET_TO_DATE:
      return {
        ...state,
        toDate: action.payload,
      };
    case SET_DATE_LABEL:
      return {
        ...state,
        dateLabel: action.payload,
      };

    case RESET_ADDLEAD_FIELD:
      return {
        ...state,
        medium: [],
        source: [],
        subsource: [],
        campaign: [],
        projects: [],
        campaignTerm: [],
        campaignContent: [],
        stage: null,
        statuss: null,
      };
    case RESET_FILTER:
      return {
        ...state,
        filterdata: [],
        // masterData: [],
        // leadSource: [],
        leadFilterData: [],
        headCells: [],
        rows: [],
        loader: false,
        channel: null,
        stages: [],
        status: [],
        medium: [],
        source: [],
        subsource: [],
        campaign: [],
        // projects: [],
        campaignTerm: [],
        campaignContent: [],
        stage: null,
        statuss: null,
        selMedium: null,
        selSource: null,
        selSubSource: null,
        selCampName: null,
        selCampTerm: null,
        selCampContent: null,
        selProject: null,
        selPreSaleExe: null,
        selSalesExe: null,
        searchText: null,
        // leadCount: 0,
        fromDate: new Date(),
        toDate: new Date(),
        // toDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        dateLabel: null,

        selLocation:null,
        selCountry:null,
        selHandoverTrigger:null
      };

    default:
      return state;
  }
};

export default LeadsReducer;
