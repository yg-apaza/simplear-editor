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

  deleteWorkspace(projectId: string): Promise<void> {
    return this.db.object(`${WorkspaceService.PATH}/${projectId}`).remove();
  }

  createResource(projectId: string, resource: ResourceModel): Promise<string> {
    resource.id = this.db.createPushId();
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

  getAllResources(projectId: string): Observable<ResourceModel[]> {
    return this.db.list<ResourceModel>(
      `${WorkspaceService.PATH}/${projectId}/${WorkspaceService.RESOURCE_PATH}`
    ).valueChanges();
  }

  getAllResourcesByFilter(projectId: string, resourceType: string): Observable<ResourceModel[]> {
    return this.db.list<ResourceModel>(
      `${WorkspaceService.PATH}/${projectId}/${WorkspaceService.RESOURCE_PATH}`,
      ref => ref.orderByChild('type').equalTo(resourceType)
    ).valueChanges();
  }

  deleteResource(projectId: string, resourceId: string): Promise<void> {
    return this.db.object(`${WorkspaceService.PATH}/${projectId}/${WorkspaceService.RESOURCE_PATH}/${resourceId}`).remove();
  }

  isResourceNameTaken(projectId: string, name: string): Observable<boolean> {
    return this.getAllResources(projectId).pipe(
      map(resources => resources.filter(r => r.name === name).length > 0)
    );
  }

  isResourceContentTaken(projectId: string, content: string, type: string): Observable<boolean> {
    return this.getAllResources(projectId).pipe(
      map(resources => resources.filter(r => (r.type === type && r.content === content)).length > 0)
    );
  }
}
