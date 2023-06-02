import SupplierGateway from "../../gateway/supplier.gateway";

export default class DeleteSupplierUseCase {
    constructor(
        private repository: SupplierGateway
    ) {

    }


    async execute(input: DeleteSupplierInputDTO): Promise<DeleteSupplierOutputDTO> {
        await this.repository.delete(input.id)
        return {

        }
    }
}