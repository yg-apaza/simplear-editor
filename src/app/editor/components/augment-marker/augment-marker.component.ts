import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModel } from 'src/app/shared/project/project.model';
import { Observable } from 'rxjs';
import { ResourceModel } from 'src/app/shared/workspace/resource.model';
import { ComponentModel } from 'src/app/shared/workspace/component.model';
import { WorkspaceService } from 'src/app/shared/workspace/workspace.service';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-augment-marker',
  templateUrl: './augment-marker.component.html',
  styles: []
})
export class AugmentMarkerComponent implements OnInit {

  public static COMPONENT_TYPE = 'augment_marker';

  @Language() lang: string;
  @Input() project: ProjectModel;
  @Input() componentSelected: string;

  resources: Observable<ResourceModel[]>;
  components: Observable<ComponentModel[]>;

  selectedComponent: ComponentModel;

  newMarker = new ResourceModel('', '', '', '', '');
  newResource = new ResourceModel('', '', '', '', '');

  // Add augment marker component
  addAugmentMarkerModalReference: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private workspaceService: WorkspaceService
  ) { }

  ngOnInit() {
    this.resources = this.workspaceService.getAllResources(this.project.id);
    this.components = this.workspaceService.getAllComponentsByType(this.project.id, AugmentMarkerComponent.COMPONENT_TYPE);
  }

  openAddAugmentMarkerModal(content) {
    this.addAugmentMarkerModalReference = this.modalService.open(content);
  }

  addAugmentMarker() {
    this.workspaceService.createComponent(
      this.project.id,
      new ComponentModel(
        '',
        [this.newResource, this.newMarker],
        AugmentMarkerComponent.COMPONENT_TYPE
      )
    );
    this.addAugmentMarkerModalReference.close();
  }

  equalResources(r1: ResourceModel, r2: ResourceModel) {
    return r1.name === r2.name && r1.content === r2.content;
  }

  // TODO: Use the same method for deleting components
  deleteAugmentMarker(componentId: string) {
    this.workspaceService.deleteComponent(this.project.id, componentId);
  }

  selectComponent(componentId: string) {
    this.componentSelected = componentId;
  }

}
