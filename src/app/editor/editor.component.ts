import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel } from '../shared/project/project.model';

declare var Blockly: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styles: []
})
export class EditorComponent implements OnInit {

  project = new ProjectModel('', '', '');
  componentSelected: string;

  toolbox = `
    <xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
      <category name="Events">
        <block type="marker_is_detected">
          <field name="MARKER_NAME">MARKER</field>
        </block>
        <block type="resource_is_selected">
          <field name="RESOURCE_NAME">RESOURCE</field>
        </block>
      </category>
      <category name="Actions">
        <block type="augment_resource">
          <field name="RESOURCE_NAME">RESOURCE</field>
        </block>
        <block type="rotate_resource">
          <field name="RESOURCE_NAME">RESOURCE</field>
        </block>
      </category>
    </xml>`;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(routeData => {
      if (routeData.project) {
        this.project = routeData.project;
        this.startBlockly();
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

  startBlockly() {
    const blocklyArea = document.getElementById('blocklyArea');
    const blocklyDiv = document.getElementById('blocklyDiv');
    const workspace = Blockly.inject(blocklyDiv, { toolbox: this.toolbox });
    const onresize = () => {
      blocklyDiv.style.left = '0px';
      blocklyDiv.style.top = '0px';
      blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
      blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
      Blockly.svgResize(workspace);
    };
    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(workspace);
  }

}
