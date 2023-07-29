import ExpenditureCategory from "../domain/expenditure-category.entity";

type ListExpenditureCategoryInputDTO = {
    limit: number;
    page: number;
};
export default interface ExpenditureCategoryGateway {
    add(entity: ExpenditureCategory): Promise<void>;
    update(entity: ExpenditureCategory): Promise<void>;
    find(id: string): Promise<ExpenditureCategory>;
    delete(id: string): Promise<void>;
    list(input: ListExpenditureCategoryInputDTO): Promise<ExpenditureCategory[]>;
    count(): Promise<any>;
}
