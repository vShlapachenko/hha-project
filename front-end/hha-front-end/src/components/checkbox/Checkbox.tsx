import React from "react";
import MaterialCheckbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import checkboxStyle from "./Checkbox.module.css"

const Checkbox = (props: any) => {
    const { disabled, defaultChecked, label} = props;
    return (
        <div>
            <FormGroup  className = {checkboxStyle.checkbox} >
                <FormControlLabel label={label} disabled={disabled} control={<MaterialCheckbox defaultChecked={defaultChecked} />} />
                {/* label must be passed from the parent for checkbox to work */}
            </FormGroup>
        </div> 
    );
};

export default Checkbox;
