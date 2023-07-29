import Expenditure from "../domain/expenditure.entity";

type ListExpenditureInputDTO = {
    limit: number;
    page: number;
};
export default interface ExpenditureGateway {
    add(entity: Expenditure): Promise<void>;
    update(entity: Expenditure): Promise<void>;
    find(id: string): Promise<Expenditure>;
    delete(id: string): Promise<void>;
    list(input: ListExpenditureInputDTO): Promise<Expenditure[]>;
    count(): Promise<any>;
}
