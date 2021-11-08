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

}