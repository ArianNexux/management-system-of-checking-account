
type ListTransactionOutputDTO = {
    data: ListTransaction[]
    page: number
    limit: number
}
type ListTransaction = {
    id: string,
    expenditure: {
        id: string
        name: string
        type: string
    };
    type: string;
    amount: number;
    balance_after: number;
    supplier: {
        id: string,
        name: string,
    };
    reference: string;
    description: string;
    ticket: string;
    date_doc: Date
}
type ListTransactionInputDTO = {
    page: number
    limit: number
    supplierId?: string
}