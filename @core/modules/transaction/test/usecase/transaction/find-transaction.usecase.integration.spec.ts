import Id from "../../../../@shared/domain/value-objects/id.vo";
import Transaction from "../../../domain/transaction.entity";
import FindTransactionUseCase from "../../../usecase/transaction/find-transaction.usecase";
import { faker } from '@faker-js/faker';
import TransactionRepository from "../../../repository/prisma/transaction.repository";
import { PrismaClient } from "@prisma/client";
import Name from "../../../../@shared/domain/value-objects/name.vo";
import Email from "../../../../@shared/domain/value-objects/email.vo";
import Supplier from "../../../../transaction/domain/supplier.entity";
import Expenditure from "../../../../transaction/domain/expenditure.entity";

describe('Test suits Find Transaction Use Case', () => {
    const prisma = new PrismaClient()

    test('should find an transaction', async () => {

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

        const input = {
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


        const transaction = new Transaction(input)

        await prisma.transaction.create({
            data: {
                id: transaction.id.value,
                expenditureId: expenditure.id.value,
                type: transaction.type,
                amount: transaction.amount,
                balance_after: transaction.balance_after,
                supplierId: supplier.id.value,
                reference: transaction.reference,
                description: transaction.description,
                ticket: transaction.ticket,
                date_doc: transaction.date_doc,
            }
        })

        const repository = new TransactionRepository()
        const inputUseCase = {
            id: transaction.id.value
        }

        const usecase = new FindTransactionUseCase(repository)
        const output = await usecase.execute(inputUseCase)

        expect(output.id).toBeDefined();
        expect(output.expenditure.id.value).toBe(transaction.expenditure.id.value);
        expect(output.supplier.id.value).toBe(transaction.supplier.id.value);
        expect(output.type).toBe(transaction.type);
        expect(output.amount).toBe(transaction.amount);
        expect(output.balance_after).toBe(transaction.balance_after);
        expect(output.reference).toBe(transaction.reference);
        expect(output.description).toBe(transaction.description);
        expect(output.ticket).toBe(transaction.ticket);

    })
})