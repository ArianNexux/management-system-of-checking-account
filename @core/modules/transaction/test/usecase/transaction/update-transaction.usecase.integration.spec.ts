import { PrismaClient } from "@prisma/client"
import TransactionRepository from "../../../repository/prisma/transaction.repository"
import UpdateTransactionUseCase from "../../../usecase/transaction/update-transaction.usecase"
import { faker } from "@faker-js/faker"
import Transaction from "../../../domain/transaction.entity"
import Name from "../../../../@shared/domain/value-objects/name.vo"
import Email from "../../../../@shared/domain/value-objects/email.vo"
import Id from "../../../../@shared/domain/value-objects/id.vo"
import Expenditure from "../../../../transaction/domain/expenditure.entity"
import Supplier from "../../../../transaction/domain/supplier.entity"
import ExpenditureRepository from "../../../../transaction/repository/prisma/expenditure.repository"
import SupplierRepository from "../../../../transaction/repository/prisma/supplier.repository"

describe("Test suit to update Transaction", () => {

    const prisma = new PrismaClient()

    test('should update an Transaction', async () => {
        const repository = new TransactionRepository()
        const repositorySupplier = new SupplierRepository()
        const repositoryExpenditure = new ExpenditureRepository()

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

        const usecase = new UpdateTransactionUseCase(repository, repositorySupplier, repositoryExpenditure);

        const inputUpdated = {
            id: input.id.value,
            expenditureId: expenditure.id.value,
            type: 'Credit',
            amount: faker.number.int(),
            balance_after: faker.number.int(),
            supplierId: supplier.id.value,
            reference: faker.string.alphanumeric(),
            description: faker.commerce.productDescription(),
            ticket: faker.internet.url(),
            date_doc: new Date()
        };

        const output = await usecase.execute(inputUpdated)

        expect(output.id).toBe(inputUpdated.id);
        expect(output.expenditure.id.value).toBe(inputUpdated.expenditureId);
        expect(output.supplier.id.value).toBe(inputUpdated.supplierId);
        expect(output.type).toBe(inputUpdated.type);
        expect(output.amount).toBe(inputUpdated.amount);
        expect(output.balance_after).toBe(inputUpdated.balance_after);
        expect(output.reference).toBe(inputUpdated.reference);
        expect(output.description).toBe(inputUpdated.description);
        expect(output.ticket).toBe(inputUpdated.ticket);
    })
})