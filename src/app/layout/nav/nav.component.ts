import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { LocaleService } from 'angular-l10n';
import { AuthService } from 'src/app/shared/security/auth.service';
import { UserModel } from 'src/app/shared/security/user.model';
import SupportedLanguages from './supported-languages';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

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
    public locale: LocaleService,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private document
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.supportedLanguages = SupportedLanguages;
    this.renderBlocklyLanguageScript();
  }

  renderBlocklyLanguageScript() {
    this.renderer2.appendChild(this.document.body, this.getBlocklyScriptElement());
  }

  // TODO: Find a better way to change Blockly language
  getBlocklyScriptElement() {
    const s = this.renderer2.createElement('script');
    s.id = 'blockly-lang-script';
    s.type = 'text/javascript';
    s.src = 'assets/google-blockly/msg/js/' + this.locale.getCurrentLanguage() + '.js';
    s.text = '';
    return s;
  }

  selectLanguage(language: string) {
    this.locale.setCurrentLanguage(language);
    document.getElementById('blockly-lang-script').remove();
    this.renderBlocklyLanguageScript();
  }

  logout() {
    this.authService.doLogout()
      .then(() => this.router.navigate(['login']))
      .catch( err => {
        console.error('Couldn\'t logout user');
      });
  }
}
