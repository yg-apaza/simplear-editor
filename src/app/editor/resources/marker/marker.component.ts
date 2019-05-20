import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Language } from 'angular-l10n';
import { ResourceModel } from 'src/app/shared/workspace/resource.model';
import { WorkspaceService } from 'src/app/shared/workspace/workspace.service';
import { ProjectModel } from 'src/app/shared/project/project.model';
import { Observable } from 'rxjs';
import AvailableMarkers from './available-markers';
import Category from './category';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styles: []
})
export class MarkerComponent implements OnInit {

  public static TYPE_NAME = 'marker';

  @Language() lang: string;
  @Input() project: ProjectModel;

  // Add predefined marker resource
  addMarkerModalReference: NgbModalRef;
  newMarker = new ResourceModel('', '', MarkerComponent.TYPE_NAME);
  availableMarkers = AvailableMarkers;
  category = Category;
  markers: Observable<ResourceModel[]>;

  constructor(
    private modalService: NgbModal,
    private workspaceService: WorkspaceService
  ) { }

  ngOnInit() {
    this.markers = this.workspaceService.getAllResources(this.project.id);
  }

  openAddMarkerModal(content) {
    this.addMarkerModalReference = this.modalService.open(content);
  }

  addMarker() {
    this.workspaceService.createResource(this.project.id, this.newMarker);
    this.newMarker = new ResourceModel('', '', MarkerComponent.TYPE_NAME);
    this.addMarkerModalReference.close();
  }

}
