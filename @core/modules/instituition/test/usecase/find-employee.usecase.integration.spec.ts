import Id from "../../../@shared/domain/value-objects/id.vo";
import Employee from "../../domain/employee.entity";
import Name from "../../../@shared/domain/value-objects/name.vo";
import Email from "../../../@shared/domain/value-objects/email.vo";
import FindEmployeeUseCase from "../../usecase/find-employee.usecase";
import { faker } from '@faker-js/faker';
import EmployeeRepository from "../../repository/prisma/employee.repository";
import { PrismaClient } from "@prisma/client";

describe('Test suits Find Employee Use Case', () => {
    const prisma = new PrismaClient()

    test('should find an employee', async () => {
        const propsEmployee = {
            id: new Id(),
            name: new Name(faker.person.fullName()),
            email: new Email(faker.internet.email()),
            role: 'role',
            photo: 'img.png',
            position: "position"
        };
        const employee = new Employee(propsEmployee)
        await prisma.employee.create({
            data: {
                id: employee.id.value,
                name: employee.name.value,
                email: employee.email.value,
                role: employee.role,
                position: employee.position,
                photo: employee.photo
            }
        })

        const repository = new EmployeeRepository()
        const input = {
            id: employee.id.value
        }
        const usecase = new FindEmployeeUseCase(repository)
        const output = await usecase.execute(input)

        expect(output.id).toBeDefined()
        expect(output.name).toBe(propsEmployee.name.value)
        expect(output.email).toBe(propsEmployee.email.value)
        expect(output.role).toBe(propsEmployee.role)
        expect(output.position).toBe(propsEmployee.position)
        expect(output.photo).toBe(propsEmployee.photo)



    })
})