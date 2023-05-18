import BaseEntity from '../../@shared/domain/entity/base-entity';
import Email from '../../@shared/domain/value-objects/email.vo';
import Id from '../../@shared/domain/value-objects/id.vo';
import Name from '../../@shared/domain/value-objects/name.vo';

type SupplierProps = {
    id: Id;
    name: Name;
    email: Email;
    code: string;
    supplier_nature: string;
    nif: string;
    telephone: string;
    address: string;
    manager: string;
};
export default class Suppplier extends BaseEntity {
    private _name: Name;
    private _email: Email;
    private _code: string;
    private _supplier_nature: string;
    private _nif: string;
    private _telephone: string;
    private _address: string;
    private _manager: string;

    constructor(props: SupplierProps) {
        super(props.id);
        this._email = props.email;
        this._name = props.name;
        this._code = props.code;
        this._supplier_nature = props.supplier_nature;
        this._nif = props.nif;
        this._telephone = props.telephone;
        this._address = props.address;
        this._manager = props.manager;
        this.validate();
    }

    get name(): Name {
        return this._name;
    }

    get email(): Email {
        return this._email;
    }

    get code(): string {
        return this._code;
    }

    get nif(): string {
        return this._nif;
    }

    get address(): string {
        return this._address;
    }

    get manager(): string {
        return this._manager;
    }
    get supplier_nature(): string {
        return this._supplier_nature;
    }
    get telephone(): string {
        return this._telephone;
    }


    changeName(name: Name): void {
        this._name = name;
    }

    updateEmail(email: Email): void {
        this._email = email;
    }

    updateAddress(address: string): void {
        this._address = address;
    }

    updateManager(manager: string): void {
        this._manager = manager;
    }

    updateNif(nif: string): void {
        this._nif = nif;
    }

    updateSupplierNature(supplier_nature: string): void {
        this._supplier_nature = supplier_nature;
    }

    updateCode(code: string): void {
        this._code = code;
    }

    updatePhone(telephone: string): void {
        this._telephone = telephone;
    }

    validate() {
        if (this._code == '') {
            throw new Error('Please provide a code');
        }

        if (this._manager == '') {
            throw new Error('Please provide a manager');
        }

        if (this._address == '') {
            throw new Error('Please provide an address');
        }

        if (this.nif == '') {
            throw new Error('Please provide a valid nif');
        }

        if (this._address == '') {
            throw new Error('Please provide an address');
        }

        if (this._telephone == '') {
            throw new Error('Please provide a telephone');
        }

        if (this._supplier_nature == '') {
            throw new Error('Please provide a Supplier Nature');
        }
    }
}
