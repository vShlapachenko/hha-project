import React, {FC, useContext, useState, useEffect, useCallback} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"
import Dropdown from "../../components/dropdown/Dropdown";
import AddCaseStudy from "../../components/add_case_studies/AddCaseStudy";
import Navbar from "../../components/Navbar/Navbar";
import CaseStudyService from "../../service/CaseStudyService";
import CaseStudyStyle from "./CaseStudy.module.css";

const CaseStudy: FC = () => {
    const CASE_STUDY_OPTIONS = {
        PATIENT_STORY: "Patient Story",
        STAFF_RECOGNITION: "Staff Recognition",
        TRAINING_SESSION: "Training Session",
        EQUIMENT_RECEIVED: "Equipment Received",
        OTHER_STORY: "Other Story"
    }
    
    const listItems = [ CASE_STUDY_OPTIONS.PATIENT_STORY, CASE_STUDY_OPTIONS.STAFF_RECOGNITION, CASE_STUDY_OPTIONS.TRAINING_SESSION, CASE_STUDY_OPTIONS.EQUIMENT_RECEIVED, CASE_STUDY_OPTIONS.OTHER_STORY];

    const [questions, setQuestions] = useState("");

    const [dropdown, setDropdown] = useState("");
    const setDropdownFunc = useCallback(async (event) => {
        setDropdown(event.target.value);
        let response = await CaseStudyService.getQuestions(event.target.value);
         return setQuestions(JSON.stringify(response.data.questions));
    },[]);

    return (
        <div>
            <Navbar />
            <div className={CaseStudyStyle.mainDiv}>
                <Dropdown listItems={listItems} itemName={""} onChangeFunc={setDropdownFunc} initialValue={dropdown} />
                <AddCaseStudy caseName={dropdown}  questions={questions} />
            </div>
        </div>
    );
}

export default observer(CaseStudy);