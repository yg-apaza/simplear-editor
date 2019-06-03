import { ResourceModel } from '../resource/resource.model';

export class ComponentModel {

  id: string;
  inputs: ResourceModel[];
  workspace: string;
  type: string;

  constructor(id: string, inputs: ResourceModel[], workspace: string, type: string) {
    this.id = id;
    this.inputs = inputs;
    this.workspace = workspace;
    this.type = type;
  }

}
