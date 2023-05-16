import AggregateRoot from '../../@shared/domain/entity/aggregate.root-interface';
import BaseEntity from '../../@shared/domain/entity/base-entity';
import Id from '../../@shared/domain/value-objects/id.vo';
import SizeLogo from '../../@shared/domain/value-objects/size-logo.vo';

type InstituitionProps = {
  id: Id;
  name: string;
  title1: string;
  title2: string;
  logo: string;
  sizeLogo: SizeLogo;
};

export default class Instituition extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _title1: string;
  private _title2: string;
  private _logo: string;
  private _sizeLogo: SizeLogo;

  constructor(props: InstituitionProps) {
    super(props.id);
    this._name = props.name;
    this._title1 = props.title1;
    this._title2 = props.title2;
    this._logo = props.logo;
    this._sizeLogo = props.sizeLogo;
    this.validate();
  }

  validate() {
    if (this._title1 == '') {
      throw new Error('Title 1 is empty');
    }

    if (this._title2 == '') {
      throw new Error('Title 2 is empty');
    }

    if (this._name == '') {
      throw new Error('Name is empty');
    }

    if (this._logo == '') {
      throw new Error('Logo is empty');
    }

    if (!this._sizeLogo) {
      throw new Error('SizeLogo is empty');
    }
  }

  get name(): string {
    return this._name;
  }

  changeName(value: string) {
    this._name = value;
  }

  get title1(): string {
    return this._title1;
  }

  updateTitle1(value: string) {
    this._title1 = value;
  }

  get title2(): string {
    return this._title2;
  }

  updateTitle2(value: string) {
    this._title2 = value;
  }
  get logo(): string {
    return this._logo;
  }

  updatedLogoPath(value: string) {
    this._logo = value;
  }
  get sizeLogo(): SizeLogo {
    return this._sizeLogo;
  }

  updateSizeLogo(value: SizeLogo) {
    this._sizeLogo = value;
  }
}
