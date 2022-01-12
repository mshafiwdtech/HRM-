/* eslint-disable no-use-before-define */
import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.name,
});

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#4d4d4d",
    fontSize:"14px"
  },
}));

export default function Filter(props) {
  // console.log("lll", props.data);
  const classes = useStyles();
  //   return filterContent.map((item) => {
  return (
    <div style={{ display: "inline-grid", margin: 10 }}>
      <Autocomplete
        id="presale"
        options={props.data}
        getOptionLabel={(option) => option.firstName}
        // value={null}
        style={{ width: 250, backgroundColor: "#fcfcfd" }}
        onChange={(event, value) => props.getId(value)}
        size="small"
        classes={classes}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={props.placeHolder}
            variant="outlined"
            color="primary"
            style={{ backgroundColor: "#fcfcfd", borderRadius: 3 }}
          />
        )}
        value={props.Selectedvalue}
      />
    </div>
  );
  //   });
}
