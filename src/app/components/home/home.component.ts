import { Subscription } from 'rxjs';
import { LoginService } from './../login/login.service';
import { SharedService } from './../../shared/shared.service';
import { stackConfig } from '../../config/stack-config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private sharedService: SharedService
  ) { }

  user = null;
  userSubs: Subscription;
  isLoggedInValue: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn();
  }
  isLoggedIn() {
    if (localStorage.getItem('loginStatus') !== null) {
      this.isLoggedInValue = true;
      this.userSubs = this.loginService.getUserState()
        .subscribe(value => {
          this.user = value;
        })
      this.checkForAccessToken(false);
    } else {
      this.router.navigate(['/login'])
    }
  }

  checkForAccessToken(forcedCheck): void {
    if (localStorage.getItem('token') == null || forcedCheck) {
      this.getAccessToken();
    } else {
      this.checkForTokenExpiry()
    }
  }

  checkForTokenExpiry(): void {
    const dateToday = new Date().getTime();
    if (localStorage.getItem('expiresIn') !== null) {
      const expiresIn = parseInt(localStorage.getItem('expiresIn'));
      if (dateToday > expiresIn) {
        this.checkForAccessToken(true);
      }
    }
  }

  getAccessToken() {
    window.open(stackConfig.OAUTH_DIALOG + `?client_id=${stackConfig.clientId}&scope=read_inbox,private_info&redirect_uri=https://ng-stack.web.app/oauth-redirect`)
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }
}
