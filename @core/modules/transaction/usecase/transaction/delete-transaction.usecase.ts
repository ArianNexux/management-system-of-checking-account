import TransactionGateway from "../../gateway/transaction.gateway";

export default class DeleteTransactionUseCase {
    constructor(
        private repository: TransactionGateway
    ) {

    }


    async execute(input: DeleteTransactionInputDTO): Promise<DeleteTransactionOutputDTO> {
        await this.repository.delete(input.id)
        return {

        }
    }
}