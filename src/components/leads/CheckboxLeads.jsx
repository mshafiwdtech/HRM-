import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function CheckboxLeads() {
  return (
    <div>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            // value={item.value}
            control={<Checkbox style={{ color: "#3f50b5" }} />}
            label="Unassigned Leads Only"
            labelPlacement="end"
          />
          <FormControlLabel
            // value={item.value}
            control={<Checkbox style={{ color: "#3f50b5" }} />}
            label="Followup Leads Only"
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
