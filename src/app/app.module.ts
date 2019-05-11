import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { L10nConfig, L10nLoader, TranslationModule, StorageStrategy, ProviderType, LogLevel } from 'angular-l10n';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PageComponent } from './layout/page/page.component';
import { LoginComponent } from './login/login.component';

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
    AppComponent,
    NavComponent,
    FooterComponent,
    PageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    TranslationModule.forRoot(l10nConfig),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
