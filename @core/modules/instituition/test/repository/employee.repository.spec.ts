import Id from '../../../@shared/domain/value-objects/id.vo'
import Employee from '../../domain/employee.entity'
import { PrismaClient } from '@prisma/client'
import EmployeePrismaRepository from '../../repository/prisma/employee.repository'
import Name from '../../../@shared/domain/value-objects/name.vo'
import Email from '../../../@shared/domain/value-objects/email.vo'
import { faker } from '@faker-js/faker';
describe("Test suits for repository employee", () => {
    const prisma = new PrismaClient()

    test('should create an employee', async () => {
        const repository = new EmployeePrismaRepository()

        const employeeProps = {
            id: new Id(),
            name: new Name('Bento Julio'),
            email: new Email(faker.internet.email()),
            role: 'role',
            photo: 'img.png',
            position: "position"
        };


        const employee = new Employee(employeeProps)

        await repository.add(employee)

        const employeeFound = await prisma.employee.findFirst({
            where: {
                id: employeeProps.id.id
            }
        })
        expect(employeeFound.id).toBe(employee.id.id)
        expect(employeeFound.name).toBe(employee.name.name)
        expect(employeeFound.email).toBe(employee.email.email)
        expect(employeeFound.role).toBe(employee.role)
        expect(employeeFound.position).toBe(employee.position)
        expect(employeeFound.photo).toBe(employee.photo)

    })

    test("should update an employee", async () => {
        const repository = new EmployeePrismaRepository()

        const employeeProps = {
            id: new Id(),
            name: new Name('Bento Julio'),
            email: new Email(faker.internet.email()),
            role: 'role',
            photo: 'img.png',
            position: "position"
        };

        const employeeToUpdate = new Employee(employeeProps)

        await prisma.employee.create({
            data: {
                id: employeeToUpdate.id.id,
                name: employeeToUpdate.name.name,
                email: employeeToUpdate.email.email,
                role: employeeToUpdate.role,
                position: employeeToUpdate.position,
                photo: employeeToUpdate.photo
            }
        })

        employeeToUpdate.changeName(new Name("Bento Julio Updated"))
        employeeToUpdate.updateEmail(new Email(faker.internet.email()))

        await repository.update(employeeToUpdate)

        const employeeFound = await prisma.employee.findFirst({
            where: {
                id: employeeProps.id.id
            }
        })
        expect(employeeFound.id).toBe(employeeToUpdate.id.id)
        expect(employeeFound.name).toBe(employeeToUpdate.name.name)
        expect(employeeFound.email).toBe(employeeToUpdate.email.email)
        expect(employeeFound.role).toBe(employeeToUpdate.role)
        expect(employeeFound.position).toBe(employeeToUpdate.position)
        expect(employeeFound.photo).toBe(employeeToUpdate.photo)

    })


    test("should find an employee", async () => {
        const repository = new EmployeePrismaRepository()


        const employeeProps = {
            id: new Id(),
            name: new Name('Bento Julio'),
            email: new Email(faker.internet.email()),
            role: 'role',
            photo: 'img.png',
            position: "position"
        };

        const employee = new Employee(employeeProps)

        await prisma.employee.create({
            data: {
                id: employee.id.id,
                name: employee.name.name,
                email: employee.email.email,
                role: employee.role,
                position: employee.position,
                photo: employee.photo
            }
        })

        let employeeFound = await repository.find(employee.id.id)

        expect(employeeFound.id.id).toBe(employee.id.id)
        expect(employeeFound.name.name).toBe(employee.name.name)
        expect(employeeFound.email.email).toBe(employee.email.email)
        expect(employeeFound.role).toBe(employee.role)
        expect(employeeFound.position).toBe(employee.position)
        expect(employeeFound.photo).toBe(employee.photo)

    })


    test("should list all employees", async () => {
        const repository = new EmployeePrismaRepository()


        const employeeProps = {
            id: new Id(),
            name: new Name('Bento Julio'),
            email: new Email(faker.internet.email()),
            role: 'role',
            photo: 'img.png',
            position: "position"
        };

        const employeeProps1 = {
            id: new Id(),
            name: new Name(faker.person.fullName()),
            email: new Email(faker.internet.email()),
            role: 'role',
            photo: 'img.png',
            position: "position"
        };

        const employee = new Employee(employeeProps)
        const employee2 = new Employee(employeeProps1)

        await prisma.employee.create({
            data: {
                id: employee.id.id,
                name: employee.name.name,
                email: employee.email.email,
                role: employee.role,
                position: employee.position,
                photo: employee.photo
            }
        })

        await prisma.employee.create({
            data: {
                id: employee2.id.id,
                name: employee2.name.name,
                email: employee2.email.email,
                role: employee2.role,
                position: employee2.position,
                photo: employee2.photo
            }
        })

        let employeesFound = await repository.list({
            limit: 0,
            page: 0
        })

        expect(employeesFound.length).toBeGreaterThanOrEqual(2)
    })

    test("should delete one employee", async () => {
        const repository = new EmployeePrismaRepository()


        const employeeProps = {
            id: new Id(),
            name: new Name('Bento Julio'),
            email: new Email(faker.internet.email()),
            role: 'role',
            photo: 'img.png',
            position: "position"
        };



        const employee = new Employee(employeeProps)

        await prisma.employee.create({
            data: {
                id: employee.id.id,
                name: employee.name.name,
                email: employee.email.email,
                role: employee.role,
                position: employee.position,
                photo: employee.photo
            }
        })

        await repository.delete(employee.id.id)

        let employeesDelete = await prisma.employee.findUnique({
            where: {
                id: employee.id.id,
            },
            select: {
                id: true
            }
        })
        expect(employeesDelete?.id).toBeUndefined()
    })

})