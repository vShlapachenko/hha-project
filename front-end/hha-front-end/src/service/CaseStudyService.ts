import $api from "../http";
import {AxiosResponse} from 'axios'
import { CaseStudy } from "../models/CaseStudy";

export default class CaseStudyService {

    static getQuestions(caseName: any): Promise<AxiosResponse<CaseStudy>> {
        
        return $api.post<CaseStudy>('/case-study/questions', {caseName});
    }
}