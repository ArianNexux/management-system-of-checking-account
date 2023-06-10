import { PrismaClient } from "@prisma/client";
import TransactionRepository from "../../../repository/prisma/transaction.repository";
import AddTransactionUseCase from "../../../usecase/transaction/add-transaction.usecase";
import { faker } from '@faker-js/faker';
import ExpenditureRepository from "../../../../transaction/repository/prisma/expenditure.repository";
import SupplierRepository from "../../../../transaction/repository/prisma/supplier.repository";
import Id from "../../../../@shared/domain/value-objects/id.vo";
import Supplier from "../../../../transaction/domain/supplier.entity";
import Name from "../../../../@shared/domain/value-objects/name.vo";
import Email from "../../../../@shared/domain/value-objects/email.vo";
import Expenditure from "../../../../transaction/domain/expenditure.entity";

describe('Test suits of use case to create transaction', () => {

    const prisma = new PrismaClient()

    test('should create an transaction', async () => {
        const repository = new TransactionRepository()
        const repositorySupplier = new SupplierRepository()
        const repositoryExpenditure = new ExpenditureRepository()

        const usecase = new AddTransactionUseCase(repository, repositorySupplier, repositoryExpenditure);

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
            id: new Id().value,
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

        const output = await usecase.execute(input)

        expect(output.id).toBeDefined();
        expect(output.expenditure.id.value).toBe(input.expenditureId);
        expect(output.supplier.id.value).toBe(input.supplierId);
        expect(output.type).toBe(input.type);
        expect(output.amount).toBe(input.amount);
        expect(output.balance_after).toBe(input.balance_after);
        expect(output.reference).toBe(input.reference);
        expect(output.description).toBe(input.description);
        expect(output.ticket).toBe(input.ticket);
        expect(output.date_doc).toBe(input.date_doc);

    });
});
