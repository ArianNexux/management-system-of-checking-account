import { FindTransactionInputDTO, FindTransactionOutputDTO } from "../../../@shared/dtos/find-transaction.dto";
import TransactionGateway from "../../gateway/transaction.gateway";

export default class FindTransactionUseCase {

    constructor(
        private repository: TransactionGateway
    ) {

    }

    async execute(input: FindTransactionInputDTO): Promise<FindTransactionOutputDTO> {
        if (input.id == "") {
            throw new Error("Please provide an id to find the transaction")
        }
        const transactionFound = await this.repository.find(input.id)

        if (!transactionFound) {
            throw new Error("Transaction not found")
        }

        return {
            id: transactionFound.id.value,
            expenditure: transactionFound.expenditure,
            type: transactionFound.type,
            amount: transactionFound.amount.toLocaleString(),
            balance_after: transactionFound.balance_after.toLocaleString(),
            supplier: transactionFound.supplier,
            reference: transactionFound.reference,
            description: transactionFound.description,
            ticket: transactionFound.ticket,
            date_doc: transactionFound.date_doc
        }
    }

}