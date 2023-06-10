import Id from "../../../@shared/domain/value-objects/id.vo";
import Expenditure from "../../domain/expenditure.entity";
import FindExpenditureUseCase from "../../usecase/expenditure/find-expenditure.usecase";
import { faker } from '@faker-js/faker';
import ExpenditureRepository from "../../repository/prisma/expenditure.repository";
import { PrismaClient } from "@prisma/client";

describe('Test suits Find Expenditure Use Case', () => {
    const prisma = new PrismaClient()

    test('should find an expenditure', async () => {
        const propsExpenditure = {
            id: new Id(),
            name: faker.person.fullName(),
            type: faker.commerce.product(),
        };

        const expenditure = new Expenditure(propsExpenditure)

        await prisma.expenditure.create({
            data: {
                id: expenditure.id.value,
                name: expenditure.name,
                type: expenditure.type,
            }
        })

        const repository = new ExpenditureRepository()
        const input = {
            id: expenditure.id.value
        }
        const usecase = new FindExpenditureUseCase(repository)
        const output = await usecase.execute(input)

        expect(output.id).toBeDefined()
        expect(output.name).toBe(propsExpenditure.name)
        expect(output.type).toBe(propsExpenditure.type)
    })
})