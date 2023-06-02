import Email from "../../../../@shared/domain/value-objects/email.vo";
import Id from "../../../../@shared/domain/value-objects/id.vo";
import Name from "../../../../@shared/domain/value-objects/name.vo";
import { faker } from '@faker-js/faker';
import ListTransactionUseCase from "../../../usecase/transaction/list-transaction.usecase";
import { PrismaClient } from "@prisma/client";
import TransactionRepository from "../../../repository/prisma/transaction.repository";
import Expenditure from "../../../../transaction/domain/expenditure.entity";
import Supplier from "../../../../transaction/domain/supplier.entity";
import Transaction from "../../../../transaction/domain/transaction.entity";

describe("Test suit to list Supplier", () => {

    const prisma = new PrismaClient()


    test('should list all Suppliers', async () => {
        const inputSupplier = {
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

        const supplier = new Supplier(inputSupplier)
        const inputExpenditure = {
            id: new Id(),
            name: faker.person.fullName(),
            type: faker.commerce.product(),
        };

        const expenditure = new Expenditure(inputExpenditure)

        await prisma.expenditure.create({
            data: {
                id: inputExpenditure.id.value,
                type: inputExpenditure.type,
                name: inputExpenditure.name
            }
        })

        await prisma.supplier.create({
            data: {
                id: inputSupplier.id.value,
                name: inputSupplier.name.value,
                email: inputSupplier.email.value,
                code: inputSupplier.code,
                supplier_nature: inputSupplier.supplier_nature,
                nif: inputSupplier.nif,
                telephone: inputSupplier.telephone,
                address: inputSupplier.address,
                manager: inputSupplier.manager
            }
        })
        const inputTransaction1 = {
            id: new Id(),
            expenditure: expenditure,
            type: 'Credit',
            amount: faker.number.int(),
            balance_after: faker.number.int(),
            supplier: supplier,
            reference: faker.string.alphanumeric(),
            description: faker.commerce.productDescription(),
            ticket: faker.internet.url(),
            date_doc: new Date()
        };

        const inputTransaction2 = {
            id: new Id(),
            expenditure: expenditure,
            type: 'Credit',
            amount: faker.number.int(),
            balance_after: faker.number.int(),
            supplier: supplier,
            reference: faker.string.alphanumeric(),
            description: faker.commerce.productDescription(),
            ticket: faker.internet.url(),
            date_doc: new Date()
        };

        const transaction = new Transaction(inputTransaction1)
        const transaction2 = new Transaction(inputTransaction2)

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
                date_doc: new Date(transaction.date_doc)
            }
        })

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
                date_doc: new Date(transaction2.date_doc)
            }
        })
        const repository = new TransactionRepository()

        const usecase = new ListTransactionUseCase(repository);
        const input = {
            page: 1,
            limit: 2,
        }
        const output = await usecase.execute(input)

        expect(output.data.length).toBeGreaterThanOrEqual(2)

    })
})