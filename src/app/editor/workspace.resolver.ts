import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { WorkspaceService } from '../shared/workspace/workspace.service';
import { WorkspaceModel } from '../shared/workspace/workspace.model';

@Injectable()
export class WorkspaceResolver implements Resolve<WorkspaceModel> {

  constructor(
    public workspaceService: WorkspaceService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<WorkspaceModel> {
    return of(new WorkspaceModel());
  }
}
