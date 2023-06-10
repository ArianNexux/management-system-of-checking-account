import Supplier from "../domain/supplier.entity";

type ListSupplierInputDTO = {
    limit: number;
    page: number;
};
export default interface SupplierGateway {
    add(entity: Supplier): Promise<void>;
    update(entity: Supplier): Promise<void>;
    find(id: string): Promise<Supplier>;
    delete(id: string): Promise<void>;
    list(input: ListSupplierInputDTO): Promise<Supplier[]>;
}
