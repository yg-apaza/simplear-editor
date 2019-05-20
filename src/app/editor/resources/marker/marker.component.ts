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

  public static RESOURCE_TYPE = 'marker';

  @Language() lang: string;
  @Input() project: ProjectModel;

  markers: Observable<ResourceModel[]>;

  // Add marker resource
  addMarkerModalReference: NgbModalRef;
  newMarker = new ResourceModel('', '', MarkerComponent.RESOURCE_TYPE);
  availableMarkers = AvailableMarkers;
  category = Category;

  constructor(
    private modalService: NgbModal,
    private workspaceService: WorkspaceService
  ) { }

  ngOnInit() {
    this.markers = this.workspaceService.getAllResourcesByFilter(this.project.id, MarkerComponent.RESOURCE_TYPE);
  }

  openAddMarkerModal(content) {
    this.addMarkerModalReference = this.modalService.open(content);
  }

  addMarker() {
    this.workspaceService.createResource(this.project.id, this.newMarker);
    this.newMarker = new ResourceModel('', '', MarkerComponent.RESOURCE_TYPE);
    this.addMarkerModalReference.close();
  }

  deleteMarker(resourceId: string) {
    this.workspaceService.deleteResource(this.project.id, resourceId);
  }

}
