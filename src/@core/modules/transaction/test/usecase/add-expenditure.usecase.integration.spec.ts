import { PrismaClient } from "@prisma/client";
import ExpenditureRepository from "../../repository/prisma/expenditure.repository";
import AddExpenditureUseCase from "../../usecase/expenditure/add-expenditure.usecase";
import { faker } from '@faker-js/faker';

describe('Test suits of use case to create expenditure', () => {

    const prisma = new PrismaClient()

    test('should create an expenditure', async () => {
        const repository = new ExpenditureRepository()

        const usecase = new AddExpenditureUseCase(repository);

        const input = {
            name: faker.person.fullName(),
            type: faker.commerce.product(),
        };

        const output = await usecase.execute(input)

        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.type).toBe(input.type);
    });
});
