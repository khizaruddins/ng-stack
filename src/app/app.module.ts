import { firebaseConfig } from './config/stack-config';
import { DateAgoPipe } from './pipe/date-ago.pipe';
import { HomeComponent } from './components/home/home.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginRedirectComponent } from './components/login-redirect/login-redirect.component';
import { QuestionItemComponent } from './components/question-list/question-item/question-item.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { MaterialModule } from './config/material.module';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { AnswerItemComponent } from './components/answer-item/answer-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NavigationComponent } from './components/navigation/navigation.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginRedirectComponent,
    QuestionListComponent,
    HomeComponent,
    QuestionItemComponent,
    QuestionSearchComponent,
    DateAgoPipe,
    QuestionDetailsComponent,
    AnswerItemComponent,
    LoginComponent,
    NotFoundComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig, 'ng-stack'),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
