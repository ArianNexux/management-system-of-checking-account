import { PrismaClient } from "@prisma/client";
import SupplierRepository from "../../../repository/prisma/supplier.repository";
import AddSupplierUseCase from "../../../usecase/supplier/add-supplier.usecase";
import { faker } from '@faker-js/faker';

describe('Test suits of use case to create supplier', () => {

    const prisma = new PrismaClient()

    test('should create an supplier', async () => {
        const repository = new SupplierRepository()

        const usecase = new AddSupplierUseCase(repository);

        const input = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            code: faker.string.uuid(),
            supplier_nature: faker.commerce.productDescription(),
            nif: faker.string.alphanumeric(),
            telephone: faker.phone.number(),
            address: faker.person.jobArea(),
            manager: faker.person.fullName(),
        };

        const output = await usecase.execute(input)

        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.email).toBe(input.email);
        expect(output.code).toBe(input.code);
        expect(output.supplier_nature).toBe(input.supplier_nature);
        expect(output.nif).toBe(input.nif);
        expect(output.telephone).toBe(input.telephone);
        expect(output.address).toBe(input.address);

    });
});
