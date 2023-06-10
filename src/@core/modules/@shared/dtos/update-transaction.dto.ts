
type UpdateTransactionOutputDTO = {
    id: string,
    expenditure: {
        id: {
            value: string
        }
    }
    type: string
    amount: number
    balance_after: number
    supplier: {
        id: {
            value: string
        }
    }
    reference: string
    description: string
    ticket: string
    date_doc: Date
}

type UpdateTransactionInputDTO = {
    id: string,
    expenditureId: string
    type: string
    amount: number
    balance_after: number
    supplierId: string
    reference: string
    description: string
    ticket: string
    date_doc: Date
}