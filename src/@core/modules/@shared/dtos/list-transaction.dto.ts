
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
    amount: string;
    balance_after: string;
    supplier: {
        id: string,
        name: string,
    };
    reference: string;
    description: string;
    ticket: string;
    date_doc: Date
    createdAt: Date;
    updatedAt: Date;
}
type ListTransactionInputDTO = {
    page: number
    limit: number
    supplierId?: string
    beginDate?: string
    endDate?: string
}