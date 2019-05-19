import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import AvailableMarkers from './available-markers';
import { Language } from 'angular-l10n';
import { ResourceModel } from 'src/app/shared/resource/resource.model';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styles: []
})
export class MarkerComponent implements OnInit {

  public static TYPE_NAME = 'marker';

  @Language() lang: string;

  // Add predefined marker resource
  addMarkerModalReference: NgbModalRef;
  availableMarkers = AvailableMarkers;
  newMarker = new ResourceModel('', '', MarkerComponent.TYPE_NAME);

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  openAddMarkerModal(content) {
    this.addMarkerModalReference = this.modalService.open(content);
  }

  addMarker() {
    /*this.db.list(`resources/${this.project.id}/`).set(id, newPredefinedNaturalMarker);
    this.db.list(`/previews/${this.previewKey}/resources/`).set(id, false);
    this.predefinedNaturalMarkerResources.push(this.availablePredefinedNaturalMarkers[this.selectedPredefinedNaturalMarker].path);
    this.predefinedNaturalMarkerResourcesIds.push(id);
    this.resources[content] = newPredefinedNaturalMarker;
    */
    this.newMarker = new ResourceModel('', '', MarkerComponent.TYPE_NAME);
    this.addMarkerModalReference.close();
  }

}
