export type AddTransactionInputDTO = {
    expenditureId: string;
    type: string;
    amount: number;
    balance_after: number;
    supplierId: string;
    reference: string;
    description: string;
    ticket: string;
    date_doc: Date
};

export type AddTransactionOutputDTO = {
    id: string
    expenditure: {
        id: {
            value: string
        }
    };
    type: string;
    amount: string;
    balance_after: string;
    supplier: {
        id: {
            value: string
        }
    },
    reference: string;
    description: string;
    ticket: string;
    date_doc: Date
}