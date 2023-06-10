
import BcryptEncryptor from "../../infrastructure/bcrypt";
import AddEmployeeUseCase from "../../usecase/add-employee.usecase";
import { faker } from '@faker-js/faker';

describe('Test suits of use case to create employer', () => {

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            list: jest.fn(),
            delete: jest.fn()
        }
    }
    const MockBcrypt = () => {
        return {
            execute: jest.fn()
        }
    }
    test('should create an employer', async () => {
        const repository = MockRepository()
        const encryptor = MockBcrypt()
        const usecase = new AddEmployeeUseCase(repository, encryptor);

        const input = {
            name: 'Bento Julio',
            email: faker.internet.email(),
            role: 'role',
            photo: 'img.png',
            position: "position",
            password: "123"
        };

        const output = await usecase.execute(input)

        expect(repository.add).toHaveBeenCalled()
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.role).toBe(input.role);
        expect(output.email).toBe(input.email);
        expect(output.position).toBe(input.position);

    });
});
