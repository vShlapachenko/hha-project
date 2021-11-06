import React, {FC, useContext, useState, useEffect} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"
import Navbar from "../Navbar/Navbar";
import Input  from "../Input/Input";
import Dropdown from "../dropdown/Dropdown";
import { render } from "@testing-library/react";
import CaseStudyService from "../../service/CaseStudyService";
import { CaseStudy } from "../../models/CaseStudy";

interface listName {
    questions: any
}

const AddCaseStudy = ({questions}: listName) => {

    console.log("reached caseStudy");

    console.log("questions are", questions);
    
    const splitString = (stringArray: string) => {
        let container: Array<string>;
        stringArray = stringArray?.replace(/[\{\}\[\]]/g, " ");
        container = stringArray?.split(",");
        return container;
    }

    let listOfQuestions = splitString(questions);

    
    

    const CASE_STUDY_OPTIONS = {
        PATIENT_STORY: "Patient Story",
        STAFF_RECOGNIZATION: "Staff Recognization",
        TRAINING_SESSION: "Training Session",
        EQUIMENT_RECEIVED: "Equipment Received",
        OTHER_STORY: "Other Story"
    }
    const [ patientName, setPatientName ] = useState("");
  
        // Similar to componentDidMount and componentDidUpdate:
   

    
    

    const setPatientNameFunc = (event: any) => {
        event.preventDefault();
        setPatientName(event.target.value);
    }

    return (
        <div>
           {listOfQuestions.map((item, key) => {
               return <h5>{item}</h5>
           })} 
        </div>
    )
        
    
    
    
    // <div>{listOfQuestions[0]}</div>
            // hit endpoint casestudy/PATIENT_STORY


        //     return (<div>
        //        <div className="patientName">
        //            <h5 >Enter the patient's name</h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
   
        //        <div className="patientAge">
        //            <h5 >Enter the patient's age </h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
        //        <div className="patientName">
        //            <h5 >Patient's nationality </h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
        //        <div className="patientName">
        //            <h5 >Why did the patient choose HCBH? </h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
        //        <div className="patientName">
        //            <h5 >How long were they at HCBH? </h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
        //        <div className="patientName">
        //            <h5 >What was their diagnosis? </h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
        //        <div className="patientName">
        //            <h5 >Case study? </h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
        //     </div>);
        // } else if (name == CASE_STUDY_OPTIONS.STAFF_RECOGNIZATION) { 

        //      // hit endpoint casestudy/STAFF_RECOGNIZATION
             
        //     return (<div>
        //        <div className="patientName">
        //            <h5 >Enter the staff name</h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
   
        //        <div className="patientAge">
        //            <h5 >Enter the staff job title </h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
        //        <div className="patientName">
        //            <h5 >what department does this staff memeber work in?</h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
        //        <div className="patientName">
        //            <h5 >How long have they been working in HCBH?</h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
        //        <div className="patientName">
        //            <h5 >Case study story</h5>
        //            <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //        </div>
        //        </div>);
        // } else if (name == CASE_STUDY_OPTIONS.TRAINING_SESSION) {
        //     return (<div>
        //         <div className="patientName">
        //             <h5 >Enter the patient'11111s name</h5>
        //             <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //         </div>
    
        //         <div className="patientAge">
        //             <h5 >Enter the patient's age </h5>
        //             <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //         </div>
        //         <div className="patientName">
        //             <h5 >Patient's nationality </h5>
        //             <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //         </div>
        //          </div>
        //      );
        // } else if (name == CASE_STUDY_OPTIONS.EQUIMENT_RECEIVED) {
        //     return (<div>
        //         <div className="patientName">
        //             <h5 >Enter the patient'11111s name</h5>
        //             <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //         </div>
    
        //         <div className="patientAge">
        //             <h5 >Enter the patient's age </h5>
        //             <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //         </div>
        //         <div className="patientName">
        //             <h5 >Patient's nationality </h5>
        //             <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //         </div>
        //          </div>
        //      );
        // } else {
        //     return (<div>
        //         <div className="patientName">
        //             <h5 >Enter the patient'11111s name</h5>
        //             <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //         </div>
    
        //         <div className="patientAge">
        //             <h5 >Enter the patient's age </h5>
        //             <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //         </div>
        //         <div className="patientName">
        //             <h5 >Patient's nationality </h5>
        //             <Input userInput={patientName} type="text" label="" onChangeFunc={setPatientNameFunc} />
        //         </div>
        //          </div>
        //      );
        // }
         
    
    
}

export default AddCaseStudy;