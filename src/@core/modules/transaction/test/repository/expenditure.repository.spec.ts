import Email from "../../../@shared/domain/value-objects/email.vo";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Name from "../../../@shared/domain/value-objects/name.vo";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import Expenditure from "../../domain/expenditure.entity";
import Supplier from "../../domain/supplier.entity";
import ExpenditureRepository from "../../repository/prisma/expenditure.repository";

describe("Test suite for ExpenditureRepository", () => {
    const prisma = new PrismaClient();

    test("should add a expenditure", async () => {
        const repository = new ExpenditureRepository();

        const expenditureProps = {
            id: new Id(faker.string.uuid()),
            type: "Expense",
            name: "Office Supplies",
        };

        const expenditure = new Expenditure(expenditureProps);

        await repository.add(expenditure);

        const expenditureFound = await prisma.expenditure.findFirst({
            where: {
                id: expenditureProps.id.value,
            }
        });

        expect(expenditureProps).toEqual({
            id: new Id(expenditureFound.id),
            type: expenditureFound.type,
            name: expenditureFound.name,
        });
    });

    test("should update a expenditure", async () => {
        const repository = new ExpenditureRepository();

        const expenditureProps = {
            id: new Id(faker.string.uuid()),
            type: "Expense",
            name: "Office Supplies"
        };

        const expenditureToUpdate = new Expenditure(expenditureProps);
        await prisma.expenditure.create({
            data: {
                id: expenditureProps.id.value,
                type: expenditureProps.type,
                name: expenditureProps.name
            }
        })

        const newName = "Pendrives";
        const newType = "NewType";

        expenditureToUpdate.changeName(newName);
        expenditureToUpdate.updateType(newType);

        await repository.update(expenditureToUpdate);

        const expenditureFound = await prisma.expenditure.findFirst({
            where: {
                id: expenditureProps.id.value,
            }
        });

        const expenditureUpdateProps = {
            id: expenditureToUpdate.id,
            type: expenditureToUpdate.type,
            name: expenditureToUpdate.name,
        };

        expect(expenditureUpdateProps).toEqual({
            id: new Id(expenditureFound.id),
            type: expenditureFound.type,
            name: expenditureFound.name,
        });
    });

    test("should find a expenditure", async () => {
        const repository = new ExpenditureRepository();
        const expenditureProps = {
            id: new Id(faker.string.uuid()),
            type: "Credit",
            name: "Office Supplies",
        };

        const expenditure = new Expenditure(expenditureProps);
        await prisma.expenditure.create({
            data: {
                id: expenditureProps.id.value,
                type: expenditureProps.type,
                name: expenditureProps.name
            }
        })

        const expenditureFound = await repository.find(expenditure.id.value);

        let expenditurePropsExpected = {
            id: expenditureProps.id,
            type: expenditure.type,
            name: expenditure.name
        }

        expect(expenditurePropsExpected).toEqual({
            id: new Id(expenditureFound.id.value),
            type: expenditureFound.type,
            name: expenditureFound.name,

        });
    });

    test("should list all expenditures", async () => {
        const repository = new ExpenditureRepository();

        const expenditureProps = {
            id: new Id(faker.string.uuid()),
            type: "Expense",
            name: faker.commerce.product(),
        };

        const expenditureProps1 = {
            id: new Id(faker.string.uuid()),
            type: "Expense",
            name: faker.commerce.product(),
        };

        const expenditure = new Expenditure(expenditureProps);
        const expenditure1 = new Expenditure(expenditureProps1);
        await prisma.expenditure.create({
            data: {
                id: expenditure.id.value,
                type: expenditure.type,
                name: expenditure.name
            }
        })

        await prisma.expenditure.create({
            data: {
                id: expenditure1.id.value,
                type: expenditure1.type,
                name: expenditure1.name
            }
        })

        const expendituresFound = await repository.list({ limit: 2, page: 1 });

        expect(expendituresFound.length).toBeGreaterThanOrEqual(2);
    });

    test("should delete one expenditure", async () => {
        const repository = new ExpenditureRepository();
        const expenditureProps = {
            id: new Id(faker.string.uuid()),
            type: "Expense",
            name: faker.commerce.product(),
        };
        const expenditure = new Expenditure(expenditureProps)

        await prisma.expenditure.create({
            data: {
                id: expenditure.id.value,
                type: expenditure.type,
                name: expenditure.name
            }
        })

        await repository.delete(expenditure.id.value);

        const expenditureDelete = await prisma.expenditure.findUnique({
            where: {
                id: expenditure.id.value,
            },
            select: {
                id: true,
            },
        });

        expect(expenditureDelete?.id).toBeUndefined();
    });
});


