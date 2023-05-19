import BaseEntity from '../../@shared/domain/entity/base-entity';
import Email from '../../@shared/domain/value-objects/email.vo';
import Id from '../../@shared/domain/value-objects/id.vo';
import Name from '../../@shared/domain/value-objects/name.vo';

type EmployeeProps = {
    id: Id;
    name: string;
    type: string;
};
export default class Expenditure extends BaseEntity {
    private _name: string;
    private _type: string;
    constructor(props: EmployeeProps) {
        super(props.id);
        this._name = props.name;
        this._type = props.type;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get type(): string {
        return this._type;
    }

    changeName(name: string): void {
        this._name = name;
    }

    updateType(type: string): void {
        this._type = type;
    }

    validate() {
        if (this._name == '') {
            throw new Error('Please provide a name');
        }

        if (this._type == '') {
            throw new Error('Please provide a Type for the expenditure');
        }
    }
}
