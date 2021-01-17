import { Observable } from 'rxjs';
import { stackConfig } from './../../config/stack-config';
import { HttpService } from './../../http-service/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionListService {

  constructor(
    private http: HttpService
  ) { }

  getQuestionListData(params): Observable<any> {
    return this.http.get(stackConfig.baseUrl + stackConfig.ADVANCED_SEARCH, params);
  }

  getDetailedQuestionData(id, params): Observable<any> {
    return this.http.get(stackConfig.baseUrl + stackConfig.QUESTION_DETAIL + `${id}`, params);
  }

  getDetailedAnswerData(id, params): Observable<any> {
    return this.http.get(stackConfig.baseUrl + `questions/${id}/answers`, params);
  }
}
