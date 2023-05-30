import Email from "../../../@shared/domain/value-objects/email.vo";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Name from "../../../@shared/domain/value-objects/name.vo";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import Expenditure from "../../domain/expenditure.entity";
import Supplier from "../../domain/supplier.entity";
import Transaction from "../../domain/transaction.entity";
import TransactionRepository from "../../repository/prisma/transaction.repository";

describe("Test suite for TransactionRepository", () => {
    const prisma = new PrismaClient();

    test("should add a transaction", async () => {
        const repository = new TransactionRepository();

        const transactionProps = {
            id: new Id(faker.string.uuid()),
            expenditure: new Expenditure({
                id: new Id(faker.string.uuid()),
                type: "Expense",
                name: "Office Supplies",
            }),
            type: "Credit",
            amount: 100,
            balance_after: 500,
            supplier: new Supplier({
                id: new Id(faker.string.uuid()),
                name: new Name(faker.company.name()),
                email: new Email(faker.internet.email()),
                code: faker.string.uuid(),
                supplier_nature: "Service",
                nif: faker.number.int().toString(),
                telephone: faker.phone.number(),
                address: "123",
                manager: faker.person.fullName(),
            }),
            reference: "ABC123",
            description: "Office supplies purchase",
            ticket: "XYZ456",
            date_doc: new Date(),
        };

        const transaction = new Transaction(transactionProps);
        await prisma.expenditure.create({
            data: {
                id: transactionProps.expenditure.id.value,
                type: transactionProps.expenditure.type,
                name: transactionProps.expenditure.name
            }
        })
        await prisma.supplier.create({
            data: {
                id: transactionProps.supplier.id.value,
                name: transactionProps.supplier.name.value,
                email: transactionProps.supplier.email.value,
                code: transactionProps.supplier.code,
                supplier_nature: transactionProps.supplier.supplier_nature,
                nif: transactionProps.supplier.nif,
                telephone: transactionProps.supplier.telephone,
                address: transactionProps.supplier.address,
                manager: transactionProps.supplier.manager,
            }
        })

        await repository.add(transaction);

        const transactionFound = await prisma.transaction.findFirst({
            where: {
                id: transactionProps.id.value,
            },
            include: {
                expenditure: true,
                supplier: true
            }
        });

        expect(transactionProps.id.value).toBe(transactionFound.id)
    });

    test("should update a transaction", async () => {
        const repository = new TransactionRepository();

        const transactionProps = {
            id: new Id(faker.string.uuid()),
            expenditure: new Expenditure({
                id: new Id(faker.string.uuid()),
                type: "Expense",
                name: "Office Supplies",
            }),
            type: "Expense",
            amount: 100,
            balance_after: 500,
            supplier: new Supplier({
                id: new Id(faker.string.uuid()),
                name: new Name(faker.company.name()),
                email: new Email(faker.internet.email()),
                code: faker.string.uuid(),
                supplier_nature: "Service",
                nif: faker.number.int().toString(),
                telephone: faker.phone.number(),
                address: "123",
                manager: faker.person.fullName(),
            }),
            reference: "ABC123",
            description: "Office supplies purchase",
            ticket: "XYZ456",
            date_doc: new Date(),
        };

        const transactionToUpdate = new Transaction(transactionProps);
        await prisma.expenditure.create({
            data: {
                id: transactionProps.expenditure.id.value,
                type: transactionProps.expenditure.type,
                name: transactionProps.expenditure.name
            }
        })
        await prisma.supplier.create({
            data: {
                id: transactionProps.supplier.id.value,
                name: transactionProps.supplier.name.value,
                email: transactionProps.supplier.email.value,
                code: transactionProps.supplier.code,
                supplier_nature: transactionProps.supplier.supplier_nature,
                nif: transactionProps.supplier.nif,
                telephone: transactionProps.supplier.telephone,
                address: transactionProps.supplier.address,
                manager: transactionProps.supplier.manager,
            }
        })
        await prisma.transaction.create({
            data: {
                id: transactionToUpdate.id.value,
                expenditureId: transactionToUpdate.expenditure.id.value,
                type: transactionToUpdate.type,
                amount: transactionToUpdate.amount,
                balance_after: transactionToUpdate.balance_after,
                supplierId: transactionToUpdate.supplier.id.value,
                reference: transactionToUpdate.reference,
                description: transactionToUpdate.description,
                ticket: transactionToUpdate.ticket,
                date_doc: transactionToUpdate.date_doc,
            },
        })

        const newAmount = 200;
        const newDescription = "Updated transaction";

        transactionToUpdate.changeAmount(newAmount);
        transactionToUpdate.changeDescription(newDescription);

        await repository.update(transactionToUpdate);

        const transactionFound = await prisma.transaction.findFirst({
            where: {
                id: transactionProps.id.value,
            },
            include: {
                expenditure: true,
                supplier: true
            }
        });

        const transactionUpdateProps = {
            id: transactionToUpdate.id,
            expenditure: {
                id: transactionToUpdate.expenditure.id,
                type: transactionToUpdate.expenditure.type,
                name: transactionToUpdate.expenditure.name,
            },
            type: transactionToUpdate.type,
            amount: transactionToUpdate.amount,
            balance_after: transactionToUpdate.balance_after,
            supplier: {
                id: transactionToUpdate.supplier.id,
                name: transactionToUpdate.supplier.name,
                email: transactionToUpdate.supplier.email,
                code: transactionToUpdate.supplier.code,
                supplier_nature: transactionToUpdate.supplier.supplier_nature,
                nif: transactionToUpdate.supplier.nif,
                telephone: transactionToUpdate.supplier.telephone,
                address: transactionToUpdate.supplier.address,
                manager: transactionToUpdate.supplier.manager,
            },
            reference: transactionToUpdate.reference,
            description: transactionToUpdate.description,
            ticket: transactionToUpdate.ticket,
            date_doc: transactionToUpdate.date_doc,
        };

        expect(transactionUpdateProps).toEqual({
            id: new Id(transactionFound.id),
            expenditure: {
                id: new Id(transactionFound.expenditureId),
                type: transactionFound.expenditure.type,
                name: transactionFound.expenditure.name,
            },
            type: transactionFound.type,
            amount: newAmount,
            balance_after: transactionFound.balance_after,
            supplier: {
                id: new Id(transactionFound.supplierId),
                name: new Name(transactionFound.supplier.name),
                email: new Email(transactionFound.supplier.email),
                code: transactionFound.supplier.code,
                supplier_nature: transactionFound.supplier.supplier_nature,
                nif: transactionFound.supplier.nif,
                telephone: transactionFound.supplier.telephone,
                address: transactionFound.supplier.address,
                manager: transactionFound.supplier.manager,
            },
            reference: transactionFound.reference,
            description: newDescription,
            ticket: transactionFound.ticket,
            date_doc: transactionFound.date_doc,
        });
    });

    test("should find a transaction", async () => {
        const repository = new TransactionRepository();
        const transactionProps = {
            id: new Id(faker.string.uuid()),
            expenditure: new Expenditure({
                id: new Id(faker.string.uuid()),
                type: "Credit",
                name: "Office Supplies",
            }),
            type: "Credit",
            amount: 100,
            balance_after: 500,
            supplier: new Supplier({
                id: new Id(faker.string.uuid()),
                name: new Name(faker.company.name()),
                email: new Email(faker.internet.email()),
                code: faker.string.uuid(),
                supplier_nature: "Service",
                nif: faker.number.int().toString(),
                telephone: faker.phone.number(),
                address: "123",
                manager: faker.person.fullName(),
            }),
            reference: "ABC123",
            description: "Office supplies purchase",
            ticket: "XYZ456",
            date_doc: new Date(),
        };

        const transaction = new Transaction(transactionProps);
        await prisma.expenditure.create({
            data: {
                id: transactionProps.expenditure.id.value,
                type: transactionProps.expenditure.type,
                name: transactionProps.expenditure.name
            }
        })
        await prisma.supplier.create({
            data: {
                id: transactionProps.supplier.id.value,
                name: transactionProps.supplier.name.value,
                email: transactionProps.supplier.email.value,
                code: transactionProps.supplier.code,
                supplier_nature: transactionProps.supplier.supplier_nature,
                nif: transactionProps.supplier.nif,
                telephone: transactionProps.supplier.telephone,
                address: transactionProps.supplier.address,
                manager: transactionProps.supplier.manager,
            }
        })
        await prisma.transaction.create({
            data: {
                id: transaction.id.value,
                expenditureId: transaction.expenditure.id.value,
                type: transaction.type,
                amount: transaction.amount,
                balance_after: transaction.balance_after,
                supplierId: transaction.supplier.id.value,
                reference: transaction.reference,
                description: transaction.description,
                ticket: transaction.ticket,
                date_doc: transaction.date_doc,
            },

        });
        const transactionFound = await repository.find(transaction.id.value);
        let transactionPropsExpected = {
            id: transactionProps.id,
            type: "Credit",
            amount: 100,
            balance_after: 500,
            reference: "ABC123",
            description: "Office supplies purchase",
            ticket: "XYZ456",
            date_doc: transactionProps.date_doc
        }
        expect(transactionPropsExpected).toEqual({
            id: new Id(transactionFound.id.value),
            type: transactionFound.type,
            amount: transactionFound.amount,
            balance_after: transactionFound.balance_after,
            reference: transactionFound.reference,
            description: transactionFound.description,
            ticket: transactionFound.ticket,
            date_doc: transactionFound.date_doc,
        });
    });

    test("should list all transactions", async () => {
        const repository = new TransactionRepository();

        const supplier = new Supplier({
            id: new Id(faker.string.uuid()),
            name: new Name(faker.company.name()),
            email: new Email(faker.internet.email()),
            code: faker.string.uuid(),
            supplier_nature: "Service",
            nif: faker.number.int().toString(),
            telephone: faker.phone.number(),
            address: "456",
            manager: faker.person.fullName(),
        })

        const expenditure = new Expenditure({
            id: new Id(faker.string.uuid()),
            type: "Expense",
            name: "Marketing",
        })

        const transactionProps = {
            id: new Id(faker.string.uuid()),
            expenditure,
            type: "Expense",
            amount: 100,
            balance_after: 500,
            supplier,
            reference: "ABC123",
            description: "Office supplies purchase",
            ticket: "XYZ456",
            date_doc: new Date(),
        };



        const transactionProps1 = {
            id: new Id(faker.string.uuid()),
            expenditure,
            type: "Expense",
            amount: 200,
            balance_after: 300,
            supplier,
            reference: "DEF456",
            description: "Marketing expenses",
            ticket: "PQR789",
            date_doc: new Date(),
        };

        const transaction = new Transaction(transactionProps);
        const transaction2 = new Transaction(transactionProps1);
        await prisma.expenditure.create({
            data: {
                id: transactionProps.expenditure.id.value,
                type: transactionProps.expenditure.type,
                name: transactionProps.expenditure.name
            }
        })
        await prisma.supplier.create({
            data: {
                id: transactionProps.supplier.id.value,
                name: transactionProps.supplier.name.value,
                email: transactionProps.supplier.email.value,
                code: transactionProps.supplier.code,
                supplier_nature: transactionProps.supplier.supplier_nature,
                nif: transactionProps.supplier.nif,
                telephone: transactionProps.supplier.telephone,
                address: transactionProps.supplier.address,
                manager: transactionProps.supplier.manager,
            }
        })
        await prisma.transaction.create({
            data: {
                id: transaction.id.value,
                expenditureId: transaction.expenditure.id.value,
                type: transaction.type,
                amount: transaction.amount,
                balance_after: transaction.balance_after,
                supplierId: transaction.supplier.id.value,
                reference: transaction.reference,
                description: transaction.description,
                ticket: transaction.ticket,
                date_doc: transaction.date_doc,
            },
        });
        await prisma.transaction.create({
            data: {
                id: transaction2.id.value,
                expenditureId: transaction2.expenditure.id.value,
                type: transaction2.type,
                amount: transaction2.amount,
                balance_after: transaction2.balance_after,
                supplierId: transaction2.supplier.id.value,
                reference: transaction2.reference,
                description: transaction2.description,
                ticket: transaction2.ticket,
                date_doc: transaction2.date_doc,
            },
        });

        const transactionsFound = await repository.list({ limit: 2, page: 1 });

        expect(transactionsFound.length).toBeGreaterThanOrEqual(2);
    });

    test("should delete one transaction", async () => {
        const repository = new TransactionRepository();
        const transactionProps = {
            id: new Id(faker.string.uuid()),
            expenditure: new Expenditure({
                id: new Id(faker.string.uuid()),
                type: "Expense",
                name: "Office Supplies",
            }),
            type: "Expense",
            amount: 100,
            balance_after: 500,
            supplier: new Supplier({
                id: new Id(faker.string.uuid()),
                name: new Name(faker.company.name()),
                email: new Email(faker.internet.email()),
                code: faker.string.uuid(),
                supplier_nature: "Service",
                nif: faker.number.int().toString(),
                telephone: faker.phone.number(),
                address: "123",
                manager: faker.person.fullName(),
            }),
            reference: "ABC123",
            description: "Office supplies purchase",
            ticket: "XYZ456",
            date_doc: new Date(),
        };
        const transaction = new Transaction(transactionProps);
        await prisma.expenditure.create({
            data: {
                id: transactionProps.expenditure.id.value,
                type: transactionProps.expenditure.type,
                name: transactionProps.expenditure.name
            }
        })
        await prisma.supplier.create({
            data: {
                id: transactionProps.supplier.id.value,
                name: transactionProps.supplier.name.value,
                email: transactionProps.supplier.email.value,
                code: transactionProps.supplier.code,
                supplier_nature: transactionProps.supplier.supplier_nature,
                nif: transactionProps.supplier.nif,
                telephone: transactionProps.supplier.telephone,
                address: transactionProps.supplier.address,
                manager: transactionProps.supplier.manager,
            }
        })

        await prisma.transaction.create({
            data: {
                id: transaction.id.value,
                expenditureId: transaction.expenditure.id.value,
                type: transaction.type,
                amount: transaction.amount,
                balance_after: transaction.balance_after,
                supplierId: transaction.supplier.id.value,
                reference: transaction.reference,
                description: transaction.description,
                ticket: transaction.ticket,
                date_doc: transaction.date_doc,
            },
        });

        await repository.delete(transaction.id.value);

        const transactionDelete = await prisma.transaction.findUnique({
            where: {
                id: transaction.id.value,
            },
            select: {
                id: true,
            },
        });

        expect(transactionDelete?.id).toBeUndefined();
    });
});


