import React, { useState } from 'react'
import './dataleadsresponsive.css'

import styles from '../../../CSS/Components/leads/dataleads.module.css'
import SearchBox from '../SearchBox'
import { DataAnalyseIllustration, FilterIcon } from '../../../assets/Icons'
import ResponsineTableCard from './ResponsineTableCard'
import FilterModelResponsive from './FilterModelResponsive'

import { useSelector, useDispatch } from "react-redux";

function DataLeadsResponsive() {


    let [isFilterModal, setFilterModal] = useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");

    const { rows, loader, leadCount, masterData, filterdata } = useSelector(
        (state) => state.leads
    );


    function stableSort(array, comparator) {

        // console.log("table data before map......>>>>",array);

        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }



    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }


    const { stageStatusData } = useSelector((state) => state.setting);





    let getStageStatusFromID = (para_type, para_id) => {

        if (para_type === "stage") {
            let finder = stageStatusData.find(element => element._id === para_id)
            return finder
        }

        else if (para_type === "status") {

            let result = null


            stageStatusData.find((element) => {

                element.statusList.filter((element2) => {

                    if (element2._id === para_id) {

                        result = element2
                    }

                })



            })

            return result
        }



    }






    return (

        <div>

            <FilterModelResponsive state={isFilterModal} setState={setFilterModal} />

            <div className="dataleads-responsive-container w-100 m-0">



                <div className="d-flex flex-row justify-content-between align-items-center data-leads-filter-container w-100">

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center"
                    }}>
                        <SearchBox />
                        {/* <span className={styles.captionText}>Filter leads based on channel</span> */}
                    </div>


                    <div onClick={() => { setFilterModal(!isFilterModal) }}>
                        <FilterIcon />
                    </div>

                </div>

                <div className="data-leads-filter-container mt-0 p-2">
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        fontSize: 18,
                        fontWeight: "500"
                    }}>

                        <DataAnalyseIllustration />

                        <div className="d-flex flex-column aligh-items-start justify-content-center">
                            <span className="ml-2">LEADS</span>
                            <span className="ml-2" style={{
                                fontSize: 10.5,
                                fontWeight: 100,
                                color: "#acacac"

                            }} >Manage leads using filter options.</span>
                        </div>

                    </div>

                    {
                        filterdata ?

                            <div className="d-flex flex-column align-items-center justift-content-center">

                                <span
                                    style={{
                                        fontSize: 12,
                                        fontWeight: "lighter",
                                        color: "#acacac"

                                    }}>{filterdata?.length}</span>
                                <span
                                    style={{
                                        fontSize: 10.5,
                                        fontWeight: 100,
                                        color: "#acacac"

                                    }}>Results</span>

                            </div> : null
                    }
                </div>



                <div className="data-leads-table-container mt-0 p-2" style={{ flex: 1 }}>



                    {

                        filterdata.length !== 0 ?

                            stableSort(filterdata, getComparator(order, orderBy))

                                .map((row, index) => {

                                    return (
                                        <ResponsineTableCard data={row} stageData={getStageStatusFromID("stage", row.stage)} statusData={getStageStatusFromID("status", row.status)} />
                                    )
                                })

                            : null
                    }



                </div>

            </div>




        </div>
    )
}

export default DataLeadsResponsive
