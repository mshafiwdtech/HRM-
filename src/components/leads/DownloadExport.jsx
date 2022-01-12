import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function DownloadExport() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#3f50b5",
            width: 100,
            height: 40,
            color: "white",
          }}
        >
          Export
        </Button>
        <div>
          <Tooltip title="Download" placement="top-start">
            <IconButton
              aria-label="Download"
              // onClick={(e) => this.onDownload()}
              size="medium"
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Filter List" placement="top-start">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
