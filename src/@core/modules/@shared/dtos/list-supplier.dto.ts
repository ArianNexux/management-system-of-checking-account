
type ListSupplierOutputDTO = {
    data: ListSupplier[]
    page: number
    limit: number
}
type ListSupplier = {
    id: string,
    name: string;
    email: string;
    code: string;
    supplier_nature: string;
    nif: string;
    telephone: string;
    address: string;
    manager: string;
}
type ListSupplierInputDTO = {
    page: number
    limit: number
}