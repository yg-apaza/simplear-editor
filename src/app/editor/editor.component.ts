import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel } from '../shared/project/project.model';
import { EditComponentService } from '../shared/component/edit-component.service';
import { ComponentModel } from '../shared/component/component.model';
import { BlocklyUtil } from './blockly-util';
import { ComponentService } from '../shared/component/component.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var Blockly: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styles: []
})
export class EditorComponent implements OnInit, AfterViewInit {

  project = new ProjectModel('', '', '');
  selectedComponent: ComponentModel;
  currentWorkspace: any;
  componentConfigurationStatus = 'EMPTY';
  previewKeyModalReference: NgbModalRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private editComponentService: EditComponentService,
    private componentService: ComponentService,
    private modalService: NgbModal
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

  ngAfterViewInit() {
    const blocklyArea = document.getElementById('blocklyArea');
    const blocklyDiv = document.getElementById('blocklyDiv');

    BlocklyUtil.addBlocks();
    this.updateBlocklyWorkspaceForComponent(blocklyDiv, 'empty');

    const onresize = () => {
      blocklyDiv.style.left = '0px';
      blocklyDiv.style.top = '0px';
      blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
      blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
      Blockly.svgResize(this.currentWorkspace);
    };

    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(this.currentWorkspace);

    this.editComponentService.currentComponent.subscribe(newComponent => {
      this.currentWorkspace.dispose();
      if (newComponent) {
        this.updateBlocklyWorkspaceForComponent(blocklyDiv, newComponent.type);
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(newComponent.workspace), this.currentWorkspace);
        // Check configuration for the first time
        const code = `{${Blockly.ar.workspaceToCode(Blockly.mainWorkspace).slice(0, -1)}}`;
        this.isValidConfiguration(code);
      } else {
        this.updateBlocklyWorkspaceForComponent(blocklyDiv, 'empty');
        this.componentConfigurationStatus = 'EMPTY';
      }
      this.selectedComponent = newComponent;
    });
  }

  updateBlocklyWorkspaceForComponent(blocklyDiv: HTMLElement, componentType: string) {
    // TODO: Fix shadow DOM error. See https://github.com/google/blockly/issues/1114
    this.currentWorkspace = Blockly.inject(
      blocklyDiv,
      {
        toolbox: BlocklyUtil.generateToolboxForComponent(componentType),
        horizontalLayout: true,
        maxBlocks: Infinity,
        maxInstances: {
          event_touch_resource: 1
        },
        grid : {
          spacing : 20,
          length : 1,
          colour : '#888',
          snap : false
        },
        zoom : {
          controls : true,
          wheel : true,
          startScale : 0.9,
          maxScale : 3,
          minScale : 0.5,
          scaleSpeed : 1.2
        }
      }
    );

    this.currentWorkspace.addChangeListener(event => {
      if (
        event.type === Blockly.Events.CREATE ||
        event.type === Blockly.Events.DELETE ||
        event.type === Blockly.Events.MOVE ||
        event.type === Blockly.Events.CHANGE ) {
        // Auto-save for every change detected
        /// Get workspace
        const xmlWorkspace = Blockly.Xml.workspaceToDom(this.currentWorkspace);
        const stringXmlWorkspace = Blockly.Xml.domToPrettyText(xmlWorkspace);
        this.componentService.updateWorkspace(this.project.id, this.selectedComponent.id, stringXmlWorkspace);
        /// Get generated code
        const code = `{${Blockly.ar.workspaceToCode(Blockly.mainWorkspace).slice(0, -1)}}`;
        if (this.isValidConfiguration(code)) {
          this.componentService.updateConfiguration(this.project.id, this.selectedComponent.id, code);
        }
      }
    });
  }

  private isValidConfiguration(configuration: string): boolean {
    try {
      JSON.parse(configuration);
      this.componentConfigurationStatus = 'VALID';
      return true;
    } catch (e) {
      this.componentConfigurationStatus = 'INVALID';
      return false;
    }
  }

  openPreviewKeyModal(content) {
    this.previewKeyModalReference = this.modalService.open(content);
  }

}
