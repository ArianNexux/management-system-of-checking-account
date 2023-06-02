import Id from "../../../../@shared/domain/value-objects/id.vo";
import Supplier from "../../../domain/supplier.entity";
import FindSupplierUseCase from "../../../usecase/supplier/find-supplier.usecase";
import { faker } from '@faker-js/faker';
import SupplierRepository from "../../../repository/prisma/supplier.repository";
import { PrismaClient } from "@prisma/client";
import Name from "../../../../@shared/domain/value-objects/name.vo";
import Email from "../../../../@shared/domain/value-objects/email.vo";

describe('Test suits Find Supplier Use Case', () => {
    const prisma = new PrismaClient()

    test('should find an supplier', async () => {
        const propsSupplier = {
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

        const supplier = new Supplier(propsSupplier)

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
                manager: supplier.manager

            }
        })

        const repository = new SupplierRepository()
        const input = {
            id: supplier.id.value
        }

        const usecase = new FindSupplierUseCase(repository)
        const output = await usecase.execute(input)

        expect(output.id).toBeDefined()
        expect(output.name).toBe(propsSupplier.name.value)
        expect(output.email).toBe(propsSupplier.email.value)
        expect(output.code).toBe(propsSupplier.code)
        expect(output.supplier_nature).toBe(propsSupplier.supplier_nature)
        expect(output.nif).toBe(propsSupplier.nif)
        expect(output.telephone).toBe(propsSupplier.telephone)
        expect(output.address).toBe(propsSupplier.address)
        expect(output.manager).toBe(propsSupplier.manager)
    })
})