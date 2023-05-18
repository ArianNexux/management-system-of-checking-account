import { PrismaClient } from "@prisma/client";
import Email from "../../../@shared/domain/value-objects/email.vo";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Name from "../../../@shared/domain/value-objects/name.vo";
import Employee from "../../domain/employee.entity";
import EmployeeRepository from "../../repository/prisma/employee.repository";
import DeleteEmployeeUseCase from "../../usecase/delete-employee.usecase";
import { faker } from '@faker-js/faker';

describe("Test suit to list Employee", () => {
    const prisma = new PrismaClient()

    test('should delete an Employee', async () => {
        const propsEmployee1 = {
            id: new Id(),
            name: new Name(faker.person.fullName()),
            email: new Email(faker.internet.email()),
            role: 'role',
            photo: 'img.png',
            position: "position"
        };

        const employee = new Employee(propsEmployee1)

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

        const repository = new EmployeeRepository()

        const usecase = new DeleteEmployeeUseCase(repository);
        const input = {
            id: employee.id.id
        }
        await usecase.execute(input)
        const output = await prisma.employee.findUnique({
            where: {
                id: employee.id.id
            }
        })

        expect(output).toBeNull()

    })
})