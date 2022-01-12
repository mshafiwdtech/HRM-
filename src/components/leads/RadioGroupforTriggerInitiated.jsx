import React, { useEffect, useState } from 'react'

import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "./RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import clsx from "clsx";
import { useSelector,useDispatch } from 'react-redux';
import { PresaletoSalesIcon, SalestoPresaleIcon } from '../../assets/Icons';
import { getLeadsTableData, setSelectedHandoverTrigger } from '../../store/actions/Leads';
import { LEAD_TABLE_DATA_SUCCESS, SET_SELECTED_LOCATION } from '../../store/actionTypes/Leads';




const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#3f50b5",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

// Inspired by blueprintjs
function StyledRadio(props) {

  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}


let options = [
  {
    name: "Presale to sales",
    id: "presaletoSales"
  },
  {
    name: "Sales to presale",
    id: "salestoPresale"
  }
]



function RadioGroupforTriggerInitiated() {


  const dispatch = useDispatch();
  const { leadSource, channel, selHandoverTrigger } = useSelector((state) => state.leads);

  let [state, setState] = useState(null)


  const setTrigger = (value) => {

    if (value != null) {

      dispatch(setSelectedHandoverTrigger(value));

      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    } else 
    {
      dispatch({ type: SET_SELECTED_LOCATION, payload: null });
      dispatch({
        type: LEAD_TABLE_DATA_SUCCESS,
        payload: [],
        updatedMasterData: [],
        updatedFilterData: [],
      });
      dispatch(getLeadsTableData());
    }
  };



    let changeTrigger=(para_id)=>{

      setState(para_id)
      setTrigger(para_id)

    }
    


  return (
    <FormControl component="fieldset">

      <div style={{ display: "flex" }}>
        {options.map((item) => {
          return (
            // <FormControlLabel
            //   // value={item.value}
            //   control={<StyledRadio />}
            //   label={item.name}
            //   labelPlacement="end"
            //   // onClick={() => selectSource(item)}
            // />

            <div className="d-flex flex-row align-items-center justify-content-center">

              {
                item.id === "presaletoSales" ? (<PresaletoSalesIcon />) : <SalestoPresaleIcon />
              }
              <FormControlLabel
                checked={selHandoverTrigger === item.id ? true : false}
                value={item.id}
                control={<StyledRadio />}
                label={item.name}
                onClick={() => changeTrigger(item.id)}
              />
              {/* <FormControlLabel
                  value="createdon"
                  control={<StyledRadio />}
                  label="Created On"
                />
                <FormControlLabel
                  value="updateonly"
                  control={<StyledRadio />}
                  label="Update Only"
                /> */}
            </div>
          );
        })}
        {/* <FormControlLabel
            value="updatedon"
            control={<StyledRadio />}
            label="Updated On"
          />
          <FormControlLabel
            value="createdon"
            control={<StyledRadio />}
            label="Created On"
          />
          <FormControlLabel
            value="updateonly"
            control={<StyledRadio />}
            label="Update Only"
          /> */}
      </div>
    </FormControl>
  )
}

export default RadioGroupforTriggerInitiated
