import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ADDLEAD_FIELD } from "../../../../store/actionTypes/Leads";
import {
    getProjectList,
    getleadStages,
    getleadChannel,
    setSelectedLeadChannel,
    getleadSource,
    getleadSubSource,
    getleadcampaign,
    getleadcampaignTerm,
    getleadcampaignContent,
    setSelectedStatus,
    submitLead,
} from "../../../../store/actions/Leads";
import { getSingleUser } from "../../../../store/actions/Users";
import { Col, Container, Row } from "react-bootstrap";

function AddLeadDialauge_V2() {

    const [modal, setModal] = useState(false);
    const [ispass, setPassword] = useState(true);
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        setModal(true);
        reset();
    };
    const handleCloseModal = () => {
        setModal(false);
        reset();
        dispatch({
            type: RESET_ADDLEAD_FIELD,
        });
    };

    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const { token } = JSON.parse(localStorage?.getItem("epitomeUser"));
        console.log("Token", token);
        if (token) {
            dispatch(getProjectList());
            dispatch(getSingleUser({ role: "Pre Sale Executive" }));
            dispatch(getleadStages());
            dispatch(getleadChannel());
        }
    }, [dispatch]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const location = [
        {
            title: "Telungana",
        },
    ];

    const country = [
        {
            title: "India",
        },
        {
            title: "UK",
        },
        {
            title: "USA",
        },
    ];

    const getSubfilterOption = (id) => {
        dispatch(getleadSubSource(id));
        dispatch(getleadcampaign(id));
    };

    const {
        projects,
        status,
        leadSource,
        medium,
        source,
        subsource,
        campaign,
        campaignTerm,
        campaignContent,
        statuss,
        stage,
    } = useSelector((state) => state.leads);
    const { users } = useSelector((state) => state.user);

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
        console.log("ADD user Data", data);

        reset();

        dispatch(submitLead(data));
        handleCloseModal();
    };

    return (
        <div>
            <div>
                <Dialog
                    open={modal}
                    onClose={handleCloseModal}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={{ marginTop: 30 }}></div>
                    <div className="heading">
                        <text className="leadHeading">Add Lead</text>
                    </div>
                    <DialogContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Container fluid>

                                <Row>

                                    <Col xs={12} sm={12} md={6} lg={6} style={{ margin: 0, backgroundColor: "red" }}>
                                        shaju
                                    </Col>

                                    <Col xs={12} sm={12} md={6} lg={6} style={{ margin: 0, backgroundColor: "red" }}>
                                        shaju
                                    </Col>

                                </Row>

                            </Container>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Fab
                color="primary"
                aria-label="Add"
                style={{}}
                onClick={handleOpenModal}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}

export default AddLeadDialauge_V2
