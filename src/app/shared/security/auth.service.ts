import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  doGoogleLogin() {
    return this.doLogin(new auth.GoogleAuthProvider());
  }

  doFacebookLogin() {
    return this.doLogin(new auth.FacebookAuthProvider());
  }

  doTwitterLogin() {
    return this.doLogin(new auth.TwitterAuthProvider());
  }

  doLogin(provider: auth.AuthProvider) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      auth().onAuthStateChanged((userAuth) => {
        if (userAuth) {
          const user = new UserModel();
          user.uid = userAuth.uid;
          user.email = userAuth.email;
          user.image = userAuth.photoURL;
          user.name = userAuth.displayName;
          return resolve(user);
        } else {
          return reject('No user logged in');
        }
      });
    });
  }

}
