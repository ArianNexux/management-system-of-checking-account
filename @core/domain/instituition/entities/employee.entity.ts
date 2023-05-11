import BaseEntity from '../../../@shared/entity/base-entity';
import Email from '../../../@shared/value-objects/email.vo';
import Id from '../../../@shared/value-objects/id.vo';
import Name from '../../../@shared/value-objects/name.vo';

type EmployeeProps = {
  id: Id;
  name: Name;
  email: Email;
  photo: string;
  role: string;
  position: string;
};
export default class Employee extends BaseEntity {
  private _name: Name;
  private _email: Email;
  private _photo: string;
  private _role: string;
  private _position: string;
  constructor(props: EmployeeProps) {
    super(props.id);
    this._email = props.email;
    this._name = props.name;
    this._photo = props.photo;
    this._role = props.role;
    this._position = props.position;
    this.validate();
  }

  get name(): Name {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get photo(): string {
    return this._photo;
  }

  get role(): string {
    return this._role;
  }

  get position(): string {
    return this._position;
  }

  changeName(name: Name): void {
    this._name = name;
  }

  updateEmail(email: Email): void {
    this._email = email;
  }

  updatePhoto(photo: string): void {
    this._photo = photo;
  }

  updateRole(role: string): void {
    this._role = role;
  }

  updatePosition(position: string): void {
    this._position = position;
  }

  validate() {
    if (this._photo == '') {
      throw new Error('Please provide a photo');
    }

    if (this._position == '') {
      throw new Error('Please provide a position');
    }

    if (this._role == '') {
      throw new Error('Please provide a role');
    }
  }
}
