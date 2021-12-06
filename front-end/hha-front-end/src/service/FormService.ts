import $api from "../http";
import {AxiosResponse} from 'axios'
import {Form} from "../models/forms/Form"

export default class FormService{
    static exportForm(){
        return $api.post<Form> ('/form/export', )
    }
}