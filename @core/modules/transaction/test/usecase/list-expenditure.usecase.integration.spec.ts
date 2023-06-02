import Email from "../../../@shared/domain/value-objects/email.vo";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Name from "../../../@shared/domain/value-objects/name.vo";
import { faker } from '@faker-js/faker';
import ListExpenditureUseCase from "../../usecase/expenditure/list-expenditure.usecase";
import { PrismaClient } from "@prisma/client";
import ExpenditureRepository from "../../repository/prisma/expenditure.repository";

describe("Test suit to list Expenditure", () => {

    const prisma = new PrismaClient()


    test('should list all Expenditures', async () => {

        const propsExpenditure1 = {
            id: new Id(),
            name: faker.commerce.product(),
            type: faker.commerce.productMaterial(),
        };

        const propsExpenditure2 = {
            id: new Id(),
            name: faker.commerce.product(),
            type: faker.commerce.productMaterial()
        };

        await prisma.expenditure.create({
            data: {
                id: propsExpenditure1.id.value,
                name: propsExpenditure1.name,
                type: propsExpenditure1.type
            }
        })

        await prisma.expenditure.create({
            data: {
                id: propsExpenditure2.id.value,
                name: propsExpenditure2.name,
                type: propsExpenditure2.type
            }
        })

        const repository = new ExpenditureRepository()

        const usecase = new ListExpenditureUseCase(repository);
        const input = {
            page: 1,
            limit: 2,
        }
        const output = await usecase.execute(input)

        expect(output.data.length).toBeGreaterThanOrEqual(2)

        expect(output.data).toContainEqual({
            id: propsExpenditure1.id.value,
            name: propsExpenditure1.name,
            type: propsExpenditure1.type,

        })
        expect(output.data).toContainEqual({
            id: propsExpenditure2.id.value,
            name: propsExpenditure2.name,
            type: propsExpenditure2.type,

        })
    })
})