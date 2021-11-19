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
    const [draftData, setDraftData] = useState(objArray);
    const [map, setMap] = useState(caseStudyMap);

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
                const caseStudyId = JSON.stringify(element.id);
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
                    caseStudyId 
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
        // we only click the dropdown and not clicking the draft
        setDropdown(event.target.value);
        let response = await CaseStudyService.getQuestions(event.target.value);
        setFinalQuetionsAndAnswers([]);
         return setQuestions(JSON.stringify(response.data.questions));
    },[]);

    const getQuestionsAndAnswers = useCallback(async (event: any) => {
        const entryList =  map.get(event.target.id);
        return setFinalQuetionsAndAnswers(entryList);
    },[]);


    const getDrafts = (event: any) => {
        setDropdown(event.target.value); // invoke the dropdown so that the draft can fill in the dropdown
        getQuestionsAndAnswers(event); // get the list of questions and answers and fill into the dropdown
        setQuestions("");
    }

    return (
        <div>
            <Navbar />
            <div className={CaseStudyStyle.leftPane}>
                <div>
                    <h4>List of Drafts:</h4>
                    {draftData.map((item, key) => {
                        return <Button onClick={getDrafts} key={key} id={item.caseStudyId} value={item.caseStudyName}>{item.caseStudyName}</Button>
                    })}
                </div>
                {/* <div>
                    {entryList.map((item, key) => <ListItem key={key}><ListItemText primary={item} /></ListItem>)}
                </div> */}
            </div>
            
            <div className={CaseStudyStyle.mainDiv}>
                <Dropdown listItems={listItems} itemName={""} onChangeFunc={setDropdownFunc} initialValue={dropdown} />
                {questions?<AddCaseStudy caseName={dropdown}  questions={questions} />:<></>}
                {finalQuetionsAndAnswers?<AddCaseStudyDraft caseName={dropdown}  questionsAndAnswers={finalQuetionsAndAnswers} />:<></>}
            </div>
        </div>
    );
}

export default observer(CaseStudy);