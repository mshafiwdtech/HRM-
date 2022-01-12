import SingleLead from "../components/leadSingle/SingleLead";
 import MainLayout from "../layouts/Main";
// import MainLayout from "../layouts/V2/Main_V2";

const LeadDetails = (props) => {
  console.log("incomingData", props);
  return (
    <MainLayout>
      <SingleLead />
    </MainLayout>
  );
};

export default LeadDetails;
