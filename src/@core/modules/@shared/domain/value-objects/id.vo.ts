import { v4 as uuidv4 } from 'uuid';

export default class Id {
  private _value: string;

  constructor(id?: string) {
    this._value = id || uuidv4();
  }

  get value(): string {
    return this._value;
  }
}
