import Id from "../../../@shared/domain/value-objects/id.vo"
import { AddTransactionInputDTO, AddTransactionOutputDTO } from "../../../@shared/dtos/add-transaction.dto";
import TransactionGateway from "../../gateway/transaction.gateway";
import Transaction from "../../domain/transaction.entity";
import SupplierGateway from "../../gateway/supplier.gateway";
import ExpenditureGateway from "../../gateway/expenditure.gateway";

export default class AddTransactionUseCase {

    constructor(
        private repository: TransactionGateway,
        private supplier_repository: SupplierGateway,
        private expenditure_repository: ExpenditureGateway,
    ) {

    }

    async execute(input: AddTransactionInputDTO): Promise<AddTransactionOutputDTO> {
        if (!input) {
            throw new Error("Input DTO was not provided")
        }

        const dataSupplier = await this.supplier_repository.find(input.supplierId)

        const dataExpenditure = await this.expenditure_repository.find(input.expenditureId)

        const propsTransaction = {
            id: new Id(),
            expenditure: dataExpenditure,
            type: input.type,
            amount: input.amount,
            balance_after: input.balance_after,
            supplier: dataSupplier,
            reference: input.reference,
            description: input.description,
            ticket: input.ticket,
            date_doc: new Date(input.date_doc)
        }
        const transaction = new Transaction(propsTransaction)

        await this.repository.add(transaction)
        return {
            id: transaction.id.value,
            expenditure: dataExpenditure,
            type: transaction.type,
            amount: transaction.amount,
            balance_after: transaction.balance_after,
            supplier: dataSupplier,
            reference: transaction.reference,
            description: transaction.description,
            ticket: transaction.ticket,
            date_doc: input.date_doc
        }
    }
}