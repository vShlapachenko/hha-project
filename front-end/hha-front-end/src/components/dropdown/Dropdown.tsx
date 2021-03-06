import React, { useState } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dropdownStyle from "./Dropdown.module.css";

interface DropdownAttributes {
    listItems: Array<string>;
    itemName: string;
    onChangeFunc: any;
    initialValue: any;
}
const Dropdown = ({listItems, itemName, onChangeFunc, initialValue}: DropdownAttributes) => {
    return (
        <div >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className={dropdownStyle.container} >
            <InputLabel >{itemName}</InputLabel>
            <Select onChange={onChangeFunc} value={initialValue} >
               {listItems.map((item, index) => (
                  <MenuItem value={item} key={index} >{item}</MenuItem>
               ))}
            </Select>
            </FormControl>
        </div>
    );
}

export default Dropdown;

