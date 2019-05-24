export class ComponentModel {

  id: string;
  inputs: string[];
  type: string;

  constructor(id: string, inputs: string[], type: string) {
    this.id = id;
    this.inputs = inputs;
    this.type = type;
  }

}
