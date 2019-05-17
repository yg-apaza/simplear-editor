import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  newProject = new ProjectModel('', '', '');

  projects: ProjectModel[];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.projectService.getAll().subscribe(projects => {
      this.projects = projects;
    }, err => {
      // TODO: Show error on UI
      console.error('Couldn\'t get projects');
    });
  }

  openModal(content) {
    this.createProjectModalReference = this.modalService.open(content);
  }

  // TODO: Avoid blank title
  createProject() {
    this.projectService.create(this.newProject)
      .then(projectId => {
        this.createProjectModalReference.close();
        this.router.navigate(['/edit', projectId]);
      }).catch(err => {
        // TODO: Show to UI
        console.error('Couldn\'t create new project');
      });
  }

  deleteProject(projectId: string) {
    this.projectService.delete(projectId)
      .then(() => {
        this.projects.filter(project => project.id !== projectId);
      })
      .catch(err => {
        console.error('Couldn\'t delete project %s', projectId);
      });
  }

}
