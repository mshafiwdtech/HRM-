import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { MaterialCallIcon, MaterialMailIcon } from '../../../assets/Icons'

function ResponsineTableCard({ data, stageData, statusData }) {

  
    let history = useHistory();
    let getAvatarName = (paraName) => {

        if (paraName) {
            return paraName.charAt(0)
        }
        else {
            return null
        }

    }


    const { users, sales } = useSelector((state) => state.user);
    let getExectiveNameById = (para_type, para_id) => {

        if (para_type === "presale") {
            let finder = users.find(element => element._id === para_id)

            let result = `${finder ? (finder.firstName ? (finder.lastName ? (finder.firstName + " " + finder.lastName) : (finder.firstName)) : "") : ("---")}`
            return result

        }

        else if (para_type === "sales") {
            let finder = sales.find(element => element._id === para_id)
            let result = `${finder ? (finder.firstName ? (finder.lastName ? (finder.firstName + " " + finder.lastName) : (finder.firstName)) : "") : ("---")}`
            return result
        }

    }

    return (
        <div className="res-table-card-container" onClick={(event) => history.push("/details", { id: data._id })}>


            <div className="d-flex flex-column w-100 " style={{ padding: "10px 15px" }}>



                <div className="d-flex flex-row justify-content-between align-items-center w-100">

                    <div className="d-flex flex-column justify-content-center align-items-start">

                        <span className="res-table-card-name"> {data.firstName} {data.lastName ? data.lastName : ""}</span>
                        <span className="res-table-card-time">{moment(data.createdAt, "YYYYMMDD").fromNow()}</span>
                        <span className="res-table-card-executive">Presale Exec : {data.presaleExecutive?.firstName}{data.assignedTo==="presaleExecutive"?" *":null}</span>
                        <span className="res-table-card-executive">Sales Exec:  {data.salesExecutive?.firstName}{data.assignedTo==="salesExecutive"?" *":null} </span>

                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <span className="res-table-card-avatar">{getAvatarName(data.firstName)}{getAvatarName(data.lastName)} </span>

                        <span className="booked-badge-responsive" style={{ backgroundColor: data.stage ? data.stage.color : "black" }}>{ data.stage ?  data.stage.name : " Not Defined"}</span>

                    </div>

                </div>


            </div>



            <div className="d-flex flex-row w-100 bg-info res-table-card-btn-container">
                <button className="res-table-card-btn"><div className="mr-2"><MaterialCallIcon /></div> {data.phone}</button>

                <button className="res-table-card-btn">
                    <div className="mr-2"><MaterialMailIcon /></div>
                    <span style={{ maxWidth: "90%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{data.email}</span>
                </button>

            </div>

        </div>
    )
}

export default ResponsineTableCard
