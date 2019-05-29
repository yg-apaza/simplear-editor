import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Language } from 'angular-l10n';
import { ProjectModel } from 'src/app/shared/project/project.model';
import { Observable } from 'rxjs';
import AvailableMarkers from './available-markers';
import Category from './category';
import { ResourceModel } from 'src/app/shared/resource/resource.model';
import { ResourceService } from 'src/app/shared/resource/resource.service';
import { ComponentService } from 'src/app/shared/component/component.service';

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

  showErrorMessage = false;

  // Add marker resource
  addMarkerModalReference: NgbModalRef;
  newMarker = new ResourceModel('', '', '', '', MarkerComponent.RESOURCE_TYPE);
  availableMarkers = AvailableMarkers;
  category = Category;

  constructor(
    private modalService: NgbModal,
    private resourceService: ResourceService,
    private componentService: ComponentService
  ) { }

  ngOnInit() {
    this.markers = this.resourceService.getAllByType(this.project.id, MarkerComponent.RESOURCE_TYPE);
  }

  openAddMarkerModal(content) {
    this.addMarkerModalReference = this.modalService.open(content);
  }

  addMarker() {
    this.newMarker.thumbnail = this.availableMarkers[this.newMarker.content].path;
    this.resourceService.create(this.project.id, this.newMarker);
    this.newMarker = new ResourceModel('', '', '', '', MarkerComponent.RESOURCE_TYPE);
    this.addMarkerModalReference.close();
  }

  // TODO: Use the same method for delete marker and poly object
  deleteMarker(resourceId: string) {
    this.componentService.isResourceUsedInComponent(this.project.id, resourceId).subscribe(
      isUsed => {
        if (!isUsed) {
          this.resourceService.delete(this.project.id, resourceId);
        } else {
          this.showErrorMessage = true;
        }
      }
    );
  }

}
