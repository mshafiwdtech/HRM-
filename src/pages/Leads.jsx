import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "../layouts/V2/Main_V2";
import DataLeads from "../components/leads/DataLeads";
import { getLeadsTableData, getLeadsCount, getleadStages } from "../store/actions/Leads";
import { LEAD_TABLE_DATA_SUCCESS } from "../store/actionTypes/Leads";
import Container from "@material-ui/core/Container";
import { loadStageStatusApi } from "../store/actions/Settings";

import './leads.css'
import DataLeadsResponsive from "../components/leads/DataLeadsResponsive/DataLeadsResponsive";

const Dashboard = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const { token } = JSON.parse(localStorage?.getItem("epitomeUser")) || "";
  //   if (token) {
  //     // dispatch(getLeadsTableData());

  //     dispatch(getLeadsCount());
  //     dispatch(getleadStages());
  //   }
  // }, [dispatch]);

  useEffect(() => {

    dispatch(loadStageStatusApi('stageStatusData'))

  }, [])



  // useEffect(() => {
  //   const { token } = JSON.parse(localStorage?.getItem("epitomeUser"));
  //   console.log("Token", token);
  //   if (token) {
  //     dispatch(getProjectList());
  //     dispatch(getSingleUser({ role: "Pre Sale Executive" }));
  //     dispatch(getSalesExecutive({ role: "Sales Executive" }));
  //     dispatch(getleadStages());
  //     dispatch(getleadChannel());
  //   }
  // }, [dispatch]);
  return (
    <MainLayout>
      <div style={{ maxHeight: "100vh", overflow: "hidden", paddingBottom: "100px" }} className="d-flex flex-column align-items-center p-0 m-0">

        <Container style={{ overflow: "auto", maxWidth: "95vw",marginTop:10, padding:0 }}>


          <div className="normal-data-leads">
            <DataLeads /> 
           
          </div>

          <div className="responsive-data-leads p-0">
            <DataLeadsResponsive/>
          </div>

        </Container>

      </div>

    </MainLayout>
  );
};

export default Dashboard;
