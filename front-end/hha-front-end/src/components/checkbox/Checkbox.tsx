import React from "react";
import MaterialCheckbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import checkboxStyle from "./Checkbox.module.css"


interface CheckboxAttributes {
    disabled: boolean;
    defaultChecked: boolean;
    label: string;
}

const Checkbox = ({ disabled, defaultChecked, label}: CheckboxAttributes) => {

    return (
        <div>
            <FormGroup  className = {checkboxStyle.checkbox} >
                <FormControlLabel label={label} disabled={disabled} control={<MaterialCheckbox defaultChecked={defaultChecked} />} />
                {/* all attributes must be passed from the parent for checkbox to work */}
            </FormGroup>
        </div> 
    );
};

export default Checkbox;
