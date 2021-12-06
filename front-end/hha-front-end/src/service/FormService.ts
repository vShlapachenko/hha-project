import $api from "../http";
import {Form} from '../models/forms/Form'

export default class FormService {
    static async getCommunityHealth() {
        return await $api.get<Form>('/form/61adc715b0bb8495db94aa35')
    }

    static async test() {
      return await $api.get('/leaderboard/monthDepartments')
  }
}