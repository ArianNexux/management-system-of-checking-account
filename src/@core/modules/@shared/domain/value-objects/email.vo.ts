export default class Email {
  private _value: string;

  constructor(email: string) {
    if (!email || !email.includes('@')) {
      throw new Error('Please provide a valid email address');
    }

    this._value = email;
  }

  get value() {
    return this._value;
  }
}
