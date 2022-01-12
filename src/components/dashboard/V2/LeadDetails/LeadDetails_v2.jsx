import React, { useEffect, useState } from "react";
import { ClickIcon, HandShake, HomeIcon, SaledIcon } from "../../../../assets/Icons";
import { makeStyles } from "@material-ui/core";
import "./leaddetails.css";
import AddLeadDialouge from "../../AddLeadDialouge";
import { Col, Container, Row } from "react-bootstrap";
import ResFreeSel from "../../../ResponsiveFreequancySelector/ResFreeSel";
import { useSelector, useDispatch } from "react-redux";

import { getLeadsTableData, setAddDataSuccess, } from "../../../../store/actions/Leads";

import { getDashboardCountsFromFilterData } from '../../../../helpers/helperFunctions'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));




function LeadDetails_v2() {


  let [activeBadge, setActiveBadge] = useState("year");
  const [opens, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getLeadsTableData());

  }, [])

  const { leadCount, masterData, addLeadSuccess } = useSelector((state) => state.leads);

  let dashCount = getDashboardCountsFromFilterData(masterData, activeBadge)


  //Success message snack...........................................................
  let setOpenSuccess = (para) => {

    dispatch(setAddDataSuccess(para));

  }


  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  //............................................................................................



  return (

    <>

      <div className="leads-container">

        <div className="leads-main-container">

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={addLeadSuccess}
            autoHideDuration={2000}
            onClose={handleCloseSuccess}>
            <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
              Lead successfully added
            </Alert>
          </Snackbar>



          <Container fluid style={{ padding: 0, }}>
            <Row style={{ width: "100%", margin: 0 }} className="small-grid-container">


              <Col xs={12} sm={12} md={12} lg={12} style={{ margin: 0 }}>
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",


                  }}
                >

                  <div className="add-lead-float">
                    {/* <AddLeadDialouge /> */}
                    <AddLeadDialouge />
                  </div>

                  <div className="leads-main-filter-container">
                    <div className="filter-badge-container">
                      <span style={{ color: "#9e9e9e" }}>
                        Select option to see the result of particular time period
                      </span>

                      <div className="small-freequancy-selector">
                        <ResFreeSel setValue={setActiveBadge} value={activeBadge} />
                      </div>

                      <div className="large-freequancy-selector">

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            marginTop: "10px",
                          }}
                        >
                          <div
                            onClick={() => setActiveBadge("year")}
                            className={
                              activeBadge === "year" ? "date-badge-active" : "date-badge"
                            }
                          >
                            Year
                          </div>

                          <div
                            onClick={() => setActiveBadge("month")}
                            className={
                              activeBadge === "month" ? "date-badge-active" : "date-badge"
                            }
                          >
                            Month
                          </div>

                          <div
                            onClick={() => setActiveBadge("week")}
                            className={
                              activeBadge === "week" ? "date-badge-active" : "date-badge"
                            }
                          >
                            Week
                          </div>

                          <div
                            onClick={() => setActiveBadge("yesterday")}
                            className={
                              activeBadge === "yesterday" ? "date-badge-active" : "date-badge"
                            }
                          >
                            Yesterday
                          </div>

                          <div
                            onClick={() => setActiveBadge("today")}
                            className={
                              activeBadge === "today" ? "date-badge-active" : "date-badge"
                            }
                          >
                            Today
                          </div>
                        </div>

                      </div>



                    </div>
                  </div>

                  <div className="other-box-container">


                    <div className="total-box">
                      <span className="total-box-count">
                        <div className="total-box-count-top">{dashCount?._total}</div>
                        <div className="total-box-count-top" style={{ fontSize: "12px" }}>Unique</div>


                      </span>
                      <span className="total-box-heading">Total Leads - {dashCount?._total}</span>
                    </div>



                    <Row style={{ width: "100%", margin: 0, padding: 0 }} >

                      <Col xs={6} sm={6} md={3} lg={3} style={{ padding: ".3rem" }}>

                        <div className="other-box-new">
                          <div className="other-box-icon">
                            <ClickIcon />
                            {console.log(dashCount)}
                            <span className="other-box-count">{dashCount?._new}</span>
                          </div>

                          <div className="other-box-text">

                            <span className="other-box-heading">NEW</span>
                          </div>
                        </div>

                      </Col>

                      <Col xs={6} sm={6} md={3} lg={3} style={{ padding: ".3rem" }}>

                        <div className="other-box-hot">
                          <div className="other-box-icon">

                            <HandShake />
                            <span className="other-box-count">{dashCount?._hot}</span>
                          </div>

                          <div className="other-box-text">

                            <span className="other-box-heading">HOT</span>
                          </div>
                        </div>

                      </Col>

                      <Col xs={6} sm={6} md={3} lg={3} style={{ padding: ".3rem" }}>

                        <div className="other-box-visited">
                          <div className="other-box-icon">

                            <HomeIcon />
                            <span className="other-box-count">{dashCount?._siteVisited}</span>
                          </div>

                          <div className="other-box-text">

                            <span className="other-box-heading">SITE VISITED</span>
                          </div>
                        </div>

                      </Col>



                      <Col xs={6} sm={6} md={3} lg={3} style={{ padding: ".3rem" }}>
                        <div className="other-box-sale">
                          <div className="other-box-icon">

                            <SaledIcon />
                            <span className="other-box-count">{dashCount?._sale}</span>

                          </div>

                          <div className="other-box-text">
                            <span className="other-box-heading">SALE</span>
                          </div>
                        </div>

                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>

          </Container>


        </div>
      </div>



    </>
  )
}

export default LeadDetails_v2;
