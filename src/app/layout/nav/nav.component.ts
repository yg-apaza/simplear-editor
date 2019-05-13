import { Component, OnInit, Input } from '@angular/core';
import { LocaleService } from 'angular-l10n';
import { AuthService } from 'src/app/shared/security/auth.service';
import { Location } from '@angular/common';
import { UserModel } from 'src/app/shared/security/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {

  @Input() user: UserModel;

  constructor(
    public authService: AuthService,
    private location: Location,
    public locale: LocaleService
  ) { }

  ngOnInit() {
  }

  selectLanguage(language: string): void {
    this.locale.setCurrentLanguage(language);
  }

  logout() {
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log('Logout error', error);
    });
  }
}
