import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModel } from 'src/app/shared/project/project.model';
import { Observable } from 'rxjs';
import { ResourceModel } from 'src/app/shared/workspace/resource.model';
import { ComponentModel } from 'src/app/shared/workspace/component.model';
import { WorkspaceService } from 'src/app/shared/workspace/workspace.service';

@Component({
  selector: 'app-augment-marker',
  templateUrl: './augment-marker.component.html',
  styles: []
})
export class AugmentMarkerComponent implements OnInit {

  public static COMPONENT_TYPE = 'augment_marker';

  @Input() project: ProjectModel;
  @Input() resources: Observable<ResourceModel[]>;

  newMarker = new ResourceModel('', '', '', '', '');
  newResource = new ResourceModel('', '', '', '', '');

  // Add augment marker component
  addAugmentMarkerModalReference: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private workspaceService: WorkspaceService
  ) { }

  ngOnInit() {}

  openAddAugmentMarkerModal(content) {
    this.addAugmentMarkerModalReference = this.modalService.open(content);
  }

  addAugmentMarker() {
    this.workspaceService.createComponent(
      this.project.id,
      new ComponentModel('', [this.newResource.name, this.newMarker.name], AugmentMarkerComponent.COMPONENT_TYPE)
    );
    this.addAugmentMarkerModalReference.close();
  }

  equalResources(r1: ResourceModel, r2: ResourceModel) {
    return r1.name === r2.name;
  }

}
