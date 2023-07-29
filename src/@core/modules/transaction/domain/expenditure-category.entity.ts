import BaseEntity from '../../@shared/domain/entity/base-entity';
import Id from '../../@shared/domain/value-objects/id.vo';

type ExpenditureProps = {
    id: Id;
    name: string;
};
export default class Expenditure extends BaseEntity {
    private _name: string;
    constructor(props: ExpenditureProps) {
        super(props.id);
        this._name = props.name;
        this.validate();
    }

    get name(): string {
        return this._name;
    }


    changeName(name: string): void {
        this._name = name;
    }

    validate() {
        if (this._name == '') {
            throw new Error('Please provide a name for the expenditure');
        }
    }
}
