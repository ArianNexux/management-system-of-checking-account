import Email from "../../../../@shared/domain/value-objects/email.vo";
import Id from "../../../../@shared/domain/value-objects/id.vo";
import Name from "../../../../@shared/domain/value-objects/name.vo";
import { faker } from '@faker-js/faker';
import ListSupplierUseCase from "../../../usecase/supplier/list-supplier.usecase";
import { PrismaClient } from "@prisma/client";
import SupplierRepository from "../../../repository/prisma/supplier.repository";

describe("Test suit to list Supplier", () => {

    const prisma = new PrismaClient()


    test('should list all Suppliers', async () => {

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

        const propsSupplier2 = {
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

        await prisma.supplier.create({
            data: {
                id: propsSupplier1.id.value,
                name: propsSupplier1.name.value,
                email: propsSupplier1.email.value,
                code: propsSupplier1.code,
                supplier_nature: propsSupplier1.supplier_nature,
                nif: propsSupplier1.nif,
                telephone: propsSupplier1.telephone,
                address: propsSupplier1.address,
                manager: propsSupplier1.manager

            }
        })

        await prisma.supplier.create({
            data: {
                id: propsSupplier2.id.value,
                name: propsSupplier2.name.value,
                email: propsSupplier2.email.value,
                code: propsSupplier2.code,
                supplier_nature: propsSupplier2.supplier_nature,
                nif: propsSupplier2.nif,
                telephone: propsSupplier2.telephone,
                address: propsSupplier2.address,
                manager: propsSupplier2.manager
            }
        })

        const repository = new SupplierRepository()

        const usecase = new ListSupplierUseCase(repository);
        const input = {
            page: 1,
            limit: 2,
        }
        const output = await usecase.execute(input)

        expect(output.data.length).toBeGreaterThanOrEqual(2)

        expect(output.data).toContainEqual({
            id: propsSupplier1.id.value,
            name: propsSupplier1.name.value,
            email: propsSupplier1.email.value,
            code: propsSupplier1.code,
            supplier_nature: propsSupplier1.supplier_nature,
            nif: propsSupplier1.nif,
            telephone: propsSupplier1.telephone,
            address: propsSupplier1.address,
            manager: propsSupplier1.manager

        })
        expect(output.data).toContainEqual({
            id: propsSupplier2.id.value,
            name: propsSupplier2.name.value,
            email: propsSupplier2.email.value,
            code: propsSupplier2.code,
            supplier_nature: propsSupplier2.supplier_nature,
            nif: propsSupplier2.nif,
            telephone: propsSupplier2.telephone,
            address: propsSupplier2.address,
            manager: propsSupplier2.manager

        })
    })
})