import $api from "../http";
import {AxiosResponse} from 'axios'
import { CaseStudy } from "../models/CaseStudy";
import { Photo } from "../models/Photo";

export default class CaseStudyService {

    static getQuestions(caseName: any): Promise<AxiosResponse<CaseStudy>> {
        
        return $api.post<CaseStudy>(`/case-study/questions?caseName=${caseName}`);
    }

    static submitAnswers(id: any, submittedBy: any, caseName: string, submittedDate: any, entryList: Array<any>, photoId: any): Promise<AxiosResponse<CaseStudy>> {
        
        return $api.post<CaseStudy>(`/case-study/submit`, {id, submittedBy, caseName, submittedDate, entryList, photoId});
    }

    static submitAsDraft(caseName: string, submittedBy: any, entryList: Array<any>, photoId: any): Promise<AxiosResponse<CaseStudy>> {
        
        return $api.post<CaseStudy>(`/case-study/submitAsDraft`, { caseName, submittedBy, entryList, photoId});
    }

    static getAllCaseStudies(): Promise<AxiosResponse<CaseStudy[]>> {
        return $api.get<CaseStudy[]>(`/case-study/getAllCaseStudies`);
    }

    static createCaseStudy(): Promise<AxiosResponse<CaseStudy[]>> {
        
        return $api.get<CaseStudy[]>(`/case-study/create`);
    }

    static addPhoto(photo: any): Promise<AxiosResponse<Photo>> {
        
        return $api.post<Photo>(`/case-study/photo/add`, photo);
    }

    static getAllPhotos(): Promise<AxiosResponse<Photo[]>> {
        
        return $api.get<Photo[]>(`/case-study/photo/getAllPhotos`);
    }

    static getPhotosByCurrentUser(): Promise<AxiosResponse<Photo[]>> {
        
        return $api.get<Photo[]>(`/case-study/photo/getPhotosByCurrentUser`);
    }

    static deleteCaseStudyDraftById(id: any): Promise<AxiosResponse<any>> {

        return $api.delete<any>(`/case-study/delete/${id}`);
    }

}