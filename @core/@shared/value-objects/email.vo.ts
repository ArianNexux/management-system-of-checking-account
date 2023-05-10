export default class Email {
  private _email: string;

  constructor(email: string) {
    this._email = email;
  }

  get email() {
    return this._email;
  }
}
