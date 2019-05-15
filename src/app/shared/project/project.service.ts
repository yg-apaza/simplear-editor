import { Injectable } from '@angular/core';
import { ProjectModel } from './project.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from '../security/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectsPath: string;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) {
    this.authService.getCurrentUser()
    .then(user => {
      this.projectsPath  = `/projects/${user.uid}/`;
    }, err => {
      // TODO: Throw this error to GUI or component, no user logged
      console.log('Project service initialization error: ' + err);
    });
  }

  create(project: ProjectModel): string {
    project.id = this.db.createPushId();
    this.db.list(this.projectsPath).set(project.id, project);
    return project.id;
  }

  getAll(): Observable<ProjectModel[]> {
    return this.db.list<ProjectModel>(this.projectsPath, ref => ref.orderByKey()).valueChanges();
  }

  delete(id: string) {
    this.db.object(this.projectsPath + id).remove();
  }
}
