import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ResourceModel } from './resource.model';
import { ProjectDetailService } from '../project-detail/project-detail.service';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  public static PATH = 'resources';

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(projectId: string, resource: ResourceModel): Promise<string> {
    resource.id = this.db.createPushId();
    return new Promise<string>((resolve, reject) => {
      this.db.list<ResourceModel>(`${ProjectDetailService.PATH}/${projectId}/${ResourceService.PATH}`)
        .set(resource.id, resource).then(() => {
          resolve(resource.id);
        })
        .catch( err => {
          reject();
        });
    });
  }

  get(projectId: string, resourceId: string): Observable<ResourceModel> {
    return this.db.object<ResourceModel>(
      `${ProjectDetailService.PATH}/${projectId}/${ResourceService.PATH}/${resourceId}`
      ).valueChanges();
  }

  getAll(projectId: string): Observable<ResourceModel[]> {
    return this.db.list<ResourceModel>(
      `${ProjectDetailService.PATH}/${projectId}/${ResourceService.PATH}`
    ).valueChanges();
  }

  getAllByType(projectId: string, resourceType: string): Observable<ResourceModel[]> {
    return this.db.list<ResourceModel>(
      `${ProjectDetailService.PATH}/${projectId}/${ResourceService.PATH}`,
      ref => ref.orderByChild('type').equalTo(resourceType)
    ).valueChanges();
  }

  delete(projectId: string, resourceId: string): Promise<void> {
    return this.db.object(`${ProjectDetailService.PATH}/${projectId}/${ResourceService.PATH}/${resourceId}`).remove();
  }

  isResourceNameTaken(projectId: string, resourceName: string): Observable<boolean> {
    return this.getAll(projectId).pipe(
      map(resources => resources.filter(r => r.name === resourceName).length > 0),
      first()
    );
  }

  isResourceContentTaken(projectId: string, resourceContent: string, resourceType: string): Observable<boolean> {
    return this.getAll(projectId).pipe(
      map(resources => resources.filter(r => (r.type === resourceType && r.content === resourceContent)).length > 0),
      first()
    );
  }
}
