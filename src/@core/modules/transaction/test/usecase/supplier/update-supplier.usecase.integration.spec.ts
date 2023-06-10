import { PrismaClient } from "@prisma/client"
import SupplierRepository from "../../../repository/prisma/supplier.repository"
import UpdateSupplierUseCase from "../../../usecase/supplier/update-supplier.usecase"
import { faker } from "@faker-js/faker"
import Name from "../../../../@shared/domain/value-objects/name.vo"
import Email from "../../../../@shared/domain/value-objects/email.vo"
import Id from "../../../../@shared/domain/value-objects/id.vo"

describe("Test suit to update Supplier", () => {

    const prisma = new PrismaClient()

    test('should update an Supplier', async () => {
        const repository = new SupplierRepository()
        const input = {
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
                id: input.id.value,
                name: input.name.value,
                email: input.email.value,
                code: input.code,
                supplier_nature: input.supplier_nature,
                nif: input.nif,
                telephone: input.telephone,
                address: input.address,
                manager: input.manager
            }
        })

        const usecase = new UpdateSupplierUseCase(repository);

        const inputUpdated = {
            id: input.id.value,
            name: new Name(faker.person.fullName()).value,
            email: new Email(faker.internet.email()).value,
            code: faker.string.uuid(),
            supplier_nature: faker.commerce.productDescription(),
            nif: faker.string.alphanumeric(),
            telephone: faker.phone.number(),
            address: faker.person.jobArea(),
            manager: faker.person.fullName(),
        };

        const output = await usecase.execute(inputUpdated)

        expect(output.id).toBe(inputUpdated.id);
        expect(output.name).toBe(inputUpdated.name)
    })
})