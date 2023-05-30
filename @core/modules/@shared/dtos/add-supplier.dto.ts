export type AddSupplierInputDTO = {
    name: string;
    email: string;
    code: string;
    supplier_nature: string;
    nif: string;
    telephone: string;
    address: string;
    manager: string;
}

export type AddSupplierOutputDTO = {
    id: string
    name: string;
    email: string;
    code: string;
    supplier_nature: string;
    nif: string;
    telephone: string;
    address: string;
    manager: string
}