import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  public static PATH = 'workspaces';

  constructor(
    private db: AngularFireDatabase
  ) { }

  deleteWorkspace(projectId: string): Promise<void> {
    return this.db.object(`${WorkspaceService.PATH}/${projectId}`).remove();
  }
}
