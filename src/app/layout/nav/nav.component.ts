import { Component, OnInit } from '@angular/core';
import { LocaleService, TranslationService, Language } from 'angular-l10n';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {

  constructor(
    public locale: LocaleService,
    public translation: TranslationService
  ) { }

  ngOnInit() {
  }

  selectLanguage(language: string): void {
    this.locale.setCurrentLanguage(language);
  }
}
