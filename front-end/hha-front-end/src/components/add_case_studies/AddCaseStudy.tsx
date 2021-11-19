import React, {FC, useContext, useState, useEffect, useCallback} from "react";
import { useHistory } from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"
import Navbar from "../Navbar/Navbar";
import Input  from "../Input/Input";
import Dropdown from "../dropdown/Dropdown";
import { render } from "@testing-library/react";
import CaseStudyService from "../../service/CaseStudyService";
import UserService from "../../service/UserService";
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
    const { store } = useContext(Context);
    const userEmail = store.getUserEmail();
    const [photo, setPhoto] = useState("");

    const [submitDrafAlert, setSubmitDrafAlert] = useState(false);
    const [submitAnswerAlert, setSubmitAnswerAlert] = useState(false);

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
    
    const [draftArray, setDraftArray] = useState(initialArray);

    const setPatientNameFunc = (event: any) => {
        event.preventDefault();
        setAlert(false);
        setSubmitAnswerAlert(false);
        setSubmitDrafAlert(false);
        setAnswer(event.target.value);
    }

    const submitSave = (event: any) => {
        console.log(event.target.value + "s");
        
        event.preventDefault();
        if (answer === "") {
            console.log("failed to save from save button");
            return;
        }

        setAlert(true);
        const obj = {
            question: event.target.value,
            answer
        }
        setArray([...array, obj]);
        setDraftArray([...draftArray, answer]);
    }


    async function submitAnswer(e: any) {

        e.preventDefault();
        if (array.length == 0) {
            return;
        }

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
            setSubmitAnswerAlert(true);
        } catch (e) {
            console.log(e);
        }
    }


    async function submitDraftAnswer(e: any) {
        
        e.preventDefault();

        if (array.length == 0) {
            return;
        }

        const formData = new FormData();
        // Upload photo is not done yet!

        // Update the formData object
        formData.append(
          "myFile",
          photo,
        );

        const body = {
            "submittedBy": null,
            "caseName": caseName,
            "entryList": array,
            "photo": formData
        }
        
        try {
            const response = await CaseStudyService.submitAnswersAsDraft(body.caseName, body.submittedBy, body.entryList, body.photo);
            console.log(response);
            setSubmitDrafAlert(true);
            // history.push("/");
        } catch (e) {
            console.log(e);
        }

    }


    const submitDraftSuccess =() => {
        return <Alert severity="success">submit draft success!</Alert>;
    }

    const sumbitSuccess =() => {
        return <Alert severity="success">submit success!</Alert>;
    }

    const renderAlert =() => {
        return <Alert severity="success">saved success!</Alert>;
    }

    const renderNothing =() => {
        return <div></div>;
    }
   
    const [photoName, setPhotoName] = useState("");

    const onFileUpload = async () => {
    
        // Create an object of formData
        const formData = new FormData();
        let jsonBodyData = { 'someKey': 'someValue' };
        // Update the formData object
        formData.append(
          "myFile",
          photo
        );

        try {
            // const response = await CaseStudyService.createCaseStudy();
            // console.log(response);
            // history.push("/");

            const addPhotoResponse = await CaseStudyService.addPhoto(formData);
            console.log(addPhotoResponse);
        } catch (e) {
            console.log(e);
        }
      };

    
    const onFileChange = async (event: any) => {
        // console.log("the email of the user is ", localStorage.getItem("email"));
        
        event.preventDefault();
              
        if (event.target.files[0]) {
            console.log(event.target.files[0].name); 
            setPhotoName(event.target.files[0].name);
            setPhoto(event.target.files[0]);
        }
        
      };

    return (
        <div>
             {alert?renderAlert(): renderNothing()}
           {listOfQuestions.map((item, key) => {
               return( 
               <div>
                    <h5>{item}</h5>
                    {item?<Input key={item} userInput={answer} type="text" label="" onChangeFunc={setPatientNameFunc} />: <div></div>}
                    <Button variant="outlined" onClick={submitSave} value={item} >save</Button>
               </div>
               )
           })} 
           
           <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>
                  Upload
                </button>
            </div>
            {submitDrafAlert?submitDraftSuccess(): renderNothing()}
            {submitAnswerAlert?sumbitSuccess(): renderNothing()}
           <Button variant="contained" onClick={submitDraftAnswer} >Submit Draft</Button>
           <Button variant="contained" onClick={submitAnswer} >Submit</Button>
        </div>
    )
}

export default AddCaseStudy;