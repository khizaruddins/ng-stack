import { QuestionList } from './../../../interfaces/questionList.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  @Input('question') questionObject: QuestionList | null = null;

  ngOnInit(): void {
  }

  redirectToDetailPage() {
    this.router.navigate(['question-details', this.questionObject.question_id]);
  }

}
