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
import AddCaseStudyDraftStyle from "./AddCaseStudyDraft.module.css";
import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';

interface listName {
    caseName: string
    questionsAndAnswers: Array<any>
}

const AddCaseStudyDraft = ({caseName, questionsAndAnswers}: listName) => {
    const history = useHistory();
    const [alert, setAlert] = useState(false);
    const { store } = useContext(Context);
    const [photoId, setPhotoId] = useState("");
    const [pho, setPho] = useState("");
    const arrayStringMap = new Map();
    const [submitDrafAlert, setSubmitDrafAlert] = useState(false);
    const [submitAnswerAlert, setSubmitAnswerAlert] = useState(false);
    const [shouldRenderFailAlert, setShouldRenderFailAlert] = useState(false);
    const [submitPhotoAlert, setSubmitPhotoAlert] = useState(false);

    const splitString = (stringArray: string, splitChar: string) => {
        let container: Array<string>;
        stringArray = stringArray?.replace(/[\{\}\[\]\\\"]/g, "");
        container = stringArray?.split(splitChar);
        return container;
    }

    const formatQuestions = (item: any) => {
        return item.replace(/[\)\"\(]/g, "");
    }

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
        
        
        let splitStringArray = splitString(event.target.value, ",");
        for (let i = 0; i < splitStringArray.length; i++) {
            let strippedResult = splitString(splitStringArray[i], ":");
            arrayStringMap.set(i, strippedResult);
        }

        const finalQuestion = arrayStringMap.get(0)[1];
        const finalAnswer = arrayStringMap.get(1)[1];

        setAlert(true);

        let obj;
        if (answer === "") {
            obj = {
                question: finalQuestion,
                answer: finalAnswer
            }
        } else {
            obj = {
                question: finalQuestion,
                answer
            }
        }

        setArray([...array, obj]);
        setDraftArray([...draftArray, answer]);
    }

    async function submitAnswer(e: any) {
        e.preventDefault();

        if (array.length == 0) {
            console.log("didn't submit answer");
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
            console.log("didn't submit draft");
            setShouldRenderFailAlert(true);
            return;
        }

        const photo = new FormData();

        // Update the formData object
        photo.append(
          "file",
          pho,
        );

        let photoArray = [];
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
            setTimeout(() => {
                document.location.reload();
            },1000);
        } catch (e) {
            console.log(e);
        }

    }

    const renderAlert =() => {
        return <Alert severity="success">saved success!</Alert>;
    }

    const renderFailAlert =() => {
        return <Alert severity="error">Please save each answer before submitting!</Alert>;
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

    const renderNothing =() => {
        return <div></div>;
    }
   
    const [photoName, setPhotoName] = useState("");

    const onFileUpload = async () => {

        try {
            const response = await CaseStudyService.createCaseStudy();
            console.log(response);

        } catch (e) {
            console.log(e);
        }

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
        // console.log("the email of the user is ", localStorage.getItem("email"));
        
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
           {questionsAndAnswers.map((item, key) => {
               return( 
               <div className={AddCaseStudyDraftStyle.questions}>
                    <h3>{formatQuestions(item.questions)}</h3>
                    {item?<Input key={item.caseStudyId} userInput={answer} type="text" label="" value={item.answers} onChangeFunc={setPatientNameFunc} sx={{width: "43rem"}} />: <div></div>}
                    {/* <Button variant="outlined" onClick={submitSave} value={item.questions} >save</Button> */}
                    <Button variant="outlined" onClick={submitSave} value={JSON.stringify(item)} >save</Button>
               </div>
               )
           })} 
            {submitPhotoAlert?submitPhotoSuccess(): renderNothing()}
            {shouldRenderFailAlert?renderFailAlert():renderNothing()}
            {questionsAndAnswers.length > 0?
            <div className={AddCaseStudyDraftStyle.uploadSection} >
           <label htmlFor="file-upload" className={AddCaseStudyDraftStyle.fileUpload}>
                {/* Choose a photo  */}
                <input id="file-upload" type="file" onChange={onFileChange} />
            </label>
                
                <Button variant="contained" onClick={onFileUpload} className={AddCaseStudyDraftStyle.uploadSectionButton}>Upload Photo</Button>
            </div>
            :<></>}
            {submitDrafAlert?submitDraftSuccess(): renderNothing()}
            {submitAnswerAlert?sumbitSuccess(): renderNothing()}
           {questionsAndAnswers.length > 0?<Button variant="contained" onClick={submitDraftAnswer} >Submit As Draft</Button>:<></>}
           {questionsAndAnswers.length > 0?<Button variant="contained" onClick={submitAnswer} >Submit Now!</Button>:<></>}
        </div>
    )
}

export default AddCaseStudyDraft;