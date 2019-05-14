export class UserModel {

  uid: string;
  email: string;
  name: string;
  image: string;
  provider: string;

  constructor() {
    this.uid = '';
    this.email = '';
    this.name = '';
    this.image = '';
    this.provider = '';
  }

}
