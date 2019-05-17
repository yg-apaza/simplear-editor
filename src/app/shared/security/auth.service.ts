import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  doGoogleLogin(): Promise<auth.UserCredential> {
    return this.doLogin(new auth.GoogleAuthProvider());
  }

  doFacebookLogin(): Promise<auth.UserCredential> {
    return this.doLogin(new auth.FacebookAuthProvider());
  }

  doTwitterLogin(): Promise<auth.UserCredential> {
    return this.doLogin(new auth.TwitterAuthProvider());
  }

  doLogin(provider: auth.AuthProvider): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  doLogout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  getCurrentUser(): Observable<UserModel | null> {
    return this.afAuth.authState.pipe(
      map(user => user ? new UserModel(user.uid, user.email, user.displayName, user.photoURL) : null)
    );
  }

}
