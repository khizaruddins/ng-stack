import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRedirectComponent } from './components/login-redirect/login-redirect.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'questions', component: QuestionListComponent },
  { path: 'oauth-redirect', component: LoginRedirectComponent },
  { path: 'question-details/:id', component: QuestionDetailsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
