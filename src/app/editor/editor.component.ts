import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel } from '../shared/project/project.model';
import { Observable } from 'rxjs';
import { ResourceModel } from '../shared/workspace/resource.model';
import { WorkspaceService } from '../shared/workspace/workspace.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styles: []
})
export class EditorComponent implements OnInit {

  project = new ProjectModel('', '', '');
  resources: Observable<ResourceModel[]>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workspaceService: WorkspaceService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(routeData => {
      if (routeData.project) {
        this.project = routeData.project;
        this.resources = this.workspaceService.getAllResources(this.project.id);
      } else {
        // TODO: Update when resolvers can handle errors
        console.error('Can\'t load this project');
        this.router.navigate(['projects']);
      }
    }, err => {
      // TODO: Show to UI and stop everything
      console.error('Can\'t load this project');
    });
  }

}
