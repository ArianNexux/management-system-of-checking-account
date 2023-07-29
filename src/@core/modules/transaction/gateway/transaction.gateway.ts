import Transaction from "../domain/transaction.entity";
export default interface TransactionGateway {
    add(entity: Transaction): Promise<void>;
    update(entity: Transaction): Promise<void>;
    find(id: string): Promise<Transaction>;
    delete(id: string): Promise<void>;
    list(input: ListTransactionInputDTO): Promise<Transaction[]>;
    listBySupplier(input: ListTransactionInputDTO): Promise<Transaction[]>;
    findBalanceAfterOfLastTransaction(supplierId: string): Promise<number>
    count(): Promise<any>;

}

type ListTransactionInputDTO = {
    limit: number;
    page: number;
};
