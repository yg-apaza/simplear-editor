import { Component, OnInit, Input } from '@angular/core';
import { Language } from 'angular-l10n';
import { ProjectModel } from 'src/app/shared/project/project.model';
import { Observable } from 'rxjs';
import { ResourceModel } from 'src/app/shared/workspace/resource.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkspaceService } from 'src/app/shared/workspace/workspace.service';
import { PolyService } from 'src/app/shared/poly/poly.service';
import { Asset } from 'src/app/shared/poly/asset';

@Component({
  selector: 'app-poly-object',
  templateUrl: './poly-object.component.html',
  styles: []
})
export class PolyObjectComponent implements OnInit {

  public static RESOURCE_TYPE = 'poly';

  @Language() lang: string;
  @Input() project: ProjectModel;

  polyObjects: Observable<ResourceModel[]>;

  // Search poly objects
  keywords: string;
  searchResult: Array<Asset>;
  showPlaceholderEmptySearch = true;

  // Add poly object resource
  addPolyObjectModalReference: NgbModalRef;
  newPolyObject = new ResourceModel('', '', PolyObjectComponent.RESOURCE_TYPE);

  constructor(
    private modalService: NgbModal,
    private workspaceService: WorkspaceService,
    private polyService: PolyService
    ) { }

  ngOnInit() {
    this.polyObjects = this.workspaceService.getAllResourcesByFilter(this.project.id, PolyObjectComponent.RESOURCE_TYPE);
  }

  searchKeywords() {
    // TODO: Show all pages
    this.newPolyObject.id = null;
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
          console.log('Error occurred with Poly Service');
        }
      );
  }

  openAddPolyObjectModal(content) {
    this.addPolyObjectModalReference = this.modalService.open(content);
  }

  addPolyObject() {
    this.workspaceService.createResource(this.project.id, this.newPolyObject);
    this.newPolyObject = new ResourceModel('', '', PolyObjectComponent.RESOURCE_TYPE);
    this.addPolyObjectModalReference.close();
  }

}
