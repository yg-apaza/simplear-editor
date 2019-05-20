import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin().then(res => {
      // TODO: Throwing eror: outside angular zone
      this.router.navigate(['/projects']);
    }).catch(err => {
      // TODO: Show error on UI
      console.error('Google Login error');
    });
  }

}
