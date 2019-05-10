import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { L10nConfig, L10nLoader, TranslationModule, StorageStrategy, ProviderType, LogLevel } from 'angular-l10n';

const l10nConfig: L10nConfig = {
  logger: {
      level: LogLevel.Warn
  },
  locale: {
      languages: [
          { code: 'en', dir: 'ltr' },
          { code: 'es', dir: 'ltr' }
      ],
      language: 'en',
      storage: StorageStrategy.Cookie
  },
  translation: {
      providers: [
          { type: ProviderType.Static, prefix: './assets/locale/locale-' }
      ],
      caching: true,
      composedKeySeparator: '.',
      missingValue: 'No key'
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslationModule.forRoot(l10nConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
