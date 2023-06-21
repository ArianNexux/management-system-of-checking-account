import TransactionGateway from "../../gateway/transaction.gateway";

export default class ListTransactionUseCase {
    constructor(
        private repository: TransactionGateway
    ) {

    }


    async execute(input: ListTransactionInputDTO): Promise<ListTransactionOutputDTO> {

        let result;
        if (input.supplierId)
            result = await this.repository.listBySupplier(input)
        else
            result = await this.repository.list(input)

        if (!result) {
            throw new Error("No result found for transaction")
        }

        let output: ListTransaction[] = result.map(e => ({
            id: e.id.value,
            expenditure: {
                id: e.expenditure.id.value,
                name: e.expenditure.name,
                type: e.expenditure.type,

            },
            type: e.type,
            amount: e.amount.toLocaleString(),
            balance_after: e.balance_after.toLocaleString(),
            supplier: {
                id: e.supplier.id.value,
                name: e.supplier.name.value,

            },
            reference: e.reference,
            description: e.description,
            ticket: e.ticket,
            date_doc: e.date_doc,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt
        }))

        return {
            data: output,
            page: input.page,
            limit: input.limit
        }
    }
}