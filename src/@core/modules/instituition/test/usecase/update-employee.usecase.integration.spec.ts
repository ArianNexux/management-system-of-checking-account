import { PrismaClient } from "@prisma/client"
import EmployeeRepository from "../../repository/prisma/employee.repository"
import UpdateEmployeeUseCase from "../../usecase/update-employee.usecase"
import { faker } from "@faker-js/faker"
import BcryptEncryptor from "../../infrastructure/bcrypt"

describe("Test suit to update Employee", () => {

    const prisma = new PrismaClient()

    test('should update an Employee', async () => {
        const repository = new EmployeeRepository()
        const fakerUuid = faker.string.uuid()
        const input = {
            id: fakerUuid,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: 'role',
            password: "123",
            photo: 'img.png',
            position: "position",
        };

        await prisma.employee.create({
            data: {
                id: input.id,
                name: input.name,
                email: input.email,
                role: input.role,
                position: input.position,
                photo: input.photo
            }
        })
        const encryptor = new BcryptEncryptor()

        const usecase = new UpdateEmployeeUseCase(repository, encryptor);

        const inputUpdated = {
            id: fakerUuid,
            name: 'Bento Julio',
            email: faker.internet.email(),
            role: 'role',
            photo: 'img.png',
            position: "position",
            password: "123"
        };

        const output = await usecase.execute(inputUpdated)

        expect(output.id).toBe(inputUpdated.id);
        expect(output.name).toBe(inputUpdated.name)
        expect(output.email).toBe(inputUpdated.email)
        expect(output.role).toBe(inputUpdated.role)
        expect(output.position).toBe(inputUpdated.position)
        expect(output.photo).toBe(inputUpdated.photo)
    })
})