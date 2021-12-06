import React from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import $api from '../../http'

interface departmentAttributes {
    department_name ?: string;
}

const Department = ({department_name = 'Department Name'}: departmentAttributes) => {

    const [value, setValue] = React.useState<Date | null>(
        new Date(),
      );

    const handleChange = (newValue: Date | null) => {
        var data = {}
        if(newValue)
        {
            data = {
                "month": newValue.getUTCMonth() + 1,
                "year": newValue.getFullYear()
            };
            console.log("month: " + (newValue.getUTCMonth() + 1))
            console.log("year: " + newValue.getFullYear())
        }        

        function getForm() {
            $api.post("http://localhost:8080/api/form/getForm", data).then((r) => {
            })
        }
        

        setValue(newValue);
    };

    return (
        <div>
            <h1> { department_name } </h1>

             {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Month</InputLabel>
                <Select
                labelId="Mpnth"
                id="month"
                label="Month"
                >
                    <MenuItem value={1}>January</MenuItem>
                    <MenuItem value={2}>February</MenuItem>
                    <MenuItem value={3}>March</MenuItem>
                    <MenuItem value={4}>April</MenuItem>
                    <MenuItem value={5}>May</MenuItem>
                    <MenuItem value={6}>June</MenuItem>
                    <MenuItem value={7}>July</MenuItem>
                    <MenuItem value={8}>August</MenuItem>
                    <MenuItem value={9}>September</MenuItem>
                    <MenuItem value={10}>October</MenuItem>
                    <MenuItem value={11}>November</MenuItem>
                    <MenuItem value={12}>December</MenuItem>

                </Select>
            </FormControl>
            

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Year</InputLabel>
                <Select
                labelId="Year"
                id="Year"
                label="Year"
                ></Select>
            </FormControl>
             */}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                    label="Select Month and Year for the form"
                    inputFormat="MM/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
            </LocalizationProvider>     

            {/* <button onClick={randomStuff}>Some random text</button> */}
        </div>
    );
}
export default Department;