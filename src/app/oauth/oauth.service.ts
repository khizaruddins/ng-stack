import { HttpParams } from '@angular/common/http';
import { stackConfig } from './../config/stack-config';
import { HttpService } from './../http-service/http.service';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class OAuthService {
  constructor(
    private http: HttpService
  ) { }
}