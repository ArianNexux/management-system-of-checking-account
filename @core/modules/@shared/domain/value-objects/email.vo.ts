export default class Email {
  private _email: string;

  constructor(email: string) {
    if (!email || !email.includes('@')) {
      throw new Error('Please provide a valid email address');
    }

    this._email = email;
  }

  get email() {
    return this._email;
  }
}
