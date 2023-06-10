import { FindSupplierInputDTO, FindSupplierOutputDTO } from "../../../@shared/dtos/find-supplier.dto";
import SupplierGateway from "../../gateway/supplier.gateway";

export default class FindSupplierUseCase {

    constructor(
        private repository: SupplierGateway
    ) {

    }

    async execute(input: FindSupplierInputDTO): Promise<FindSupplierOutputDTO> {
        if (input.id == "") {
            throw new Error("Please provide an id to find the supplier")
        }
        const supplierFound = await this.repository.find(input.id)

        if (!supplierFound) {
            throw new Error("Supplier not found")
        }

        return {
            id: input.id,
            name: supplierFound.name.value,
            email: supplierFound.email.value,
            code: supplierFound.code,
            supplier_nature: supplierFound.supplier_nature,
            nif: supplierFound.nif,
            telephone: supplierFound.telephone,
            address: supplierFound.address,
            manager: supplierFound.manager,
        }
    }

}