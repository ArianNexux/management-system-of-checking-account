import { PrismaClient } from "@prisma/client";
import Email from "../../../@shared/domain/value-objects/email.vo";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Name from "../../../@shared/domain/value-objects/name.vo";
import Expenditure from "../../domain/expenditure.entity";
import ExpenditureRepository from "../../repository/prisma/expenditure.repository";
import DeleteExpenditureUseCase from "../../usecase/expenditure/delete-expenditure.usecase";
import { faker } from '@faker-js/faker';

describe("Test suit to list Expenditure", () => {
    const prisma = new PrismaClient()

    test('should delete an Expenditure', async () => {
        const propsExpenditure1 = {
            id: new Id(),
            name: faker.commerce.product(),
            type: faker.commerce.productMaterial(),
        };

        const expenditure = new Expenditure(propsExpenditure1)

        await prisma.expenditure.create({
            data: {
                id: expenditure.id.value,
                name: expenditure.name,
                type: expenditure.type
            }
        })

        const repository = new ExpenditureRepository()

        const usecase = new DeleteExpenditureUseCase(repository);
        const input = {
            id: expenditure.id.value
        }
        await usecase.execute(input)
        const output = await prisma.expenditure.findUnique({
            where: {
                id: expenditure.id.value
            }
        })

        expect(output).toBeNull()

    })
})