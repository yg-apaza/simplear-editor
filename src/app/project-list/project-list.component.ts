import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Language } from 'angular-l10n';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModel } from '../shared/project/project.model';
import { ProjectService } from '../shared/project/project.service';

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
    private projectService: ProjectService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() { }

  openModal(content) {
    this.createProjectModalReference = this.modalService.open(content);
  }

  // TODO: Avoid blank title
  createProject() {
    const id = this.projectService.create(this.newProject);
    console.log(id);
    if (id) {
      this.createProjectModalReference.close();
      this.router.navigate(['/edit', id]);
    } else {
      // TODO: No se pudo crear el projecto
      console.log('Create project error');
    }
  }

  removeProject(projectId) {

  }

}
