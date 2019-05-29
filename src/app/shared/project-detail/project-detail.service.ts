import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailService {

  public static PATH = 'details';

  constructor(
    private db: AngularFireDatabase
  ) { }

  delete(projectId: string): Promise<void> {
    return this.db.object(`${ProjectDetailService.PATH}/${projectId}`).remove();
  }
}
