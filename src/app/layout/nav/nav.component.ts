import { Component, OnInit, Input } from '@angular/core';
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

  @Input() user: UserModel;
  supportedLanguages = SupportedLanguages;

  constructor(
    public authService: AuthService,
    private router: Router,
    public locale: LocaleService
  ) { }

  ngOnInit() {
    this.supportedLanguages = SupportedLanguages;

  }

  selectLanguage(language: string): void {
    this.locale.setCurrentLanguage(language);
  }

  logout() {
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['login']);
    }, (error) => {
      console.log('Logout error', error);
    });
  }
}
