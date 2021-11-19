import $api from "../http";
import {AxiosResponse} from 'axios'
import { CaseStudy } from "../models/CaseStudy";

export default class CaseStudyService {

    static getQuestions(caseName: any): Promise<AxiosResponse<CaseStudy>> {
        
        return $api.post<CaseStudy>(`/case-study/questions?caseName=${caseName}`);
    }

    static submitAnswers(id: any, submittedBy: any, caseName: string, submittedDate: any, entryList: Array<any>, photo: any): Promise<AxiosResponse<CaseStudy>> {
        
        return $api.post<CaseStudy>(`/case-study/submit`, {id, submittedBy, caseName, submittedDate, entryList, photo});
    }

    static submitAnswersAsDraft(caseName: string, submittedBy: any, entryList: Array<any>, photo: any): Promise<AxiosResponse<CaseStudy>> {
        
        return $api.post<CaseStudy>(`/case-study/submitAsDraft`, {submittedBy, caseName, entryList, photo});
    }


    static createCaseStudy(): Promise<AxiosResponse<CaseStudy[]>> {
        
        return $api.get<CaseStudy[]>(`/case-study/create`);
    }

    static addPhoto(photo: any): Promise<AxiosResponse<CaseStudy>> {
        
        return $api.post<CaseStudy>(`/case-study/photo/add`, {photo});
    }

}