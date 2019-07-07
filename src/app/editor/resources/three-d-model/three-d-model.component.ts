import { Component, OnInit, Input } from '@angular/core';
import { Language } from 'angular-l10n';
import { ProjectModel } from 'src/app/shared/project/project.model';
import { Observable } from 'rxjs';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PolyService } from 'src/app/shared/poly/poly.service';
import { Asset } from 'src/app/shared/poly/asset';
import { ResourceModel } from 'src/app/shared/resource/resource.model';
import { ResourceService } from 'src/app/shared/resource/resource.service';
import { ComponentService } from 'src/app/shared/component/component.service';

@Component({
  selector: 'app-three-d-model',
  templateUrl: './three-d-model.component.html',
  styles: []
})
export class ThreeDModelComponent implements OnInit {

  public static RESOURCE_TYPE = '3dmodel';

  @Language() lang: string;
  @Input() project: ProjectModel;

  threeDModels: Observable<ResourceModel[]>;

  showErrorMessage = false;

  // Search poly objects
  keywords: string;
  searchResult: Array<Asset>;
  showPlaceholderEmptySearch = true;

  // Add poly object resource
  addThreeDModelModalReference: NgbModalRef;
  newThreeDModel = new ResourceModel('', '', '', '', ThreeDModelComponent.RESOURCE_TYPE);

  constructor(
    private modalService: NgbModal,
    private resourceService: ResourceService,
    private componentService: ComponentService,
    private polyService: PolyService
    ) { }

  ngOnInit() {
    this.threeDModels = this.resourceService.getAllByType(this.project.id, ThreeDModelComponent.RESOURCE_TYPE);
  }

  searchKeywords() {
    // TODO: Show all pages
    this.newThreeDModel.id = null;
    this.polyService.listAssets({ keywords: this.keywords, format: 'OBJ', pageSize: '12' })
      .subscribe(
        res => {
          this.searchResult = res.assets;
          if (this.searchResult && this.searchResult.length !== 0) {
              this.showPlaceholderEmptySearch = false;
          } else {
              this.showPlaceholderEmptySearch = true;
          }
        },
        err => {
          // TODO: Show error message
          console.error('Error occurred with Poly Service');
        }
      );
  }

  openAddThreeDModelModal(content) {
    this.addThreeDModelModalReference = this.modalService.open(content);
  }

  addThreeDModel() {
    this.polyService.getAsset(this.newThreeDModel.content).subscribe(
      res => {
        this.newThreeDModel.thumbnail = res.thumbnail.url;
        this.resourceService.create(this.project.id, this.newThreeDModel);
        this.newThreeDModel = new ResourceModel('', '', '', '', ThreeDModelComponent.RESOURCE_TYPE);
        this.addThreeDModelModalReference.close();
      },
      err => {
        console.error('Couldn\'t get thumbnail for Poly object');
      }
    );
  }

  // TODO: Use the same method for delete markers and 3D models
  deleteThreeDModel(resourceId: string) {
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
