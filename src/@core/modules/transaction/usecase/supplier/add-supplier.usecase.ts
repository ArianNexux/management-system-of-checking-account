import Id from "../../../@shared/domain/value-objects/id.vo"
import { AddSupplierInputDTO, AddSupplierOutputDTO } from "../../../@shared/dtos/add-supplier.dto";
import SupplierGateway from "../../gateway/supplier.gateway";
import Supplier from "../../domain/supplier.entity";
import Name from "../../../../modules/@shared/domain/value-objects/name.vo";
import Email from "../../../../modules/@shared/domain/value-objects/email.vo";

export default class AddSupplierUseCase {

    constructor(
        private repository: SupplierGateway
    ) {

    }

    async execute(input: AddSupplierInputDTO): Promise<AddSupplierOutputDTO> {
        if (!input) {
            throw new Error("Input DTO was not provided")
        }
        const propsSupplier = {
            id: new Id(),
            name: new Name(input.name),
            email: new Email(input.email),
            code: input.code,
            supplier_nature: input.supplier_nature,
            nif: input.nif,
            telephone: input.telephone,
            address: input.address,
            manager: input.manager
        }
        const supplier = new Supplier(propsSupplier)

        await this.repository.add(supplier)
        return {
            id: supplier.id.value,
            name: supplier.name.value,
            email: supplier.email.value,
            code: supplier.code,
            supplier_nature: supplier.supplier_nature,
            nif: supplier.nif,
            telephone: supplier.telephone,
            address: supplier.address,
            manager: supplier.manager
        }
    }
}