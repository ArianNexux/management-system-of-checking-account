import { PrismaClient } from "@prisma/client";
import Email from "../../../../@shared/domain/value-objects/email.vo";
import Id from "../../../../@shared/domain/value-objects/id.vo";
import Name from "../../../../@shared/domain/value-objects/name.vo";
import Transaction from "../../../domain/transaction.entity";
import TransactionRepository from "../../../repository/prisma/transaction.repository";
import DeleteTransactionUseCase from "../../../usecase/transaction/delete-transaction.usecase";
import { faker } from '@faker-js/faker';
import SupplierRepository from "../../../../transaction/repository/prisma/supplier.repository";
import ExpenditureRepository from "../../../../transaction/repository/prisma/expenditure.repository";
import Expenditure from "../../../../transaction/domain/expenditure.entity";
import Supplier from "../../../../transaction/domain/supplier.entity";

describe("Test suit to list Transaction", () => {
    const prisma = new PrismaClient()

    test('should delete an Transaction', async () => {

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

        const usecase = new DeleteTransactionUseCase(repository);
        const inputUseCase = {
            id: transaction.id.value
        }
        await usecase.execute(inputUseCase)
        const output = await prisma.transaction.findUnique({
            where: {
                id: transaction.id.value
            }
        })

        expect(output).toBeNull()

    })
})