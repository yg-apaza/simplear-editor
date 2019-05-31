import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentModel } from './component.model';

@Injectable({
  providedIn: 'root'
})
export class EditComponentService {
  private componentSource = new Subject<ComponentModel>();
  currentComponent = this.componentSource.asObservable();

  constructor() { }

  editComponent(component: ComponentModel) {
    this.componentSource.next(component);
  }
}
