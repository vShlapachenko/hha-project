import React, {FC, useContext, useState, useEffect} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"
import "./CaseStudy.css";
import Dropdown from "../../components/dropdown/Dropdown";
import AddCaseStudy from "../../components/add_case_studies/AddCaseStudy";
import Navbar from "../../components/Navbar/Navbar";
import CaseStudyService from "../../service/CaseStudyService";


const CaseStudy: FC = () => {
    const [dropdown, setDropdown] = useState("");
    let listOfQuestions: Array<any>;
    let data: any;
    // async function getQuestions() {
    //     try {
    //       const response = await CaseStudyService.getQuestions(caseName);
    //       questions = JSON.stringify(response.data);
    //       console.log(questions);
          
    //     } catch (e) {
    //         console.log(e);
    //     }
    //  }

    const CASE_STUDY_OPTIONS = {
        PATIENT_STORY: "Patient Story",
        STAFF_RECOGNIZATION: "Staff Recognization",
        TRAINING_SESSION: "Training Session",
        EQUIMENT_RECEIVED: "Equipment Received",
        OTHER_STORY: "Other Story"
    }


    // const setDropdownFunc = (event: any) => {
    //     event.preventDefault();
    //     setDropdown(event.target.value);
    // }


   

    // async function setDropdownFunc(event: any) {
    async function setDropdownFunc(event: any) {
        event.preventDefault();
        setDropdown(event.target.value);
        // try {
        //     let response = CaseStudyService.getQuestions(event.target.value);
        //     let data = JSON.stringify((await response).data.questions);

        //     let questions = splitString(data);
        //     // questions.forEach((element: any) => {
        //     //     console.log(element);
        //     //     // console.log(typeof(element));
                
        //     // });
            
        //     return <AddCaseStudy name={dropdown}/>
        //   } catch (e) {
        //       console.log(e);
        //  }
    }
    
    const listItems = [ CASE_STUDY_OPTIONS.PATIENT_STORY, CASE_STUDY_OPTIONS.STAFF_RECOGNIZATION, CASE_STUDY_OPTIONS.TRAINING_SESSION, CASE_STUDY_OPTIONS.EQUIMENT_RECEIVED, CASE_STUDY_OPTIONS.OTHER_STORY];
    return (
        <div>
            <Navbar />
            <Dropdown listItems={listItems} itemName={""} onChangeFunc={setDropdownFunc} initialValue={dropdown} />
            {/* <AddCaseStudy name={dropdown} /> */}
        </div>
    );
}

export default observer(CaseStudy);