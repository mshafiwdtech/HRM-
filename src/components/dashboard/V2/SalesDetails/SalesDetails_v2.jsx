import React, { useState } from 'react'
import "./salesdetails.css"
import { Chart } from "react-charts";
import PieChart_v2 from '../PieChart/PieChart_v2';
import { LeadsIcon, SalesIcon } from '../../../../assets/Icons';

import { Col, Container, Row } from "react-bootstrap";
import ResFreeSel from '../../../ResponsiveFreequancySelector/ResFreeSel';


function SalesDetails_v2() {

    let [activeBadge, setActiveBadge] = useState(0)
    let [activeBadgeLeads, setActiveBadgeLeads] = useState(0)

    const data = React.useMemo(
        () => [
            {
                label: "Sales",
                data: [
                    [0, 1],
                    [1, 2],
                    [2, 4],
                    [3, 2],
                    [4, 7],
                ],
            },
        ],
        []
    );


    const axes = React.useMemo(
        () => [
            // { primary: true, type: "bar", position: "bottom" },
            // { type: "bar", position: "left" },
            { primary: true, type: "ordinal", position: "bottom" },
            { position: "left", type: "linear", stacked: true },
        ],
        []
    );

    return (
        <div className="sales-container">


            <Container fluid style={{ padding: 0 }}>
                <Row style={{ width: "100%", margin: 0, padding: 0 }} className="small-grid-container">


                    <Col xs={12} sm={12} md={12} lg={6} style={{ padding: "0rem", maxWidth: "100vw" }} className="">
                        <div className="sales-main-container">

                            <div className="sales-main-card-header">
                                <span className="main-headings">

                                    <SalesIcon />

                                    SALES REPORT
                                </span>

                                <div className="sales-main-card-header-date">
                                    THIS WEEK
                                    <div>&nbsp;</div>
                                </div>
                            </div>

                            <div className="sales-main-filter-container">
                                <div className="sales-filter-badge-container">
                                    <span style={{ color: "#9e9e9e" }}>(Select option to see the result of particular time period)</span>

                                    <div className="large-freequancy-selector">

                                        <div onClick={() => setActiveBadge(0)} className={activeBadge === 0 ? "sales-date-badge-active" : "sales-date-badge"}>
                                            Year
                                        </div>

                                        <div onClick={() => setActiveBadge(1)} className={activeBadge === 1 ? "sales-date-badge-active" : "sales-date-badge"}>
                                            Month
                                        </div>

                                        <div onClick={() => setActiveBadge(2)} className={activeBadge === 2 ? "sales-date-badge-active" : "sales-date-badge"}>
                                            Week
                                        </div>

                                        <div onClick={() => setActiveBadge(3)} className={activeBadge === 3 ? "sales-date-badge-active" : "sales-date-badge"}>
                                            Yesterday
                                        </div>

                                        <div onClick={() => setActiveBadge(4)} className={activeBadge === 4 ? "sales-date-badge-active" : "sales-date-badge"}>
                                            Today
                                        </div>

                                    </div>


                                    <div className="small-freequancy-selector">
                                        <ResFreeSel setValue={setActiveBadge} value={activeBadge} />
                                    </div>


                                </div>



                            </div>




                            <div className="sales-chart-container">

                                <div style={{ width: "100%", marginRight: 20, }}>



                                    <div
                                        style={{
                                            width: "100%",
                                            height: "400px",
                                            backgroundColor: "white",
                                            zIndex:99
                                        }}
                                    >
                                        <Chart
                                            data={data}
                                            axes={axes}
                                            series={{ type: "bar" }}
                                            primaryCursor
                                            secondaryCursor
                                            tooltip
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </Col>


                    <Col xs={12} sm={12} md={12} lg={6} style={{ padding: "0rem", maxWidth: "95vw" }}>
                        <div className="leads-stages-main-container">
                            <div className="sales-main-card-header">
                                <span className="main-headings">
                                    <LeadsIcon />
                                    LEAD STAGES</span>

                                <div className="sales-main-card-header-date">
                                    THIS WEEK
                                    <div>&nbsp;</div>
                                </div>
                            </div>

                            <div className="sales-main-filter-container">
                                <div className="sales-filter-badge-container">
                                    <span style={{ color: "#9e9e9e" }}>(Select option to see the result of particular time period)</span>



                                    <div className="large-freequancy-selector">
                                        <div onClick={() => setActiveBadgeLeads(0)} className={activeBadgeLeads === 0 ? "sales-date-badge-active" : "sales-date-badge"}>
                                            Year
                                        </div>

                                        <div onClick={() => setActiveBadgeLeads(1)} className={activeBadgeLeads === 1 ? "sales-date-badge-active" : "sales-date-badge"}>
                                            Month
                                        </div>

                                        <div onClick={() => setActiveBadgeLeads(2)} className={activeBadgeLeads === 2 ? "sales-date-badge-active" : "sales-date-badge"}>
                                            Week
                                        </div>

                                        <div onClick={() => setActiveBadgeLeads(3)} className={activeBadgeLeads === 3 ? "sales-date-badge-active" : "sales-date-badge"}>
                                            Yesterday
                                        </div>

                                        <div onClick={() => setActiveBadgeLeads(4)} className={activeBadgeLeads === 4 ? "sales-date-badge-active" : "sales-date-badge"}>
                                            Today
                                        </div>

                                    </div>

                                    <div className="small-freequancy-selector">
                                        <ResFreeSel setValue={setActiveBadgeLeads} value={activeBadgeLeads} />
                                    </div>
                                </div>
                            </div>

                            <div className="leads-chart-container">

                                <PieChart_v2 />

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>




        </div>
    )
}

export default SalesDetails_v2
