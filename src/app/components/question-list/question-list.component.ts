import { Subscription } from 'rxjs';
import { SharedService } from './../../shared/shared.service';
import { QuestionList } from '../../interfaces/questionList.interface';
import { stackCredsParams } from './../../config/stack-config';
import { QuestionListService } from './question-list.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  constructor(
    private questionListService: QuestionListService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  isLoading: boolean = false;
  pageEvent: PageEvent;
  currentPageIndex: number = 0;
  canPaginate: boolean = false;
  questionList: QuestionList[] = [];
  searchTriggerSubs: Subscription;
  prevQuery: boolean | {} = false;
  existingQuery: any = {};

  ngOnInit(): void {
    this.initSearchTriggering();
    if (localStorage.getItem('token') !== null) {
      this.getQuestionList();
    } else {
      const interval = setInterval(() => {
        if (localStorage.getItem('token') !== null) {
          this.getQuestionList();
          clearInterval(interval);
        }
      }, 1000);
    }
  }

  initSearchTriggering() {
    this.searchTriggerSubs = this.sharedService.getTriggeredSearchQueryData()
      .subscribe(query => {
        if (query) {
          if (typeof query === 'object') {
            this.existingQuery = query;
          }
          if (this.prevQuery !== query) {
            this.getQuestionList(query);
          }
          this.prevQuery = query;
        }
      })
  }

  getQuestionList(query?): void {

    let params = {
      ...stackCredsParams,
      access_token: localStorage.getItem('token'),
      ...query
    };
    this.isLoading = true;
    this.questionListService.getQuestionListData(params)
      .subscribe(response => {
        if (response) {
          const { items, has_more } = response;
          this.canPaginate = has_more;

          this.questionList = items;
          this.isLoading = false;
        } else {
          this.questionList = [];
        }
      }, err => {
        console.error(err);
        this.sharedService.openSnackBar('Something went wrong', 'Dismiss');
        const interval = setInterval(() => {
          if (localStorage.getItem('token') !== null) {
            params = {
              ...stackCredsParams,
              access_token: localStorage.getItem('token')
            }
            this.getQuestionList(params);
            clearInterval(interval);
          }
        }, 1000)
      });
  }

  onPaginationChange(event: PageEvent) {
    const { pageIndex } = event;
    this.currentPageIndex = pageIndex + 1;
    this.questionList = [];

    if (!!this.existingQuery.page) {
      this.currentPageIndex = this.existingQuery.page + pageIndex;
    }
    let query = {
      ...this.existingQuery,
      page: this.currentPageIndex,
      pagesize: 30,
    }

    this.getQuestionList(query)
    return event;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchTriggerSubs) {
      this.searchTriggerSubs.unsubscribe();
    }
  }



}
