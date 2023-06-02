import Id from "../../../@shared/domain/value-objects/id.vo";
import SupplierGateway from "../../gateway/Supplier.gateway";
import Supplier from "../../domain/supplier.entity";
import Name from "../../../@shared/domain/value-objects/name.vo";
import Email from "../../../@shared/domain/value-objects/email.vo";

export default class UpdateSupplierUseCase {
    constructor(
        private repository: SupplierGateway
    ) {

    }


    async execute(input: UpdateSupplierInputDTO): Promise<UpdateSupplierOutputDTO> {
        const supplierProps = {
            id: new Id(input.id),
            name: new Name(input.name),
            email: new Email(input.email),
            code: input.code,
            supplier_nature: input.supplier_nature,
            nif: input.nif,
            telephone: input.telephone,
            address: input.address,
            manager: input.manager,
        }

        const supplier = new Supplier(supplierProps)

        await this.repository.update(supplier)

        return {
            id: supplier.id.value,
            name: supplier.name.value,
            email: supplier.email.value,
            code: supplier.code,
            supplier_nature: supplier.supplier_nature,
            nif: supplier.nif,
            telephone: supplier.telephone,
            address: supplier.address,
            manager: supplier.manager,
        }
    }
}