import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModel } from '../shared/project/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styles: []
})
export class ProjectListComponent implements OnInit {

  @Language() lang: string;

  createProjectModalReference: NgbModalRef;
  newProject = new ProjectModel();

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  openModal(content) {
    this.createProjectModalReference = this.modalService.open(content);
  }

}
