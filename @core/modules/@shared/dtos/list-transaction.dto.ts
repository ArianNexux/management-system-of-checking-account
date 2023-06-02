
type ListTransactionOutputDTO = {
    data: ListTransaction[]
    page: number
    limit: number
}
type ListTransaction = {
    id: string,
    expenditure: {};
    type: string;
    amount: number;
    balance_after: number;
    supplier: {};
    reference: string;
    description: string;
    ticket: string;
    date_doc: Date
}
type ListTransactionInputDTO = {
    page: number
    limit: number
}