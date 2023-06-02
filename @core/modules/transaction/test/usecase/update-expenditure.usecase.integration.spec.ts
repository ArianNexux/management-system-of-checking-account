import { PrismaClient } from "@prisma/client"
import ExpenditureRepository from "../../repository/prisma/expenditure.repository"
import UpdateExpenditureUseCase from "../../usecase/expenditure/update-expenditure.usecase"
import { faker } from "@faker-js/faker"
import Expenditure from "../../../transaction/domain/expenditure.entity"

describe("Test suit to update Expenditure", () => {

    const prisma = new PrismaClient()

    test('should update an Expenditure', async () => {
        const repository = new ExpenditureRepository()
        const fakerUuid = faker.string.uuid()
        const input = {
            id: fakerUuid,
            name: faker.commerce.product(),
            type: faker.commerce.productMaterial()
        };

        await prisma.expenditure.create({
            data: {
                id: input.id,
                name: input.name,
                type: input.type,
            }
        })

        const usecase = new UpdateExpenditureUseCase(repository);

        const inputUpdated = {
            id: fakerUuid,
            name: faker.commerce.product(),
            type: faker.commerce.productMaterial()
        };

        const output = await usecase.execute(inputUpdated)

        expect(output.id).toBe(inputUpdated.id);
        expect(output.name).toBe(inputUpdated.name)
        expect(output.type).toBe(inputUpdated.type)
    })
})