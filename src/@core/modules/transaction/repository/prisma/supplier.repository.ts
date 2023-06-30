import { PrismaClient } from "@prisma/client";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Supplier from "../../domain/supplier.entity";
import SupplierGateway from "../../gateway/supplier.gateway";
import Name from "../../../@shared/domain/value-objects/name.vo";
import Email from "../../../@shared/domain/value-objects/email.vo";

export default class SupplierRepository implements SupplierGateway {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }

    async add(entity: Supplier): Promise<void> {
        if (!entity) {
            throw new Error("Please provide an entity")
        }


        await this.prisma.supplier.create({
            data: {
                id: entity.id.value,
                name: entity.name.value,
                email: entity.email.value,
                telephone: entity.telephone,
                manager: entity.manager,
                address: entity.address,
                code: entity.code,
                supplier_nature: entity.supplier_nature,
                nif: entity.nif
            }
        })

    }
    async update(entity: Supplier): Promise<void> {
        const response = await this.prisma.supplier.update({
            data: {
                id: entity.id.value,
                name: entity.name.value,
                email: entity.email.value,
                telephone: entity.telephone,
                manager: entity.manager,
                address: entity.address,
                code: entity.code,
                supplier_nature: entity.supplier_nature,
                nif: entity.nif
            },
            where: {
                id: entity.id.value
            }
        })

    }
    async find(id: string): Promise<Supplier> {
        const response = await this.prisma.supplier.findFirst({
            where: { id }
        })

        let supplierProps = {
            id: new Id(id),
            name: new Name(response.name),
            email: new Email(response.email),
            telephone: response.telephone,
            manager: response.manager,
            address: response.address,
            code: response.code,
            supplier_nature: response.supplier_nature,
            nif: response.nif
        }


        const supplier = new Supplier(supplierProps)


        return supplier
    }

    async list(input: { limit: number; page: number; }): Promise<Supplier[]> {
        const response = await this.prisma.supplier.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        const output: Supplier[] = response.map((elem) => {
            let supplierProps = {
                id: new Id(elem.id),
                name: new Name(elem.name),
                email: new Email(elem.email),
                telephone: elem.telephone,
                manager: elem.manager,
                address: elem.address,
                code: elem.code,
                supplier_nature: elem.supplier_nature,
                nif: elem.nif
            }

            return new Supplier(supplierProps)
        })

        return output
    }

    async delete(id: string): Promise<void> {

        if (!id || id.length < 0) {
            throw new Error("Cannot delete, Please provide an valid id")
        }

        await this.prisma.supplier.delete({
            where: {
                id
            }
        })
    }
}