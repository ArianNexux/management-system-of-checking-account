
import { PrismaClient } from "@prisma/client";
import EmployeeRepository from "../../repository/prisma/employee.repository";
import AddEmployeeUseCase from "../../usecase/add-employee.usecase";
import { faker } from '@faker-js/faker';

describe('Test suits of use case to create employer', () => {

    const prisma = new PrismaClient()

    test('should create an employer', async () => {
        const repository = new EmployeeRepository()

        const usecase = new AddEmployeeUseCase(repository);

        const input = {
            name: 'Bento Julio',
            email: faker.internet.email(),
            role: 'role',
            photo: 'img.png',
            position: "position"
        };

        const output = await usecase.execute(input)

        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.role).toBe(input.role);
        expect(output.email).toBe(input.email);
        expect(output.position).toBe(input.position);

    });
});
