import React, {FC, useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"
import "./CaseStudy.css";
import Dropdown from "../../components/dropdown/Dropdown";
import AddCaseStudy from "../../components/add_case_studies/AddCaseStudy";
import Navbar from "../../components/Navbar/Navbar";

const CaseStudy: FC = () => {
    const [dropdown, setDropdown] = useState("");

    const CASE_STUDY_OPTIONS = {
        PATIENT_STORY: "Patient Story",
        STAFF_RECOGNIZATION: "Staff Recognization",
        TRAINING_SESSION: "Training Session",
        EQUIMENT_RECEIVED: "Equipment Received",
        OTHER_STORY: "Other Story"
    }


    const setDropdownFunc = (event: any) => {
        event.preventDefault();
        setDropdown(event.target.value);
    }
    
    const listItems = [ CASE_STUDY_OPTIONS.PATIENT_STORY, CASE_STUDY_OPTIONS.STAFF_RECOGNIZATION, CASE_STUDY_OPTIONS.TRAINING_SESSION, CASE_STUDY_OPTIONS.EQUIMENT_RECEIVED, CASE_STUDY_OPTIONS.OTHER_STORY];
    return (
        <div>
            <Navbar />
            <Dropdown listItems={listItems} itemName={""} onChangeFunc={setDropdownFunc} initialValue={dropdown} />
            <AddCaseStudy name={dropdown} />
            {/* {other stuff later} */}
        </div>
    );
}

export default observer(CaseStudy);