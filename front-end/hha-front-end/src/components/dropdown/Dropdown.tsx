import React, { useState } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dropdownStyle from "./Dropdown.module.css";

interface DropdownAttributes {
    listItems: Array<string>;
    itemName: string;
}
const Dropdown = ({listItems, itemName}: DropdownAttributes) => {
    
    const [listItemValue, setListItemValue] = useState("");

    const handleChange = (event: any) => {
        setListItemValue(event.target.value);
    };

    return (
        <div >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className={dropdownStyle.container} >
            <InputLabel >{itemName}</InputLabel>
            <Select onChange={handleChange} value={listItemValue} >
               {listItems.map((item, index) => (
                  <MenuItem value={item} key={index} >{item}</MenuItem>
               ))}
            </Select>
            </FormControl>
        </div>
    );
}

export default Dropdown;

