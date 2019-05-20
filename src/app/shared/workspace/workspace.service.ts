import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ResourceModel } from './resource.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  public static PATH = 'workspaces';
  public static RESOURCE_PATH = 'resources';

  constructor(
    private db: AngularFireDatabase
  ) { }

  createResource(projectId: string, resource: ResourceModel): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.db.list<ResourceModel>(`${WorkspaceService.PATH}/${projectId}/${WorkspaceService.RESOURCE_PATH}`)
        .set(resource.id, resource).then(() => {
          resolve(resource.id);
        })
        .catch( err => {
          reject();
        });
    });
  }

  getAllResources(projectId: string, resourceType: string): Observable<ResourceModel[]> {
    return this.db.list<ResourceModel>(
      `${WorkspaceService.PATH}/${projectId}/${WorkspaceService.RESOURCE_PATH}`,
      ref => ref.orderByKey()
    ).valueChanges();
  }

  deleteResource(projectId: string, resourceId: string): Promise<void> {
    return this.db.object(`${WorkspaceService.PATH}/${projectId}/${WorkspaceService.RESOURCE_PATH}/${resourceId}`).remove();
  }

  isResourceNameTaken(projectId: string, name: string): Observable<boolean> {
    return this.getAllResources(projectId).pipe(
      map(resources => resources.filter(r => r.name === name).length > 0),
    );
  }
}
