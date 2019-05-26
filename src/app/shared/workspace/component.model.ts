import { ResourceModel } from './resource.model';

export class ComponentModel {

  id: string;
  inputs: ResourceModel[];
  type: string;

  constructor(id: string, inputs: ResourceModel[], type: string) {
    this.id = id;
    this.inputs = inputs;
    this.type = type;
  }

}
