import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ResourceModel } from './resource.model';
import { map, first } from 'rxjs/operators';
import { ComponentModel } from './component.model';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  public static PATH = 'workspaces';
  public static RESOURCE_PATH = 'resources';
  public static COMPONENT_PATH = 'components';

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

  getResource(projectId: string, resourceId: string): Observable<ResourceModel> {
    return this.db.object<ResourceModel>(
      `${WorkspaceService.PATH}/${projectId}/${WorkspaceService.RESOURCE_PATH}/${resourceId}`
      ).valueChanges();
  }

  getAllResources(projectId: string): Observable<ResourceModel[]> {
    return this.db.list<ResourceModel>(
      `${WorkspaceService.PATH}/${projectId}/${WorkspaceService.RESOURCE_PATH}`
    ).valueChanges();
  }

  getAllResourcesByType(projectId: string, resourceType: string): Observable<ResourceModel[]> {
    return this.db.list<ResourceModel>(
      `${WorkspaceService.PATH}/${projectId}/${WorkspaceService.RESOURCE_PATH}`,
      ref => ref.orderByChild('type').equalTo(resourceType)
    ).valueChanges();
  }

  deleteResource(projectId: string, resourceId: string): Promise<void> {
    return this.db.object(`${WorkspaceService.PATH}/${projectId}/${WorkspaceService.RESOURCE_PATH}/${resourceId}`).remove();
  }

  isResourceNameTaken(projectId: string, resourceName: string): Observable<boolean> {
    return this.getAllResources(projectId).pipe(
      map(resources => resources.filter(r => r.name === resourceName).length > 0),
      first()
    );
  }

  isResourceContentTaken(projectId: string, resourceContent: string, resourceType: string): Observable<boolean> {
    return this.getAllResources(projectId).pipe(
      map(resources => resources.filter(r => (r.type === resourceType && r.content === resourceContent)).length > 0),
      first()
    );
  }

  isResourceUsedInComponent(projectId: string, resourceId: string): Observable<boolean> {
    return this.getAllComponents(projectId).pipe(
      map(components => components.filter(c => c.inputs.some(r => r.id === resourceId)).length > 0),
      first()
    );
  }

  isResourceUsedInComponentByType(projectId: string, resourceId: string, resourceType: string): Observable<boolean> {
    return this.getAllComponentsByType(projectId, resourceType).pipe(
      map(components => components.filter(c => c.inputs.some(r => r.id === resourceId)).length > 0),
      first()
    );
  }

  createComponent(projectId: string, component: ComponentModel): Promise<string> {
    component.id = this.db.createPushId();
    return new Promise<string>((resolve, reject) => {
      this.db.list<ComponentModel>(`${WorkspaceService.PATH}/${projectId}/${WorkspaceService.COMPONENT_PATH}`)
        .set(component.id, component).then(() => {
          resolve(component.id);
        })
        .catch( err => {
          reject();
        });
    });
  }

  getAllComponents(projectId: string): Observable<ComponentModel[]> {
    return this.db.list<ComponentModel>(
      `${WorkspaceService.PATH}/${projectId}/${WorkspaceService.COMPONENT_PATH}`
    ).valueChanges();
  }

  getAllComponentsByType(projectId: string, componentType: string): Observable<ComponentModel[]> {
    return this.db.list<ComponentModel>(
      `${WorkspaceService.PATH}/${projectId}/${WorkspaceService.COMPONENT_PATH}`,
      ref => ref.orderByChild('type').equalTo(componentType)
    ).valueChanges();
  }

  deleteComponent(projectId: string, componentId: string): Promise<void> {
    return this.db.object(`${WorkspaceService.PATH}/${projectId}/${WorkspaceService.COMPONENT_PATH}/${componentId}`).remove();
  }

}
