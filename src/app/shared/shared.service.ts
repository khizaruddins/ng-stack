import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _snackBar: MatSnackBar) { }
  resetAdvancedSearchObs = new BehaviorSubject<Boolean>(false);
  triggeredSearchObs = new BehaviorSubject<boolean | {}>(false);


  getResetAdvancedSearchValue(): Observable<any> {
    return this.resetAdvancedSearchObs.asObservable();
  }

  resetAdvancedSearchValue(data: boolean): void {
    this.resetAdvancedSearchObs.next(data);
  }

  getTriggeredSearchQueryData(): Observable<boolean | {}> {
    return this.triggeredSearchObs.asObservable();
  }

  triggerSearchQuery(query: (boolean | {})): void {
    this.triggeredSearchObs.next(query);
  }

  openSnackBar(message: string, action: string, withDuration = false) {
    let durationObj = {
      duration: 2000,
    }
    withDuration ? this._snackBar.open(message, action, durationObj) : this._snackBar.open(message, action);
  }
}
