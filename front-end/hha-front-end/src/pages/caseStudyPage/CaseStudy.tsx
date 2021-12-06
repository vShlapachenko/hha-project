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
import { Box } from '@mui/system';
import CaseStoryComponent from "../../components/case_Study/Patient_story/Patient_Story";
import EquimentsReceivedComponent from "../../components/case_Study/Equipments_Received/Equipments_received";
import StaffRecognitionComponent from "../../components/case_Study/Staff_Recognition/Staff_Recognition";
import TrainingSessionComponent from "../../components/case_Study/Training_Session/Training_Session";
import OtherStoryComponent from "../../components/case_Study/Other_Story/Other_Story";

const CaseStudy: FC = () => {
    let objArray: Array<any> = [];
    let caseStudyPhotoList: Array<any> = [];
    let caseStudyLists: Array<any> = [];
    let caseStudyListsArray: Array<any> = [];
    const caseStudyMap = new Map();
    const caseStudyAnswerMap = new Map();
    const photoMapping = new Map();
    const allPhotoMapping = new Map();
    const allCaseStudiesMap = new Map();
    const arrayStringMap = new Map();
    const [draftData, setDraftData] = useState(objArray);
    const [map, setMap] = useState(caseStudyMap);
    const [allCaseStudyPhotoMapping, setAllCaseStudyPhotoMapping] = useState(allPhotoMapping);
    const [draftStyle, setDraftStyle] = useState(false);
    const [caseStudyListsData, setCaseStudyListsData] = useState(caseStudyLists);
    const [shouldRenderAllCases, setShouldRenderAllCases] = useState(true);
    const [allCaseStudiesMapping, setAllCaseStudiesMapping] = useState(allCaseStudiesMap);
    const [isLoading, setIsLoading] = useState(true);
    const [showSpecificCaseStudy, setShowSpecificCaseStudy] = useState(false);
    const [patient_image, setPatient_image] = useState("");
    const [case_image, setCase_image] = useState("");
    const [heading, setHeading] = useState("");
    const currentState = <h1>Loading, please wait...</h1>;

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
    useEffect(() => { 
        fetchDrafts();
        getAllCaseStudies();
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
    },[fetchDrafts]);

    const onChangeFunc = async () => {
        await fetchDrafts();
    }

    const [childPhoto, setChildPhoto] = useState("");
    const getDrafts = async (event: any) => {
        await getPhotos();
        let array = splitString(event.target.value, ",");
        let arrayElementsWithoutDot: Array<any> = [];
        array.forEach(element => {
            arrayElementsWithoutDot.push(element);
        });


        for (let i = 0; i < arrayElementsWithoutDot.length; i++) {
            let strippedResult = splitString(arrayElementsWithoutDot[i], ":");
            arrayStringMap.set(i, strippedResult);
        }

        const finalCaseStudyName = arrayStringMap.get(0)[1].replace(/[\{\}\[\]\"]/g, "");
        const finalCaseStudyPhoto = arrayStringMap.get(2)[1].replace(/[\{\}\[\]\"]/g, "");
        setChildPhoto(finalCaseStudyPhoto);
        setDropdown(finalCaseStudyName); // invoke the dropdown so that the draft can fill in the dropdown
        const src = photoMapping.get(finalCaseStudyPhoto);

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
            const photoArray = response.data;
            for (let i = 0; i < photoArray.length; i++) {
                let src = `data:image;base64,${photoArray[i].image.data}`;
                photoMapping.set(photoArray[i].id,src);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAllPhotos = async () => {
        try {
            const response = await CaseStudyService.getAllPhotos();
            const photoArray = response.data;
            for (let i = 0; i < photoArray.length; i++) {
                let src = `data:image;base64,${photoArray[i].image.data}`;
                allPhotoMapping.set(photoArray[i].id,src);
            }

            setAllCaseStudyPhotoMapping(allPhotoMapping);
        } catch (error) {
            console.log(error);
            
        }
    }

    const getAllCaseStudies = async () => {
        await getAllPhotos();
        try {
            const response = await CaseStudyService.getAllCaseStudies();
            console.log(response.data);
            let responseData = response.data;
            responseData.forEach(element => {
                let obj = {
                    id: element.id,
                    caseName: element.caseName,
                    entryList: element.entryList,
                    photoId: element.photoId
                }
                caseStudyLists.push(obj);
                allCaseStudiesMap.set(obj.id, obj);
            });

            setCaseStudyListsData(caseStudyLists);
            setAllCaseStudiesMapping(allCaseStudiesMap);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeFunc2 = async() => {
        await getAllCaseStudies();
    }

    const deleteDraft = async (event: any) => {
        try {
            const response = await CaseStudyService.deleteCaseStudyDraftById(event.target.id.replace(/[\?\"\(\)\']/g, ""));
            console.log(response);
            await fetchDrafts();
        } catch (error) {
            console.log(error);
            
        }
        
    }

    const patient_name = useState(null);
    const patient_age = useState(null);
    const patient_location = useState(null);
    const reason_hcbh = useState(null);
    const duration_hcbh = useState(null);
    const diagnosis = useState(null);
    const story = useState(null);

    const showCaseStudy = (event: any) => {
        patient_name[1](null);
        patient_age[1](null);
        patient_location[1](null);
        reason_hcbh[1](null);
        duration_hcbh[1](null);
        diagnosis[1](null);
        story[1](null);
        console.log(event.target.value);  
        const data = allCaseStudiesMapping.get(event.target.value);
        const caseName = data?.caseName;
        const img = allCaseStudyPhotoMapping.get(data.photoId);
        let imgOpt = img;
        const entryList = data?.entryList;
        const tempList = [];
        tempList.push(patient_name);
        tempList.push(patient_age);
        tempList.push(patient_location);
        tempList.push(reason_hcbh);
        tempList.push(duration_hcbh);
        tempList.push(diagnosis);
        tempList.push(story);
        entryList.forEach((element:any) => {
            // setInput0(element);
            tempList.push(element);
        });

        for (let i = 0; i < entryList.length; i++) {
            tempList[i][1](entryList[i]);
        }
 
        if (caseName !== "Patient Story" && caseName !== "Staff Recognition") {
            imgOpt = "";
        }
        setPatient_image(imgOpt);
        setCase_image(img);
        setHeading(caseName);
        setShowSpecificCaseStudy(true);
    }

    const setWindowState = () => {
        setShowSpecificCaseStudy(false);
    }
    
    if (isLoading) {
        return (<div>
        <Navbar />
        {currentState}
        </div>
        );
    }

    return (
        <div>
            <Navbar />
            
            {showSpecificCaseStudy?<div>
                <CaseStoryComponent patient_image={patient_image} case_image={case_image} heading={heading} patient_name={patient_name[0]} patient_age={patient_age[0]} patient_location={patient_location[0]} reason_hcbh={reason_hcbh[0]} duration_hcbh={duration_hcbh[0]} diagnosis={diagnosis[0]} story={story[0]} employee_story="" onChangeFunc={setWindowState}/>
            </div>:<></>
            }
            <div className={CaseStudyStyle.heading}>
            <h1>Current Case Study Previews:</h1>
            </div>
               <div className={CaseStudyStyle.allCaseStudies}>
                {caseStudyListsData.map((item, key) => {
                    let photoSrc = allCaseStudyPhotoMapping.get(item.photoId);              
                    var img = document.createElement('img');  
                    img.src = photoSrc;
                    return  <span ><Box className={CaseStudyStyle.singleCaseStudy} sx={{ m: 1, p: 1, border: '3px solid #54AF31', borderRadius:'5px' }}>
                                <div><Button onClick={showCaseStudy} value={item.id} >{item.caseName}</Button> </div>             
                            {photoSrc===undefined?<div className={CaseStudyStyle.filler}>No photo uploaded for this case study; click above to see more details...</div>:<img src={photoSrc} alt="no photo uploaded for this draft" width="150" height="150"  />}
                        </Box></span>
                })}
                </div>
            <div>
            </div>
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
                        {questions?<AddCaseStudy caseName={dropdown}  questions={questions} onChangeFunc={onChangeFunc} onChangeFunc2={onChangeFunc2} />:<></>}
                        {finalQuetionsAndAnswers?<AddCaseStudyDraft caseName={dropdown}  questionsAndAnswers={finalQuetionsAndAnswers} childPhoto={childPhoto} onChangeFunc={onChangeFunc} onChangeFunc2={onChangeFunc2}/>:<></>}
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