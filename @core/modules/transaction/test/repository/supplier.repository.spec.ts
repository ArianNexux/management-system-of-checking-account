import Id from '../../../@shared/domain/value-objects/id.vo'
import Supplier from '../../domain/supplier.entity'
import { PrismaClient } from '@prisma/client'
import SupplierPrismaRepository from '../../repository/prisma/supplier.repository'
import Name from '../../../@shared/domain/value-objects/name.vo'
import Email from '../../../@shared/domain/value-objects/email.vo'
import { faker } from '@faker-js/faker';
describe("Test suits for repository supplier", () => {
    const prisma = new PrismaClient()

    test('should create an supplier', async () => {
        const repository = new SupplierPrismaRepository()

        const supplierProps = {
            id: new Id(faker.string.uuid()),
            name: new Name(faker.company.name()),
            email: new Email(faker.internet.email()),
            code: faker.string.uuid(),
            supplier_nature: "Service",
            nif: faker.number.int().toString(),
            telephone: faker.phone.number(),
            address: "123",
            manager: faker.person.fullName(),
        };

        const supplier = new Supplier(supplierProps)

        await repository.add(supplier)

        const supplierFound = await prisma.supplier.findFirst({
            where: {
                id: supplierProps.id.value
            }
        })
        expect(supplierProps).toEqual({
            id: new Id(supplierFound.id),
            name: new Name(supplierFound.name),
            email: new Email(supplierFound.email),
            code: supplierFound.code,
            supplier_nature: supplierFound.supplier_nature,
            nif: supplierFound.nif,
            telephone: supplierFound.telephone,
            address: supplierFound.address,
            manager: supplierFound.manager,
        })

    })

    test("should update a supplier", async () => {
        const repository = new SupplierPrismaRepository()

        const supplierProps = {
            id: new Id(faker.string.uuid()),
            name: new Name(faker.company.name()),
            email: new Email(faker.internet.email()),
            code: faker.string.uuid(),
            supplier_nature: "Service",
            nif: faker.number.int().toString(),
            telephone: faker.phone.number(),
            address: "123",
            manager: faker.person.fullName(),
        };

        const supplierToUpdate = new Supplier(supplierProps)


        await prisma.supplier.create({
            data: {
                id: supplierToUpdate.id.value,
                name: supplierToUpdate.name.value,
                email: supplierToUpdate.email.value,
                code: supplierToUpdate.code,
                supplier_nature: supplierToUpdate.supplier_nature,
                nif: supplierToUpdate.nif,
                telephone: supplierToUpdate.telephone,
                address: supplierToUpdate.address,
                manager: supplierToUpdate.manager,
            }
        })
        const newName = new Name(faker.person.fullName())
        const newEmail = new Email(faker.internet.email())

        supplierToUpdate.changeName(newName)
        supplierToUpdate.updateEmail(newEmail)
        await repository.update(supplierToUpdate)

        const supplierFound = await prisma.supplier.findFirst({
            where: {
                id: supplierProps.id.value
            }
        })
        const supplierUpdateProps = {
            id: supplierToUpdate.id,
            name: supplierToUpdate.name,
            email: supplierToUpdate.email,
            code: supplierToUpdate.code,
            supplier_nature: supplierToUpdate.supplier_nature,
            nif: supplierToUpdate.nif,
            telephone: supplierToUpdate.telephone,
            address: supplierToUpdate.address,
            manager: supplierToUpdate.manager
        }
        expect(supplierUpdateProps).toEqual({
            id: new Id(supplierFound.id),
            name: newName,
            email: newEmail,
            code: supplierFound.code,
            supplier_nature: supplierFound.supplier_nature,
            nif: supplierFound.nif,
            telephone: supplierFound.telephone,
            address: supplierFound.address,
            manager: supplierFound.manager,
        })

    })


    test("should find an supplier", async () => {
        const repository = new SupplierPrismaRepository()


        const supplierProps = {
            id: new Id(faker.string.uuid()),
            name: new Name(faker.company.name()),
            email: new Email(faker.internet.email()),
            code: faker.string.uuid(),
            supplier_nature: "Service",
            nif: faker.number.int().toString(),
            telephone: faker.phone.number(),
            address: "123",
            manager: faker.person.fullName(),
        };

        const supplier = new Supplier(supplierProps)

        await prisma.supplier.create({
            data: {
                id: supplier.id.value,
                name: supplier.name.value,
                email: supplier.email.value,
                code: supplier.code,
                supplier_nature: supplier.supplier_nature,
                nif: supplier.nif,
                telephone: supplier.telephone,
                address: supplier.address,
                manager: supplier.manager,
            }
        })

        let supplierFound = await repository.find(supplier.id.value)

        expect(supplierProps).toEqual({
            id: new Id(supplierFound.id.value),
            name: new Name(supplierFound.name.value),
            email: new Email(supplierFound.email.value),
            code: supplierFound.code,
            supplier_nature: supplierFound.supplier_nature,
            nif: supplierFound.nif,
            telephone: supplierFound.telephone,
            address: supplierFound.address,
            manager: supplierFound.manager,
        })

    })


    test("should list all suppliers", async () => {
        const repository = new SupplierPrismaRepository()


        const supplierProps = {
            id: new Id(faker.string.uuid()),
            name: new Name(faker.company.name()),
            email: new Email(faker.internet.email()),
            code: faker.string.uuid(),
            supplier_nature: "Service",
            nif: faker.number.int().toString(),
            telephone: faker.phone.number(),
            address: "123",
            manager: faker.person.fullName(),
        };

        const supplierProps1 = {
            id: new Id(faker.string.uuid()),
            name: new Name(faker.company.name()),
            email: new Email(faker.internet.email()),
            code: faker.string.uuid(),
            supplier_nature: "Service",
            nif: faker.number.int().toString(),
            telephone: faker.phone.number(),
            address: "123",
            manager: faker.person.fullName(),
        };

        const supplier = new Supplier(supplierProps)
        const supplier2 = new Supplier(supplierProps1)

        await prisma.supplier.create({
            data: {
                id: supplier.id.value,
                name: supplier.name.value,
                email: supplier.email.value,
                code: supplier.code,
                supplier_nature: supplier.supplier_nature,
                nif: supplier.nif,
                telephone: supplier.telephone,
                address: supplier.address,
                manager: supplier.manager,
            }
        })

        await prisma.supplier.create({
            data: {
                id: supplier2.id.value,
                name: supplier2.name.value,
                email: supplier2.email.value,
                code: supplier2.code,
                supplier_nature: supplier2.supplier_nature,
                nif: supplier2.nif,
                telephone: supplier2.telephone,
                address: supplier2.address,
                manager: supplier2.manager,
            }
        })

        let suppliersFound = await repository.list({
            limit: 0,
            page: 0
        })

        expect(suppliersFound.length).toBeGreaterThanOrEqual(2)
    })

    test("should delete one supplier", async () => {
        const repository = new SupplierPrismaRepository()

        const supplierProps = {
            id: new Id(faker.string.uuid()),
            name: new Name(faker.company.name()),
            email: new Email(faker.internet.email()),
            code: faker.string.uuid(),
            supplier_nature: "Service",
            nif: faker.number.int().toString(),
            telephone: faker.phone.number(),
            address: "123",
            manager: faker.person.fullName(),
        };



        const supplier = new Supplier(supplierProps)

        await prisma.supplier.create({
            data: {
                id: supplier.id.value,
                name: supplier.name.value,
                email: supplier.email.value,
                code: supplier.code,
                supplier_nature: supplier.supplier_nature,
                nif: supplier.nif,
                telephone: supplier.telephone,
                address: supplier.address,
                manager: supplier.manager,
            }
        })

        await repository.delete(supplier.id.value)

        let suppliersDelete = await prisma.supplier.findUnique({
            where: {
                id: supplier.id.value,
            },
            select: {
                id: true
            }
        })
        expect(suppliersDelete?.id).toBeUndefined()
    })

})