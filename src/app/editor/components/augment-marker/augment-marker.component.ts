import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModel } from 'src/app/shared/project/project.model';
import { Observable } from 'rxjs';
import { ComponentModel } from 'src/app/shared/component/component.model';
import { Language } from 'angular-l10n';
import { ResourceModel } from 'src/app/shared/resource/resource.model';
import { ComponentService } from 'src/app/shared/component/component.service';
import { ResourceService } from 'src/app/shared/resource/resource.service';
import { EditComponentService } from 'src/app/shared/component/edit-component.service';

@Component({
  selector: 'app-augment-marker',
  templateUrl: './augment-marker.component.html',
  styles: []
})
export class AugmentMarkerComponent implements OnInit {

  public static COMPONENT_TYPE = 'augment_marker';

  @Language() lang: string;
  @Input() project: ProjectModel;
  selectedComponent: ComponentModel;

  resources: Observable<ResourceModel[]>;
  components: Observable<ComponentModel[]>;

  newMarker = new ResourceModel('', '', '', '', '');
  newResource = new ResourceModel('', '', '', '', '');

  // Add augment marker component
  addAugmentMarkerModalReference: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private resourceService: ResourceService,
    private componentService: ComponentService,
    private editComponentService: EditComponentService
  ) { }

  ngOnInit() {
    this.resources = this.resourceService.getAll(this.project.id);
    this.components = this.componentService.getAllByType(this.project.id, AugmentMarkerComponent.COMPONENT_TYPE);
    this.editComponentService.currentComponent.subscribe(component => this.selectedComponent = component);
  }

  openAddAugmentMarkerModal(content) {
    this.addAugmentMarkerModalReference = this.modalService.open(content);
  }

  addAugmentMarker() {
    this.componentService.create(
      this.project.id,
      new ComponentModel(
        '',
        [this.newResource, this.newMarker],
        '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',
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
    this.componentService.delete(this.project.id, componentId);
    this.editComponentService.editComponent(null);
  }

  selectComponent(component: ComponentModel) {
    console.log('Select component' + JSON.stringify(component));
    this.editComponentService.editComponent(component);
    // TODO: Dispose workspace after deleting component
    // TODO: Update current component to null
  }

}
