import Id from "../../../@shared/domain/value-objects/id.vo";
import TransactionGateway from "../../gateway/transaction.gateway";
import Transaction from "../../domain/transaction.entity";
import ExpenditureGateway from "../../gateway/expenditure.gateway";
import SupplierGateway from "../../gateway/supplier.gateway";

export default class UpdateTransactionUseCase {
    constructor(
        private repository: TransactionGateway,
        private supplier_repository: SupplierGateway,
        private expenditure_repository: ExpenditureGateway,
    ) {

    }


    async execute(input: UpdateTransactionInputDTO): Promise<UpdateTransactionOutputDTO> {

        const dataSupplier = await this.supplier_repository.find(input.supplierId)

        const dataExpenditure = await this.expenditure_repository.find(input.expenditureId)

        const transactionProps = {
            id: new Id(input.id),
            supplier: dataSupplier,
            type: input.type,
            amount: input.amount,
            balance_after: input.balance_after,
            expenditure: dataExpenditure,
            reference: input.reference,
            description: input.description,
            ticket: input.ticket,
            date_doc: input.date_doc
        }

        const transaction = new Transaction(transactionProps)

        await this.repository.update(transaction)

        return {
            id: transaction.id.value,
            expenditure: transaction.expenditure,
            type: transaction.type,
            amount: transaction.amount,
            balance_after: transaction.balance_after,
            supplier: transaction.supplier,
            reference: transaction.reference,
            description: transaction.description,
            ticket: transaction.ticket,
            date_doc: transaction.date_doc
        }
    }
}