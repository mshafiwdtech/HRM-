import React, { useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import ComplexGrid from "./ComplexGrid";
import { getLeadsTableData } from "../../store/actions/Leads";
import { IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import AddLeadDialoge from "./AddLeadDialoge";
import { makeStyles, Dialog } from "@material-ui/core";
import { Button, Box } from "@material-ui/core";
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

export default function LeadDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeadsTableData());
    //get leads by using redux action
  }, [dispatch]);

  const { rows } = useSelector((state) => state.leads);
  const [opens, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <div className="leadDetailContainer">
      <div className="Container">
        <div className="leadheadingBorder">
          <text className="leadHeading">LEAD</text>
        </div>
        <div className="leadsBottomBorder">
          <div style={{ display: "flex" }}>
            <div style={{ padding: 10 }}>
              <text>Year</text>
            </div>
            <div style={{ padding: 10 }}>
              <text>Month</text>
            </div>
            <div style={{ padding: 10 }}>
              <text>Week</text>
            </div>
            <div style={{ padding: 10 }}>
              <text>Yesterday</text>
            </div>
            <div style={{ padding: 10 }}>
              <text>Today</text>
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <IconButton onClick={() => setOpen(true)}>
              <Icon
                className="fa fa-plus-circle"
                color="primary"
                style={{ fontSize: 30, marginTop: -20, marginRight: 20 }}
              />
            </IconButton>
            <Dialog
              classes={{
                paper: classes.dialog,
              }}
              open={opens}
              onClose={() => setOpen(false)}
            >
              <div style={{ margin: 30 }}>
                <AddLeadDialoge />
                <Box textAlign="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    // style={{ marginLeft: "0 auto", display: "flex" }}
                    // style={{ alignSelf: "center" }}
                    onClick={() => setOpen(false)}
                  >
                    ADD
                  </Button>
                </Box>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="totalleads">
        <Typography variant="h2" className="totalValue">
          {rows?.length || 0}
        </Typography>
        <Typography variant="h3" className="totalText">
          Total Leads
        </Typography>
      </div>

      <div className="Container">
        <div style={{ display: "flex", margin: 10 }}>
          <ComplexGrid status="New" rows={rows} backgroundColor="#3f50b5" />
          <ComplexGrid status="Hot" rows={rows} backgroundColor="red" />
          <ComplexGrid
            status="SITE VISITED"
            rows={rows}
            backgroundColor="blue"
          />
          <ComplexGrid status="SALE" rows={rows} backgroundColor="#3abb45" />
        </div>
      </div>
    </div>
  );
}
