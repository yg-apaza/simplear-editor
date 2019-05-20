import { Injectable } from '@angular/core';
import { ProjectModel } from './project.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../security/auth.service';
import { Observable } from 'rxjs';
import { switchMap, flatMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public static PATH = 'projects';

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) { }

  create(project: ProjectModel): Promise<string> {
    project.id = this.db.createPushId();
    return new Promise<string>((resolve, reject) => {
      this.authService.getCurrentUser().subscribe(user => {
        this.db.list<ProjectModel>(`${ProjectService.PATH}/${user.uid}`)
          .set(project.id, project).then(() => {
            resolve(project.id);
          })
          .catch( err => {
            reject();
          });
      });
    });
  }

  get(projectId: string): Observable<ProjectModel> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => this.db.object<ProjectModel>(`${ProjectService.PATH}/${user.uid}/${projectId}`).valueChanges())
    );
  }

  getAll(): Observable<ProjectModel[]> {
    return this.authService.getCurrentUser().pipe(
      filter(user => user ? true : false),
      switchMap(user => this.db.list<ProjectModel>(`${ProjectService.PATH}/${user.uid}`, ref => ref.orderByKey()).valueChanges())
    );
  }

  delete(projectId: string): Promise<void> {
    return this.authService.getCurrentUser().pipe(
      flatMap(user => this.db.object(`${ProjectService.PATH}/${user.uid}/${projectId}`).remove())
    ).toPromise();
  }
}
