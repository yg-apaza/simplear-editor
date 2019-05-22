export class ResourceModel {

  id: string;
  name: string;
  content: string;
  thumbnail: string;
  type: string;

  constructor(id: string, name: string, content: string, thumbnail: string, type: string) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.thumbnail = thumbnail;
    this.type = type;
  }

}
