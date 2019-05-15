import { Injectable } from '@angular/core';
import { ProjectModel } from './project.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from '../security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectsRef: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) {
    this.authService.getCurrentUser()
    .then(user => {
      this.projectsRef = this.db.list(`/projects/${user.uid}`);
    }, err => {
      // TODO: Throw this error to GUI or component
      console.log('Project service initialization error: ' + err);
    });
  }

  create(project: ProjectModel): string {
    return this.projectsRef.push(project).key;
  }
}
