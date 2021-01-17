import { LoginService } from './../login/login.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }
  @Input('isLoggedInValue') isLoggedInValue;

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
