import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss']
})
export class LoginRedirectComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }
  activatedRouteSubs: Subscription;

  ngOnInit(): void {
    this.fetchAccessTokenFromUrl();
  }

  fetchAccessTokenFromUrl() {
    this.activatedRouteSubs = this.activatedRoute.fragment.subscribe((fragment: string) => {
      console.log("My hash fragment is here => ", fragment);
      let accessToken = fragment.split('&')[0].split('=')[1];
      let expiresIn = fragment.split('&')[1].split('=')[1];
      console.log(expiresIn);
      localStorage.setItem('token', accessToken);
      let todayDateMilliseconds = new Date().getTime();
      let accessTokenEndsIn = todayDateMilliseconds + parseInt(expiresIn) * 1000;
      localStorage.setItem('expiresIn', String(accessTokenEndsIn));
      window.close();
    })
  }

  ngOnDestroy(): void {
    if (this.activatedRouteSubs) {
      this.activatedRouteSubs.unsubscribe();
    }
  }



}
