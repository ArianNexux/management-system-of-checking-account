export class CreateTransactionDto {
    expenditureId: string;
    type: string;
    amount: number;
    balance_after: number;
    supplierId: string;
    reference: string;
    description: string;
    ticket: string;
    date_doc: Date
}
