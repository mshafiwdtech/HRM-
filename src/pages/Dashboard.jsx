import MainLayout from "../layouts/V2/Main_V2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DataDashborad from "../components/dashboard/DataDashboard";
import { getDashboardLeadsCount, getLeadsCount, getLeadsTableData, getProjectList } from "../store/actions/Leads";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { token } = JSON.parse(localStorage?.getItem("epitomeUser"));
    console.log("Token", token);
    if (token) {
      dispatch(getLeadsCount());
      dispatch(getDashboardLeadsCount());
      // dispatch(getProjectList());
    }
  }, [dispatch]);
  return (
    <MainLayout>
      <div style={{maxWidth: "100%",maxHeight:"100vh",overflow:"scroll",paddingBottom:"100px" }}>
        {/* <div className="add-lead-float"> */}
        {/* </div> */}
        <DataDashborad />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
