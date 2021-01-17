import { SharedService } from './shared/shared.service';
import { OAuthService } from './oauth/oauth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
  ) { }

  ngOnInit(): void {
  }
}
