import { PrismaClient } from "@prisma/client";
import Email from "../../../../@shared/domain/value-objects/email.vo";
import Id from "../../../../@shared/domain/value-objects/id.vo";
import Name from "../../../../@shared/domain/value-objects/name.vo";
import Supplier from "../../../domain/supplier.entity";
import SupplierRepository from "../../../repository/prisma/supplier.repository";
import DeleteSupplierUseCase from "../../../usecase/supplier/delete-supplier.usecase";
import { faker } from '@faker-js/faker';

describe("Test suit to list Supplier", () => {
    const prisma = new PrismaClient()

    test('should delete an Supplier', async () => {
        const propsSupplier1 = {
            id: new Id(),
            name: new Name(faker.person.fullName()),
            email: new Email(faker.internet.email()),
            code: faker.string.uuid(),
            supplier_nature: faker.commerce.productDescription(),
            nif: faker.string.alphanumeric(),
            telephone: faker.phone.number(),
            address: faker.person.jobArea(),
            manager: faker.person.fullName(),
        };

        const supplier = new Supplier(propsSupplier1)

        await prisma.supplier.create({
            data: {
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
        })

        const repository = new SupplierRepository()

        const usecase = new DeleteSupplierUseCase(repository);
        const input = {
            id: supplier.id.value
        }
        await usecase.execute(input)
        const output = await prisma.supplier.findUnique({
            where: {
                id: supplier.id.value
            }
        })

        expect(output).toBeNull()

    })
})