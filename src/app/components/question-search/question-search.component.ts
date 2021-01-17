import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.scss']
})
export class QuestionSearchComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService
  ) { }
  showAdvanceSearch: boolean = false;
  searchFormValueChangeSubs: Subscription;
  resetAdvancedSearchSubs: Subscription;

  searchForm: FormGroup;
  orderArr: string[] = ['asc', 'desc'];
  booleanArr: string[] = ['true', 'false'];
  sortByArr: string[] = ['activity', 'votes', 'creation', 'relevance'];
  query: {} = {};


  ngOnInit(): void {

    this.formInit();
    this.valueChangesInSearchFormInit();
    this.resetAdvanceSearchOnPagination();
  }

  formInit() {
    this.searchForm = this.fb.group({
      page: [null, Validators.pattern("^[0-9]*$"),],
      pagesize: [null, Validators.pattern("^[0-9]*$"),],
      fromdate: [null,],
      todate: [null,],
      max: [null,],
      min: [null,],
      order: ['asc',],
      accepted: [null,],
      sort: ['activity',],
      closed: [null,],
      migrated: [null,],
      notice: [null,],
      answers: [null, Validators.pattern("^[0-9]*$"),],
      body: [null,],
      q: [null,],
      nottagged: [null,],
      tagged: [null,],
      title: [null,],
      user: [null, Validators.pattern("^[0-9]*$"),],
      url: [null,],
      views: [null, Validators.pattern("^[0-9]*$"),],
      wiki: [null,]
    });
  }

  valueChangesInSearchFormInit() {
    this.searchFormValueChangeSubs = this.searchForm.valueChanges.subscribe(val => {
      for (const key in val) {
        if (Object.prototype.hasOwnProperty.call(val, key)) {
          if (val[key] !== null && val[key] != "" && val[key] != undefined) {
            if (['fromdate', 'todate', 'min', 'max'].includes(key)) {
              // converting to unix timestamp
              const date = Math.round(val[key].getTime() / 1000);
              this.query[key] = date;
            } else {
              this.query[key] = val[key];
            }
          } else {
            delete this.query[key];
          }

        }
      }

    })
  }

  resetAdvanceSearchOnPagination() {
    this.resetAdvancedSearchSubs = this.sharedService.getResetAdvancedSearchValue()
      .subscribe(value => {
        if (value) {
          this.query = {};
          this.searchForm.patchValue({
            page: null,
            pagesize: null,
            fromdate: null,
            todate: null,
            max: null,
            min: null,
            order: 'asc',
            accepted: null,
            sort: 'activity',
            closed: null,
            migrated: null,
            notice: null,
            answers: null,
            body: null,
            q: null,
            nottagged: null,
            tagged: null,
            title: null,
            user: null,
            url: null,
            views: null,
            wiki: null
          })
        }
      })
  }

  toggleAdvanceSearch() {
    this.showAdvanceSearch = !this.showAdvanceSearch;
  }

  submitForm(event) {
    event.preventDefault();

    if (this.searchForm.valid) {
      this.sharedService.triggerSearchQuery(this.query);
    } else {
      this.searchForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    if (this.searchFormValueChangeSubs) {
      this.searchFormValueChangeSubs.unsubscribe();
    }
  }

}
