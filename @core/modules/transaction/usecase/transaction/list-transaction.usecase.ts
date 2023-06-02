import TransactionGateway from "../../gateway/Transaction.gateway";

export default class ListTransactionUseCase {
    constructor(
        private repository: TransactionGateway
    ) {

    }


    async execute(input: ListTransactionInputDTO): Promise<ListTransactionOutputDTO> {

        let result = await this.repository.list(input)

        if (!result) {
            throw new Error("No result found for suppliers")
        }

        let output: ListTransaction[] = result.map(e => ({
            id: e.id.value,
            expenditure: e.expenditure,
            type: e.type,
            amount: e.amount,
            balance_after: e.balance_after,
            supplier: e.supplier,
            reference: e.reference,
            description: e.description,
            ticket: e.ticket,
            date_doc: e.date_doc
        }))

        return {
            data: output,
            page: input.page,
            limit: input.limit
        }
    }
}