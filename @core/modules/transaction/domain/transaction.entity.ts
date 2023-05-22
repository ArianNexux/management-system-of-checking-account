import BaseEntity from '../../@shared/domain/entity/base-entity';
import Email from '../../@shared/domain/value-objects/email.vo';
import Id from '../../@shared/domain/value-objects/id.vo';
import Name from '../../@shared/domain/value-objects/name.vo';
import Expenditure from './expenditure.entity';
import Supplier from './supplier.entity';
enum TypeOfTransaction {
    Credit = 'Credit',
    Debit = 'Debit'
}
type TransactionProps = {
    id: Id;
    expenditure: Expenditure;
    type: TypeOfTransaction;
    amount: number;
    balance_after: number;
    supplier: Supplier;
    reference: string;
    description: string;
    ticket: string;
    date_of: Date
};
export default class Transaction extends BaseEntity {
    private _expenditure: Expenditure;
    private _type: string;
    private _amount: number;
    private _balance_after: number;
    private _supplier: Supplier;
    private _reference: string;
    private _description: string;
    private _ticket: string;
    private _date_of: Date

    constructor(props: TransactionProps) {
        super(props.id);
        this._expenditure = props.expenditure;
        this._type = props.type;
        this._amount = props.amount;
        this._balance_after = props.balance_after;
        this._supplier = props.supplier;
        this._reference = props.reference;
        this._date_of = props.date_of;
        this._description = props.description;
        this.validate();
    }

    get type(): string {
        return this._type;
    }

    get expenditure(): Expenditure {
        return this._expenditure;
    }

    get amount(): number {
        return this._amount;
    }

    get balance_after(): number {
        return this._balance_after;
    }

    get supplier(): Supplier {
        return this._supplier;
    }

    get ticket(): String {
        return this._ticket;
    }

    get date_of(): Date {
        return this._date_of;
    }

    get reference(): string {
        return this._reference;
    }

    get description(): string {
        return this._description;
    }

    changeType(type: string): void {
        this._type = type;
    }

    updateExpenditure(expenditure: Expenditure): void {
        this._expenditure = expenditure;
    }

    changeAmount(amount: number): void {
        this._amount = amount;
    }

    updateBalanceAfter(balance_after: number): void {
        this._balance_after = balance_after;
    }

    updateSupplier(supplier: Supplier): void {
        this._supplier = supplier;
    }
    changeDescription(description: string): void {
        this._description = description;
    }

    updateTicket(ticket: string): void {
        this._ticket = ticket;
    }

    updateReference(ref: string): void {
        this._reference = ref;
    }
    updateDateOf(d: Date): void {
        this._date_of = d;
    }

    validate() {
        if (this._amount <= 0) {
            throw new Error('Please provide a valid amount');
        }

        if (!this._supplier) {
            throw new Error('Please provide a supplier');
        }
        if (!this._expenditure) {
            throw new Error('Please provide a expenditure');
        }

        if (this._type == "") {
            throw new Error('Please provide a type of transaction');
        }

        if (this._description == "") {
            throw new Error('Please provide a description for the transaction');
        }

        if (this._ticket == "") {
            throw new Error('Please provide a ticket for the transaction');
        }

        if (this._reference == "") {
            throw new Error('Please provide a reference for the transaction');
        }

        if (this._balance_after <= 0) {
            throw new Error('Please provide a valid Balance After');
        }

        if (!this._date_of) {
            throw new Error('Please provide a valid Date');
        }
    }
}
