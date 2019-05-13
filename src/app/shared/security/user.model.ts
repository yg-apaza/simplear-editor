export class UserModel {

  email: string;
  name: string;
  image: string;
  provider: string;

  constructor() {
    this.email = '';
    this.name = '';
    this.image = '';
    this.provider = '';
  }

}
