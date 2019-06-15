import { ResourceModel } from '../resource/resource.model';

export class ComponentModel {

  id: string;
  inputs: ResourceModel[];
  workspace: string;
  configuration: string;
  type: string;

  constructor(id: string, inputs: ResourceModel[], workspace: string, configuration: string, type: string) {
    this.id = id;
    this.inputs = inputs;
    this.workspace = workspace;
    this.configuration = configuration;
    this.type = type;
  }

}
