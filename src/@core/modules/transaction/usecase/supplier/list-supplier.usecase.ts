import SupplierGateway from "../../gateway/supplier.gateway";

export default class ListSupplierUseCase {
    constructor(
        private repository: SupplierGateway
    ) {

    }


    async execute(input: ListSupplierInputDTO): Promise<ListSupplierOutputDTO> {

        let result = await this.repository.list(input)

        if (!result) {
            throw new Error("No result found for suppliers")
        }

        let output: ListSupplier[] = result.map(e => ({
            id: e.id.value,
            name: e.name.value,
            email: e.email.value,
            code: e.code,
            supplier_nature: e.supplier_nature,
            nif: e.nif,
            telephone: e.telephone,
            address: e.address,
            manager: e.manager,
        }))

        return {
            data: output,
            page: input.page,
            limit: input.limit
        }
    }
}