import React, {FC, useContext, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"
import Navbar from "../Navbar/Navbar";
import Input  from "../Input/Input";
import Dropdown from "../dropdown/Dropdown";
import { render } from "@testing-library/react";
import CaseStudyService from "../../service/CaseStudyService";
import { CaseStudy } from "../../models/CaseStudy";
import AddCaseStudyStyle from "./AddCaseStudy.module.css";
import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';

interface listName {
    caseName: string
    questions: any
}

const AddCaseStudy = ({caseName, questions}: listName) => {
    const history = useHistory();
    const [alert, setAlert] = useState(false);
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

    let initialArray: any = [];
    const [ answer, setAnswer ] = useState("");
    const [ array, setArray ] = useState(initialArray);
    

    const setPatientNameFunc = (event: any) => {
        setAlert(false);
        event.preventDefault();
        setAnswer(event.target.value);
    }

    const submitSave = () => {
        setAlert(true);
        const obj = {
            question: "",
            answer
        }
        setArray([...array, obj]);
    }

    async function submitAnswer() {
        // submit
        const body = {
            "id": null,
            "submittedBy": null,
            "caseName": caseName,
            "submittedDate": null,
            "entryList": array,
            "photo": null
        }

        try {
            const response = await CaseStudyService.submitAnswers(body.id, body.submittedBy, body.caseName, body.submittedDate, body.entryList, body.photo);
            console.log(response);
            // history.push("/");
        } catch (e) {
            console.log(e);
        }
    }

    const renderAlert =() => {
        return <Alert severity="success">saved success!</Alert>;
    }

    const renderNothing =() => {
        return <div></div>;
    }

    return (
        <div>
             {alert?renderAlert(): renderNothing()}
           {listOfQuestions.map((item, key) => {
               return( 
               <div>
                    <h5>{item}</h5>
                    {item?<Input key={item} userInput={answer} type="text" label="" onChangeFunc={setPatientNameFunc} />: <div></div>}
                    <Button variant="outlined" onClick={submitSave} >save</Button>
                  
               </div>
               )
           })} 
           <Button variant="contained" onClick={submitAnswer} >Submit</Button>
          
        </div>
    )
}

export default AddCaseStudy;