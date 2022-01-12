// import React, { useEffect, useState } from "react";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// // import { getleadSource } from "../../store/actions/Leads";
// import {
//   getleadChannel,
//   setSelectedLeadChannel,
// } from "../../store/actions/Leads";
// import { useSelector, useDispatch } from "react-redux";

// export default function CheckboxSource() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getleadChannel());
//   }, [dispatch]);
//   const { leadSource, channel } = useSelector((state) => state.leads);
//   const selectSource = (item, e) => {
//     item.value = !item.value;

//     console.log("Item", item.value);
//     dispatch(setSelectedLeadChannel(item));
//     // if (item.value === true) {
//     //   dispatch(setSelectedLeadChannel(item));
//     // }
//   };
//   console.log("DDDD", channel, leadSource);
//   return (
//     <div>
//       <FormControl component="fieldset">
//         <FormGroup aria-label="position" row>
//           {leadSource.map((item) => {
//             return (
//               <FormControlLabel
//                 // value={item.value}
//                 control={<Checkbox style={{ color: "#3f50b5" }} />}
//                 label={item.name}
//                 labelPlacement="end"
//                 onClick={() => selectSource(item)}
//               />
//             );
//           })}
//         </FormGroup>
//       </FormControl>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useSelector, useDispatch } from "react-redux";
// import { getleadSource } from "../../store/actions/Leads";
import {
  getleadChannel,
  setSelectedLeadChannel,
} from "../../store/actions/Leads";
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

export default function CustomizedRadios() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getleadChannel());
    // dispatch(setSelectedLeadChannel(item));
  }, [dispatch]);
  const selectSource = (item, e) => {
    item.value = !item.value;

    console.log("Item............", item);
    dispatch(setSelectedLeadChannel(item));

    // if (item.value === true) {
    //   dispatch(setSelectedLeadChannel(item));
    // }
  };
  const { leadSource, channel } = useSelector((state) => state.leads);

  


  return (
    <FormControl component="fieldset">
      <RadioGroup
        defaultValue="female"
        aria-label="gender"
        name="customized-radios"
      >
        <div style={{ display: "flex" }}>
          {leadSource.map((item) => {
            return (
              // <FormControlLabel
              //   // value={item.value}
              //   control={<StyledRadio />}
              //   label={item.name}
              //   labelPlacement="end"
              //   // onClick={() => selectSource(item)}
              // />

              <div>
                <FormControlLabel
                   checked={channel?channel.name===item.name?true:false:null}
                  value={item.name}
                  control={<StyledRadio />}
                  label={item.name}
                  onClick={() => selectSource(item)}
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
      </RadioGroup>
    </FormControl>
  );
}
