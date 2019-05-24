import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel } from '../shared/project/project.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styles: []
})
export class EditorComponent implements OnInit {

  project = new ProjectModel('', '', '');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(routeData => {
      if (routeData.project) {
        this.project = routeData.project;
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
