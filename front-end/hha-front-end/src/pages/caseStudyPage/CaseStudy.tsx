import React, {FC, useContext, useState, useEffect, useCallback} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"
import Dropdown from "../../components/dropdown/Dropdown";
import AddCaseStudy from "../../components/add_case_studies/AddCaseStudy";
import AddCaseStudyDraft from "../../components/add_case_studies_draft/AddCaseStudyDraft";
import Navbar from "../../components/Navbar/Navbar";
import CaseStudyService from "../../service/CaseStudyService";
import CaseStudyStyle from "./CaseStudy.module.css";
import { Button } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CaseStudyComponent from "../../components/case_Study/case_Study";

const CaseStudy: FC = () => {
    let objArray: Array<any> = [];
    let caseStudyAnswers: Array<any> = [];
    let caseStudyEntryLists: Array<any> = [];
    const caseStudyMap = new Map();
    const caseStudyAnswerMap = new Map();
    const photoMapping = new Map();
    const [draftData, setDraftData] = useState(objArray);
    const [map, setMap] = useState(caseStudyMap);
    const [draftStyle, setDraftStyle] = useState(false);

    const getCaseStudyWithoutQuotes = (caseStudyOption: any)=> {
        switch(caseStudyOption) {
            case "\"Patient Story\"":
                return "Patient Story";
            case "\"Staff Recognition\"":
                return "Staff Recognition";
            case "\"Training Session\"":
                return "Training Session";
            case "\"Training Session\"":
                return "Training Session";
            case "\"Equipment Received\"":
                return "Equipment Received";
            case "\"Other Story\"":
                    return "Other Story";
            default:
                return "";
        }
    }
    

    useEffect(() => { 
        const fetchDrafts = async () => {
           try {
            const response = await CaseStudyService.createCaseStudy();
            let tempArray: Array<any> = [];
          
            response.data.forEach(element => {
                let tempArrayEntryList: Array<any> = []; 
                let tempArrayAnswers: Array<any> = [];            
                const caseStudyName = getCaseStudyWithoutQuotes(JSON.stringify(element.caseName));
                const caseStudyId = JSON.stringify(element.id).replace(/[\?\"\(\)\']/g, "");
                const caseStudyPhotoId = JSON.stringify(element.photoId).replace(/[\?\"\(\)\']/g, "");
                
                const entryListObj = element?.entryList;
                entryListObj.forEach(element => {
                    const questions = element?.question;
                    const answers = element?.answer;
                    const entryListWithIdObj = {
                        questions,
                        answers,
                        caseStudyId
                    }
                    tempArrayEntryList.push(entryListWithIdObj);
                    tempArrayAnswers.push(answers);
                });

                caseStudyMap.set(caseStudyId, tempArrayEntryList);
                
                caseStudyAnswerMap.set(caseStudyId, tempArrayAnswers);
                const buttonObj = {
                    caseStudyName,
                    caseStudyId,
                    caseStudyPhotoId
                }
                tempArray.push(buttonObj);
            });
            setDraftData(tempArray);
            setMap(caseStudyMap);
           } catch (error) {
               console.log(error + "failed to fetch the data"); 
           }
          };
        fetchDrafts();
    }, []);

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
    const emptyList: Array<any> = [];
    const [finalQuetionsAndAnswers, setFinalQuetionsAndAnswers] = useState(emptyList);
    const setDropdownFunc = useCallback(async (event) => {
        setImageIsSet(false);
        // we only click the dropdown and not clicking the draft
        setDropdown(event.target.value);
        let response = await CaseStudyService.getQuestions(event.target.value);
        setFinalQuetionsAndAnswers([]);
         return setQuestions(JSON.stringify(response.data.questions));
    },[]);

    const splitString = (stringArray: string, splitChar: string) => {
        let container: Array<string>;
        stringArray = stringArray?.replace(/[\{\}\[\]]/g, "");
        container = stringArray?.split(splitChar);
        return container;
    }

    const getQuestionsAndAnswers = useCallback(async (event: any) => {
        
        const entryList =  map.get(event.target.id);  
        return setFinalQuetionsAndAnswers(entryList);
    },[]);


    const getDrafts = async (event: any) => {
        await getPhotos();
        let array = splitString(event.target.value, ",");
        let arrayElementsWithoutDot: Array<any> = [];
        array.forEach(element => {
            arrayElementsWithoutDot.push(element);
        });

        const arrayStringMap = new Map();

        for (let i = 0; i < arrayElementsWithoutDot.length; i++) {
            let strippedResult = splitString(arrayElementsWithoutDot[i], ":");
            arrayStringMap.set(i, strippedResult);
        }

        let finalCaseStudyName = arrayStringMap.get(0)[1].replace(/[\{\}\[\]\"]/g, "");
        const finalCaseStudyPhotoId = arrayStringMap.get(2)[1].replace(/[\{\}\[\]\"]/g, "");
        setDropdown(finalCaseStudyName); // invoke the dropdown so that the draft can fill in the dropdown
        let src = photoMapping.get(finalCaseStudyPhotoId);

        if (src === undefined) {
            setImageIsSet(false);
        }  else {
            setImage(src);
            setImageIsSet(true);
        }
        
        getQuestionsAndAnswers(event); // get the list of questions and answers and fill into the dropdown
        setQuestions("");
        setDraftStyle(true);
    }

    const [image, setImage] = useState("");
    const [imageIsSet, setImageIsSet] = useState(false);
  
    const getPhotos = async () => {
        try {
            const response = await CaseStudyService.getPhotosByCurrentUser();
            let photoArray = response.data;
            for (let i = 0; i < photoArray.length; i++) {
                var src = `data:image;base64,${photoArray[i].image.data}`;
                photoMapping.set(photoArray[i].id,src);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteDraft = async (event: any) => {
        try {
            const response = await CaseStudyService.deleteCaseStudyDraftById(event.target.id.replace(/[\?\"\(\)\']/g, ""));
            console.log(response);
            setTimeout(() => {
                document.location.reload();
            },1000);
        } catch (error) {
            console.log(error);
            
        }
        
    }

    

    return (
        <div>
            <Navbar />
            <div className={CaseStudyStyle.mainDiv}>
                <div className={CaseStudyStyle.leftPane}>
                    <div className={CaseStudyStyle.leftPaneTitle}>
                        <h4>Your previous drafts:</h4>
                    </div>
                    <div className={CaseStudyStyle.draftParentStyle}>
                        {draftData.map((item, key) => {
                            return <>
                            <div className={CaseStudyStyle.draftButtonStyle}>
                                <Button  onClick={getDrafts} key={key} id={item.caseStudyId} value={JSON.stringify(item)}>{item.caseStudyName}</Button>
                                <div className={CaseStudyStyle.draftDeleteButton} >
                                    <Button onClick={deleteDraft} variant="contained" size="small" key={key} id={item.caseStudyId} value={item.caseStudyName} color="error">Delete</Button>
                                </div>
                            </div>
                            </>
                        })}
                    </div>
                </div>
                <div>
                </div>
                <div className={CaseStudyStyle.caseStudies}>
                    <div className={CaseStudyStyle.castStudiesTitle}>
                        <h1>Select different Case Study below to fill in:</h1>
                    </div>
                    <div className={CaseStudyStyle.caseStudiesDropdown}>
                        <Dropdown listItems={listItems} itemName={""} onChangeFunc={setDropdownFunc} initialValue={dropdown} />
                    </div>
                    <div className={ draftStyle||questions?CaseStudyStyle.caseStudiesDropdownDisplayCustom:CaseStudyStyle.caseStudiesDropdownDisplay}>
                        {questions?<AddCaseStudy caseName={dropdown}  questions={questions} />:<></>}
                        {finalQuetionsAndAnswers?<AddCaseStudyDraft caseName={dropdown}  questionsAndAnswers={finalQuetionsAndAnswers} />:<></>}
                        <div className={CaseStudyStyle.draftPhoto}>
                            
                            {imageIsSet?<div><p>Draft Photo Preview</p><img src={image} alt="no photo uploaded for this draft" width="200" height="200"  /></div>:<></>}
                        </div>
                    </div>
                    
                </div>
            </div>
            <footer className={CaseStudyStyle.footer}>
                Copyright © 2021 HHA Group | Sitemap | Site Designed and Powered by CMPT373 Group Pluto
            </footer>
        </div>
    );
}

export default observer(CaseStudy);