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
    onChangeFunc: any
    onChangeFunc2: any
}

const AddCaseStudy = ({caseName, questions, onChangeFunc, onChangeFunc2}: listName) => {
    const [alert, setAlert] = useState(false);
    const { store } = useContext(Context);
    const [pho, setPho] = useState("");
    const [photoId, setPhotoId] = useState("");

    const [submitDrafAlert, setSubmitDrafAlert] = useState(false);
    const [submitAnswerAlert, setSubmitAnswerAlert] = useState(false);
    const [shouldRenderFailAlert, setShouldRenderFailAlert] = useState(false);
    const [submitPhotoAlert, setSubmitPhotoAlert] = useState(false);

    const splitString = (stringArray: string) => {
        let container: Array<string>;
        stringArray = stringArray?.replace(/[\{\}\[\]]/g, "");
        container = stringArray?.split(",");
        return container;
    }

    const formatQuestions = (item: any) => {
        return item.replace(/[\)\"\(]/g, "");
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
        event.preventDefault();
        if (answer === "") {
            setShouldRenderFailAlert(true);
            setAlert(false);
            return;
        }

        setAlert(true);
        setShouldRenderFailAlert(false);
        const obj = {
            question: event.target.value,
            answer
        }
        setArray([...array, obj]);
        setDraftArray([...draftArray, answer]);
        setAnswer("");
    }

    const resetState = () => {
        setSubmitDrafAlert(false);
        setSubmitAnswerAlert(false);
        setSubmitPhotoAlert(false);
        // setArray([]);
        // setDraftArray([]);
        setAlert(false);
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
            "photoId": photoId
        }

        try {
            const response = await CaseStudyService.submitAnswers(body.id, body.submittedBy, body.caseName, body.submittedDate, body.entryList, body.photoId);
            console.log(response);
            setSubmitAnswerAlert(true);

            setTimeout(()=> {
                resetState();
            }, 500);
            onChangeFunc2();
        } catch (e) {
            console.log(e);
        }
    }


    async function submitDraftAnswer(e: any) {
        
        e.preventDefault();

        if (array.length == 0) {
            return;
        }

        const photoArray = [];
        const photo = new FormData();
        
        photo.append(
            "file",
            pho,
          );

        // Update the formData object
        
        photoArray.push(photo);
        
        const body = {
            "submittedBy": null,
            "caseName": caseName,
            "entryList": array,
            "photoId": photoId
        }
        
        try {
            const response = await CaseStudyService.submitAsDraft(body.caseName, body.submittedBy, body.entryList, body.photoId);
            console.log(response);
            setSubmitDrafAlert(true);
            setTimeout(()=> {
                resetState();
            }, 500);
            onChangeFunc();
            
        } catch (e) {
            console.log(e);
        }

    }


    const submitDraftSuccess =() => {
        return <Alert severity="success">submit draft success!</Alert>;
    }

    const submitPhotoSuccess = () => {
        return <Alert severity="success">submit Photo success!</Alert>;
    }


    const sumbitSuccess =() => {
        return <Alert severity="success">submit success!</Alert>;
    }

    const renderAlert =() => {
        return <Alert severity="success">saved success!</Alert>;
    }

    const renderFailAlert =() => {
        return <Alert severity="error">Please put in content to save!</Alert>;
    }

    const renderNothing =() => {
        return <div></div>;
    }
   
    const [photoName, setPhotoName] = useState("");

    const onFileUpload = async () => {
        // Create an object of formData
        const photo = new FormData();

        photo.append(
            "file",
            pho
        );

        try {
            const addPhotoResponse = await CaseStudyService.addPhoto(photo);
            setSubmitPhotoAlert(true);
            setPhotoId(addPhotoResponse.data.id);
        } catch (e) {
            console.log(e);
        }
    };

    
    const onFileChange = async (event: any) => {
        event.preventDefault();
              
        if (event.target.files[0]) {
            console.log(event.target.files[0].name); 
            setPhotoName(event.target.files[0].name);
            setPho(event.target.files[0]);
        }
        
    };



    return (
        <div>
             {alert?renderAlert(): renderNothing()}
             {shouldRenderFailAlert?renderFailAlert():renderNothing()}
           {listOfQuestions.map((item, key) => {
               return( 
               <div>
                   <div className={AddCaseStudyStyle.questions}>
                        <h3>{formatQuestions(item)}</h3>
                   </div>
                    {item?<Input key={item} userInput={answer} type="text" label="" onChangeFunc={setPatientNameFunc} sx={{width: "43rem"}}/>: <div></div>}
                    <Button variant="outlined" onClick={submitSave} value={item} >save</Button>
               </div>
               )
           })} 
           
           {submitPhotoAlert?submitPhotoSuccess(): renderNothing()}
           <div className={AddCaseStudyStyle.uploadSection} >
           <label htmlFor="file-upload" className={AddCaseStudyStyle.fileUpload}>
                <input id="file-upload" type="file" onChange={onFileChange} />
            </label>
                <Button variant="contained" onClick={onFileUpload} className={AddCaseStudyStyle.uploadSectionButton}>Upload Photo</Button>
            </div> 
            {submitDrafAlert?submitDraftSuccess(): renderNothing()}
            {submitAnswerAlert?sumbitSuccess(): renderNothing()}
           <Button variant="contained" onClick={submitDraftAnswer} >Submit As Draft</Button>
           <Button variant="contained" onClick={submitAnswer} >Submit Now!</Button>
        </div>
    )
}

export default AddCaseStudy;