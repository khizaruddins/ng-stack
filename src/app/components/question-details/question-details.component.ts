import { LoginService } from './../login/login.service';
import { stackCredsParams } from './../../config/stack-config';
import { SharedService } from './../../shared/shared.service';
import { QuestionListService } from './../question-list/question-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionListService: QuestionListService,
    private sharedService: SharedService,
    private loginService: LoginService
  ) { }

  routerSubs: Subscription;
  questionId: number;
  questionArr: [] = [];
  answerList: [] = [];
  isQuestionLoading: boolean = false;
  isAnswerLoading: boolean = false;
  isLoggedInValue: boolean = false;
  user = null;
  userSubs: Subscription;

  ngOnInit(): void {
    this.getQuestionIdFromParams();
    this.getLoggedInUserState();
  }

  getLoggedInUserState() {
    this.userSubs = this.loginService.getUserState().subscribe(value => {
      this.user = value;
      this.isLoggedInValue = true;
    })
  }

  getQuestionIdFromParams() {
    this.routerSubs = this.activatedRoute.params.subscribe(params => {
      if (params) {
        this.questionId = params.id;
        this.isQuestionLoading = true;
        this.getDetailedQuestion();
        this.getDetailAnswer();
      }
    })
  }

  getDetailedQuestion() {
    let stackCredswithQuery = {
      ...stackCredsParams,
      access_token: localStorage.getItem('token'),
      filter: 'withBody'
    }
    this.questionListService.getDetailedQuestionData(this.questionId, stackCredswithQuery)
      .subscribe(value => {
        if (value) {
          this.isQuestionLoading = false;
          console.log("Question/id", value);
          this.questionArr = value.items;
        }
      }, err => {
        this.isQuestionLoading = false;
        console.error(err);
        this.sharedService.openSnackBar('Something went wrong', 'DISMISS');
      });
  }

  getDetailAnswer() {
    let stackCredsParamsWithQuery = {
      ...stackCredsParams,
      access_token: localStorage.getItem('token'),
      filter: 'withBody'
    }
    this.isAnswerLoading = true;
    this.questionListService.getDetailedAnswerData(this.questionId, stackCredsParamsWithQuery)
      .subscribe(value => {
        this.isAnswerLoading = false;
        console.log("answer value,", value);
        this.answerList = value.items;
      })
  }

  ngOnDestroy(): void {
    if (this.routerSubs) {
      this.routerSubs.unsubscribe();
    }

    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }

}
