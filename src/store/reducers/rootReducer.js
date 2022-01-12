import { combineReducers } from "redux";
import sampleReducer from "./sample";
import settingReducer from "./setting";
import leadReducer from "./Leads";
import loginReducer from "./Login";
import SingleLeadReducer from "./SingleLead";
import userReducer from "./Users";
import notificationReducer from "./Notification";

const rootReducer = combineReducers({
  sample: sampleReducer,
  leads: leadReducer,
  setting: settingReducer,
  login: loginReducer,
  leadSingle: SingleLeadReducer,
  user: userReducer,
  notification: notificationReducer
});

export default rootReducer;
