import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProjectDetailService } from '../project-detail/project-detail.service';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { ComponentModel } from './component.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  public static PATH = 'components';

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(projectId: string, component: ComponentModel): Promise<string> {
    component.id = this.db.createPushId();
    return new Promise<string>((resolve, reject) => {
      this.db.list<ComponentModel>(`${ProjectDetailService.PATH}/${projectId}/${ComponentService.PATH}`)
        .set(component.id, component).then(() => {
          resolve(component.id);
        })
        .catch( err => {
          reject();
        });
    });
  }

  getAll(projectId: string): Observable<ComponentModel[]> {
    return this.db.list<ComponentModel>(
      `${ProjectDetailService.PATH}/${projectId}/${ComponentService.PATH}`
    ).valueChanges();
  }

  getAllByType(projectId: string, componentType: string): Observable<ComponentModel[]> {
    return this.db.list<ComponentModel>(
      `${ProjectDetailService.PATH}/${projectId}/${ComponentService.PATH}`,
      ref => ref.orderByChild('type').equalTo(componentType)
    ).valueChanges();
  }

  updateWorkspace(projectId: string, componentId: string, workspace: string) {
    return this.db.object(`${ProjectDetailService.PATH}/${projectId}/${ComponentService.PATH}/${componentId}`).update({
      workspace
    });
  }

  updateConfiguration(projectId: string, componentId: string, configuration: string) {
    return this.db.object(`${ProjectDetailService.PATH}/${projectId}/${ComponentService.PATH}/${componentId}`).update({
      configuration
    });
  }

  delete(projectId: string, componentId: string): Promise<void> {
    return this.db.object(`${ProjectDetailService.PATH}/${projectId}/${ComponentService.PATH}/${componentId}`).remove();
  }

  isResourceUsedInComponent(projectId: string, resourceId: string): Observable<boolean> {
    return this.getAll(projectId).pipe(
      map(components => components.filter(c => c.inputs.some(r => r.id === resourceId)).length > 0),
      first()
    );
  }

  isResourceUsedInComponentByType(projectId: string, resourceId: string, resourceType: string): Observable<boolean> {
    return this.getAllByType(projectId, resourceType).pipe(
      map(components => components.filter(c => c.inputs.some(r => r.id === resourceId)).length > 0),
      first()
    );
  }
}
