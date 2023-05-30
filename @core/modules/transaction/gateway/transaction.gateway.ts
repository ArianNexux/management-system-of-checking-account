import Transaction from "../domain/transaction.entity";

type ListTransactionInputDTO = {
    limit: number;
    page: number;
};
export default interface TransactionGateway {
    add(entity: Transaction): Promise<void>;
    update(entity: Transaction): Promise<void>;
    find(id: string): Promise<Transaction>;
    delete(id: string): Promise<void>;
    list(input: ListTransactionInputDTO): Promise<Transaction[]>;
}
