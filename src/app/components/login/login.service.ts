import { SharedService } from './../../shared/shared.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private sharedService: SharedService
  ) { }
  newUser: any;
  private authError = new BehaviorSubject<any>('');
  authErrorObs$ = this.authError.asObservable();

  getUserState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential: firebase.auth.UserCredential) => {
        console.log(userCredential);
        localStorage.setItem('uid', userCredential.user.uid);
        localStorage.setItem('loginStatus', 'true');
        this.router.navigate(['/']);
      }).catch((err) => {
        this.sharedService.openSnackBar(err.message, "DISMISS")
        this.authError.next(err);
      });
  }

  createUserWithEmailAndPassword(user) {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile({
          displayName: user.name,
        });

        localStorage.setItem('loginStatus', 'true');
        localStorage.setItem('uid', userCredential.user.uid);
        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/'])
          }).catch(err => {
            this.sharedService.openSnackBar(err.message, "DISMISS")
            return this.authError.next(err);
          });

      })
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      name: this.newUser.name,
      mobileNo: this.newUser.mobno,
      password: this.newUser.password
    })
  }

  logout() {
    localStorage.clear();
    return this.afAuth.signOut();
  }

}