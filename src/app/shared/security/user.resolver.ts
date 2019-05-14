import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserModel> {

  constructor(
    public userService: AuthService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        const user = new UserModel();
        user.uid = res.uid;
        user.email = res.email;
        user.image = res.photoURL;
        user.name = res.displayName;
        user.provider = res.providerData[0].providerId;
        return resolve(user);
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      });
    });
  }
}
