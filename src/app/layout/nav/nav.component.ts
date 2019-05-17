import { Component, OnInit } from '@angular/core';
import { LocaleService } from 'angular-l10n';
import { AuthService } from 'src/app/shared/security/auth.service';
import { UserModel } from 'src/app/shared/security/user.model';
import SupportedLanguages from './supported-languages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {

  user: UserModel;
  supportedLanguages = SupportedLanguages;

  constructor(
    private router: Router,
    private authService: AuthService,
    public locale: LocaleService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.supportedLanguages = SupportedLanguages;
  }

  selectLanguage(language: string) {
    this.locale.setCurrentLanguage(language);
  }

  logout() {
    this.authService.doLogout()
      .then(() => this.router.navigate(['login']))
      .catch( err => {
        console.error('Couldn\'t logout user');
      });
  }
}
