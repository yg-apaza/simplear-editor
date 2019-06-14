import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './layout/page/page.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { EditorComponent } from './editor/editor.component';
import { GuestGuard } from './shared/security/guest.guard';
import { LoggedInGuard } from './shared/security/logged-in.guard';
import { ProjectResolver } from './editor/project.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: '',
    component: PageComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: 'projects',
        component: ProjectListComponent
      },
      {
        path: 'edit/:id',
        component: EditorComponent,
        resolve: {
          project: ProjectResolver
        }
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
