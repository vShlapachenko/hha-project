import React from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Navbar from '../../components/Navbar/Navbar'
import styles from "./department.module.css"
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
            <Navbar />
            <div className={styles.alignment}>
                <h1 className={styles.header}> { department_name } </h1>
                <div className={styles.date}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                            label="Select Month and Year for the form"
                            inputFormat="MM/yyyy"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                            />
                    </LocalizationProvider>
                </div>
            </div>
            
        </div>
    );
}
export default Department;