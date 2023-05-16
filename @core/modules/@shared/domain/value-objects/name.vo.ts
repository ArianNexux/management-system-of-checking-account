export default class Name {
  private _name: string;
  constructor(name: string) {
    if (!name || name.split(' ').length < 2) {
      throw new Error('Please provide a valid name');
    }
    this._name = name;
  }

  get name() {
    return this._name;
  }
}
