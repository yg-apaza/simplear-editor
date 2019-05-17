import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectService } from '../shared/project/project.service';
import { ProjectModel } from '../shared/project/project.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class ProjectResolver implements Resolve<ProjectModel> {

  constructor(
    public projectService: ProjectService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ProjectModel> {
    return this.projectService.get(route.paramMap.get('id')).pipe(
      take(1)
    );
  }
}
