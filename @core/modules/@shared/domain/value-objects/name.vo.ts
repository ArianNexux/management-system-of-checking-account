export default class Name {
  private _value: string;
  constructor(name: string) {
    if (!name || name.split(' ').length < 2) {
      throw new Error('Please provide a valid name');
    }
    this._value = name;
  }

  get value() {
    return this._value;
  }
}
