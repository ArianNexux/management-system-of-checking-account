import Email from "../../../@shared/domain/value-objects/email.vo";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Name from "../../../@shared/domain/value-objects/name.vo";
import { faker } from '@faker-js/faker';
import ListEmployeeUseCase from "../../usecase/list-employee.usecase";
import { PrismaClient } from "@prisma/client";
import EmployeeRepository from "../../repository/prisma/employee.repository";

describe("Test suit to list Employee", () => {

    const prisma = new PrismaClient()


    test('should list an Employee', async () => {
        const inputToCreate = {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: 'role',
            photo: 'img.png',
            position: "position"
        };

        const inputToCreate2 = {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: 'role1',
            photo: 'img1.png',
            position: "position1"
        };


        await prisma.employee.create({
            data: {
                id: inputToCreate.id,
                name: inputToCreate.name,
                email: inputToCreate.email,
                role: inputToCreate.role,
                position: inputToCreate.position,
                photo: inputToCreate.photo
            }
        })

        await prisma.employee.create({
            data: {
                id: inputToCreate2.id,
                name: inputToCreate2.name,
                email: inputToCreate2.email,
                role: inputToCreate2.role,
                position: inputToCreate2.position,
                photo: inputToCreate2.photo
            }
        })

        const repository = new EmployeeRepository()

        const usecase = new ListEmployeeUseCase(repository);
        const input = {
            page: 1,
            limit: 2,
        }
        const output = await usecase.execute(input)

        expect(output.data.length).toBeGreaterThanOrEqual(2)
        expect(output.data).toContainEqual({
            id: inputToCreate.id,
            name: inputToCreate.name,
            email: inputToCreate.email,
            role: inputToCreate.role,
            position: inputToCreate.position,
            photo: inputToCreate.photo
        })
        expect(output.data).toContainEqual({
            id: inputToCreate2.id,
            name: inputToCreate2.name,
            email: inputToCreate2.email,
            role: inputToCreate2.role,
            position: inputToCreate2.position,
            photo: inputToCreate2.photo
        })
    })
})