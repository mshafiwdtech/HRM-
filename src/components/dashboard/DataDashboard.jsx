import React from "react";
import LeadDetails_v2 from "./V2/LeadDetails/LeadDetails_v2";
import SalesDetails_v2 from "./V2/SalesDetails/SalesDetails_v2";
export default function Dashboard() {
  return (
    <div style={{ backgroundColor: "#ECF1F9",padding:0,minHeight:"100vh",paddingBottom:"20px"}}>
      {" "}
      <div>
        {/* <LeadDetails />  */}
        <LeadDetails_v2 />

      </div>
      <div>
        {/* <SalesDetails /> */}
        <SalesDetails_v2 />
      </div>
    </div>
  );
}
