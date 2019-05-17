export class UserModel {

  uid: string;
  email: string;
  name: string;
  image: string;

  constructor(uid: string, email: string, name: string, image: string) {
    this.uid = uid;
    this.email = email;
    this.name = name;
    this.image = image;
  }

}
