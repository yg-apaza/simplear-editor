import { Component, OnInit, Renderer2, Inject, OnDestroy } from '@angular/core';
import { LocaleService } from 'angular-l10n';
import { AuthService } from 'src/app/shared/security/auth.service';
import { UserModel } from 'src/app/shared/security/user.model';
import SupportedLanguages from './supported-languages';
import { Router, NavigationEnd, Event } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit, OnDestroy {

  user: UserModel;
  supportedLanguages = SupportedLanguages;
  navigationSubscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    public locale: LocaleService,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private document
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.navigationSubscription = this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.supportedLanguages = SupportedLanguages;
    this.renderBlocklyLanguageScript();
  }

  // TODO: Find a better way to change Blockly language
  renderBlocklyLanguageScript() {
    const s = this.renderer2.createElement('script');
    s.id = 'blockly-lang-script';
    s.type = 'text/javascript';
    s.src = 'assets/google-blockly/msg/js/' + this.locale.getCurrentLanguage() + '.js';
    s.text = '';
    this.renderer2.appendChild(this.document.body, s);
  }

  selectLanguage(language: string) {
    this.locale.setCurrentLanguage(language);
    // TODO: Re-load current page only if a Blockly workspace is used
    this.router.navigate([this.router.url]);
  }

  logout() {
    this.authService.doLogout()
      .then(() => this.router.navigate(['login']))
      .catch( err => {
        console.error('Couldn\'t logout user');
      });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
