import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import AvailableMarkers from './available-markers';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styles: []
})
export class MarkerComponent implements OnInit {

  @Language() lang: string;

  // Add predefined marker resource
  addMarkerModalReference: NgbModalRef;
  availableMarkers = AvailableMarkers;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    console.log(this.availableMarkers[0]);
  }

  openAddMarkerModal(content) {
    this.addMarkerModalReference = this.modalService.open(content);
  }

}
