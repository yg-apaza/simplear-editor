import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel } from '../shared/project/project.model';
import { BlocklyUtil } from './blockly-util';
import { EditComponentService } from '../shared/component/edit-component.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styles: []
})
export class EditorComponent implements OnInit {

  project = new ProjectModel('', '', '');
  blocklyUtil = new BlocklyUtil(this.editComponentService);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private editComponentService: EditComponentService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(routeData => {
      if (routeData.project) {
        this.project = routeData.project;
        this.initializeBlockly();
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

  initializeBlockly() {
    const blocklyArea = document.getElementById('blocklyArea');
    const blocklyDiv = document.getElementById('blocklyDiv');
    this.blocklyUtil.initialize(blocklyArea, blocklyDiv);
  }

}
