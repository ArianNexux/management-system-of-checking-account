export type FindTransactionOutputDTO = {
    id: string
    expenditure: {
        id: {
            value: string
        }
    };
    type: string;
    amount: number;
    balance_after: number;
    supplier: {
        id: {
            value: string
        }
    };
    reference: string;
    description: string;
    ticket: string;
    date_doc: Date
}


export type FindTransactionInputDTO = {
    id: string
}