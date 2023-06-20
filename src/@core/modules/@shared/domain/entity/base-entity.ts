import Id from '../value-objects/id.vo';

export default class BaseEntity {
  private _id: Id;
  protected _created_at: Date;
  protected _updated_at: Date;

  constructor(id: Id) {
    this._id = id;
  }

  get id(): Id {
    return this._id;
  }

  get createdAt(): Date {
    return this._created_at;
  }

  get updatedAt(): Date {
    return this._updated_at;
  }

}
