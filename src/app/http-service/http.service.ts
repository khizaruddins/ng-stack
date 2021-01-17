import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient,
  ) { }
  baseUrl;

  ngOnInit(): void {
    this.baseUrl = "https://api.stackexchange.com/docs/advanced-search";
  }

  getHttpClient(url, httpOptions?): Observable<any> {
    return this._http
      .get(url, httpOptions);
  }

  get(url: string, params?: HttpParams): Observable<any> {
    url = url.trim();
    return this.getHttpClient(url, {
      params,
    })
  }

  post(url: string, params?: HttpParams): Observable<any> {
    url = url.trim();
    return this._http.post(url, params);
  }

}
