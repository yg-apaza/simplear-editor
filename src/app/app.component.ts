import { Component } from '@angular/core';
import { LocaleService, TranslationService, Language } from 'angular-l10n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public locale: LocaleService,
    public translation: TranslationService
  ) { }

  selectLanguage(language: string): void {
    this.locale.setCurrentLanguage(language);
  }

}
