import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { L10nConfig, L10nLoader, TranslationModule, StorageStrategy, ProviderType, LogLevel } from 'angular-l10n';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PageComponent } from './layout/page/page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { EditorComponent } from './editor/editor.component';
import { FormsModule } from '@angular/forms';
import { ProjectResolver } from './editor/project.resolver';
import { MarkerComponent } from './editor/resources/marker/marker.component';
import { UniqueResourceNameValidator } from './editor/resources/unique-resource-name-validator.directive';
import { ThreeDModelComponent } from './editor/resources/three-d-model/three-d-model.component';
import { UniqueMarkerValidator } from './editor/resources/marker/unique-marker-validator.directive';
import { AugmentMarkerComponent } from './editor/components/augment-marker/augment-marker.component';
import { ResourceExistsValidator } from './editor/components/augment-marker/resource-exists-validator.directive';
import { ResourceUsedAugmentMarkerValidator } from './editor/components/augment-marker/resource-used-augment-marker-validator.directive';

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
    LoginComponent,
    PageNotFoundComponent,
    ProjectListComponent,
    EditorComponent,
    MarkerComponent,
    ThreeDModelComponent,
    UniqueResourceNameValidator,
    UniqueMarkerValidator,
    AugmentMarkerComponent,
    ResourceExistsValidator,
    ResourceUsedAugmentMarkerValidator
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    TranslationModule.forRoot(l10nConfig),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    ProjectResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
